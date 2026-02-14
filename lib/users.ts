import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export type User = {
  id: string;
  username: string;
  passwordHash: string; // Store hashed password
  name: string;
  role: 'admin' | 'editor';
};

const dataPath = path.join(process.cwd(), 'data/users.json');

export const getUsers = (): User[] => {
  if (!fs.existsSync(dataPath)) {
    return [];
  }
  const file = fs.readFileSync(dataPath, 'utf-8');
  try {
      return JSON.parse(file);
  } catch (e) {
      return [];
  }
};

export const saveUsers = (users: User[]) => {
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

export const addUser = async (user: Omit<User, 'id' | 'passwordHash'> & { password: string }) => {
  const users = getUsers();
  
  // Check if username exists
  if (users.find(u => u.username === user.username)) {
    throw new Error('Username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  const newUser: User = {
    id: Date.now().toString(),
    username: user.username,
    passwordHash: hash,
    name: user.name,
    role: user.role
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const deleteUser = (id: string) => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  saveUsers(filtered);
};
