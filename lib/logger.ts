import fs from 'fs';
import path from 'path';

export type LoginLog = {
  timestamp: string;
  ip: string;
  username: string;
  success: boolean;
  userAgent?: string;
};

const logPath = path.join(process.cwd(), 'data/login-logs.json');

export const logLoginAttempt = (username: string, success: boolean, ip: string, userAgent?: string) => {
  const logEntry: LoginLog = {
    timestamp: new Date().toISOString(),
    ip,
    username,
    success,
    userAgent
  };

  const logs = getLoginLogs();
  logs.unshift(logEntry); // Add new log to the beginning

  // Keep only the last 1000 logs to prevent file from growing too large
  const trimmedLogs = logs.slice(0, 1000);

  saveLoginLogs(trimmedLogs);
};

export const getLoginLogs = (): LoginLog[] => {
  if (!fs.existsSync(logPath)) {
    return [];
  }
  const file = fs.readFileSync(logPath, 'utf-8');
  try {
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
};

const saveLoginLogs = (logs: LoginLog[]) => {
  const dir = path.dirname(logPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
};
