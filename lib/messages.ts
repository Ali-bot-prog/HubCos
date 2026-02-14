import fs from 'fs';
import path from 'path';

export type Message = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string; // ISO string or formatted date
  read: boolean;
};

const dataPath = path.join(process.cwd(), 'data/messages.json');

export const getMessages = (): Message[] => {
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

export const saveMessages = (messages: Message[]) => {
  // Ensure directory exists
  const dir = path.dirname(dataPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
};

export const addMessage = (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
  const messages = getMessages();
  const newMessage: Message = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('tr-TR'),
    read: false,
    ...msg
  };
  messages.unshift(newMessage); // Add to beginning
  saveMessages(messages);
  return newMessage;
};

export const markAsRead = (id: string) => {
  const messages = getMessages();
  const msg = messages.find(m => m.id === id);
  if (msg) {
    msg.read = true;
    saveMessages(messages);
  }
};

export const deleteMessage = (id: string) => {
  const messages = getMessages();
  const filtered = messages.filter(m => m.id !== id);
  saveMessages(filtered);
};
