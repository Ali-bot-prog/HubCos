import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

export type User = {
  id: string;
  username: string;
  passwordHash: string; // Store hashed password
  name: string;
  role: 'admin' | 'editor';
};

const dataPath = path.join(process.cwd(), 'data/users.json');

// Helper to read JSON users
const getJsonUsers = (): User[] => {
  if (!fs.existsSync(dataPath)) return [];
  try {
    const file = fs.readFileSync(dataPath, 'utf-8');
      return JSON.parse(file);
    } catch (e) {
      return [];
    }
};

// Helper to save JSON users (for fallback writing if needed, or we just disable writing in fallback?)
// For now, allow writing to JSON if DB is down, to keep usage working.
const saveJsonUsers = (users: User[]) => {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (e) {
      // If we can't create dir, we definitely can't write file.
      throw new Error("Cannot create data directory - Check filesystem permissions");
    }
  }
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

// Fetch users from DB (Adapter pattern to match existing type if possible, or return Prisma type)
// For auth compatibility, we return the shape expected by NextAuth
export const getUsers = async (): Promise<User[]> => {
  // Try DB
  if (prisma) {
    try {
      const admins = await prisma.admin.findMany();
      if (admins.length > 0) {
        return admins.map(a => ({
          id: a.id,
          username: a.username,
          passwordHash: a.password,
          name: a.username,
          role: 'admin'
        }));
      }
    } catch (error) {
      console.warn("DB fetch failed, falling back to JSON");
    }
  }

  // Fallback to JSON
  return getJsonUsers();
};

// Get single user by username (more efficient than getting all)
export const getUserByUsername = async (username: string): Promise<User | null> => {
  if (prisma) {
    try {
      const admin = await prisma.admin.findUnique({ where: { username } });
      if (admin) {
        return {
          id: admin.id,
          username: admin.username, 
          passwordHash: admin.password,
          name: admin.username,
          role: 'admin'
        };
      }
    } catch (error) {
      console.warn("DB fetch failed, falling back to JSON");
    }
  }

  const users = getJsonUsers();
  return users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
}

export const addUser = async (user: Omit<User, 'id' | 'passwordHash'> & { password: string }) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  if (prisma) {
    try {
      const existing = await prisma.admin.findUnique({ where: { username: user.username } });
      if (existing) throw new Error('Username already exists');

      const newAdmin = await prisma.admin.create({
        data: { username: user.username, password: hash }
      });
      return {
        id: newAdmin.id,
        username: newAdmin.username,
        passwordHash: newAdmin.password,
        name: newAdmin.username,
        role: 'admin' as const
      };
    } catch (e: any) {
      // If username exists error from Prisma, rethrow it
      if (e.message.includes('Username already exists')) throw e;
      console.warn("DB write failed, attempting fallback to JSON. Error:", e);
    }
  }

  // JSON Fallback
  // Warning: This will fail on Vercel/Lambda environments (EROFS)
  try {
    const users = getJsonUsers();
    if (users.find(u => u.username === user.username)) throw new Error('Username already exists');

    const newUser: User = {
      id: Date.now().toString(),
      username: user.username,
      passwordHash: hash,
      name: user.name,
      role: user.role
    };
    users.push(newUser);
    saveJsonUsers(users);
    return newUser;
  } catch (e: any) {
    if (e.code === 'EROFS' || e.message.includes('read-only')) {
      throw new Error('Database connection failed AND file system is read-only. Cannot save user. Please check database connection.');
    }
    throw e;
  }
};

export const deleteUser = async (id: string) => {
  let deletedFromDb = false;
  if (prisma) {
    try {
      await prisma.admin.delete({ where: { id } });
      deletedFromDb = true;
    } catch (e) {
      console.warn("DB delete failed or ID not found in DB");
    }
  }

  // Even if DB delete worked, we might want to sync local file? 
  // Probably not needed if we move fully to DB, but for hybrid keeping it safe.
  try {
    const users = getJsonUsers();
    const filtered = users.filter(u => u.id !== id);
    if (users.length !== filtered.length) {
        saveJsonUsers(filtered);
    }
  } catch (e: any) {
    // Ignore EROFS on delete if DB delete was successful
    if (!deletedFromDb && (e.code === 'EROFS' || e.message.includes('read-only'))) {
      throw new Error('Database delete failed and file system is read-only.');
    }
  }
};
