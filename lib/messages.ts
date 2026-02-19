

import { prisma } from '@/lib/prisma';
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

// Helper to read JSON (Fallback)
const getJsonMessages = (): Message[] => {
  if (!fs.existsSync(dataPath)) return [];
  try {
    const file = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
};

export const getMessages = async (): Promise<Message[]> => {
  if (prisma) {
    try {
      const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return messages.map(m => ({
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone || undefined,
        subject: "İletişim Formu Mesajı", // Default subject as schema doesn't have it? Wait, let's check schema.
        message: m.message,
        date: m.createdAt.toLocaleDateString('tr-TR'),
        read: m.read
      }));
    } catch (error) {
      console.warn("DB fetch messages failed, falling back to JSON");
    }
  }
  return getJsonMessages();
};

export const addMessage = async (msg: Omit<Message, 'id' | 'date' | 'read'>) => {
  if (prisma) {
    try {
      const newMessage = await prisma.message.create({
        data: {
          name: msg.name,
          email: msg.email,
          phone: msg.phone,
          message: msg.message,
          read: false
          // subject is missing in schema?
        }
      });
      return {
        id: newMessage.id,
        name: newMessage.name,
        email: newMessage.email,
        phone: newMessage.phone || undefined,
        subject: msg.subject,
        message: newMessage.message,
        date: newMessage.createdAt.toLocaleDateString('tr-TR'),
        read: newMessage.read
      };
    } catch (e) {
      console.error("DB write message failed", e);
      throw new Error("Database write failed");
    }
  }

  // Fallback to JSON
  const messages = getJsonMessages();
  const newMessage: Message = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('tr-TR'),
    read: false,
    ...msg
  };
  messages.unshift(newMessage);
  fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
  return newMessage;
};

export const markAsRead = async (id: string) => {
  if (prisma) {
    try {
      await prisma.message.update({
        where: { id },
        data: { read: true }
      });
      return;
    } catch (e) {
      console.error("DB mark read failed", e);
    }
  }

  const messages = getJsonMessages();
  const msg = messages.find(m => m.id === id);
  if (msg) {
    msg.read = true;
    fs.writeFileSync(dataPath, JSON.stringify(messages, null, 2));
  }
};

export const deleteMessage = async (id: string) => {
  if (prisma) {
    try {
      await prisma.message.delete({ where: { id } });
      return;
    } catch (e) {
      console.error("DB delete message failed", e);
    }
  }

  const messages = getJsonMessages();
  const filtered = messages.filter(m => m.id !== id);
  fs.writeFileSync(dataPath, JSON.stringify(filtered, null, 2));
};
