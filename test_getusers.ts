import { getUsers } from './lib/users';
import bcrypt from 'bcryptjs';

async function main() {
  const users = await getUsers();
  console.log('Users returned by getUsers():', users);
  
  if (users.length > 0) {
    const user = users.find(u => u.username.toLowerCase() === 'hubyapi');
    if (user) {
      console.log('Found user HUBYAPI:', user);
      const isBcrypt = user.passwordHash.startsWith("$2a$") || user.passwordHash.startsWith("$2b$");
      console.log('Is bcrypt:', isBcrypt);
      
      const isValid = isBcrypt
        ? await bcrypt.compare('123456', user.passwordHash)
        : '123456' === user.passwordHash;
      console.log('Is valid with 123456:', isValid);
    }
  }
}

main().catch(console.error);
