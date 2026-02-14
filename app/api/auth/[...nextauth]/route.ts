import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUsers } from "@/lib/users";
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { logLoginAttempt } from "@/lib/logger";

// For now, hardcoded credentials until DB is fully stable.
// Access: admin / 123456
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Kullanıcı Adı", type: "text" },
        password: { label: "Şifre", type: "password" }
      },
      async authorize(credentials) {
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for") || "unknown";
        const userAgent = headersList.get("user-agent") || "unknown";

        if (!credentials?.username || !credentials?.password) {
            logLoginAttempt("unknown", false, ip, userAgent);
            return null;
        }

        const users = getUsers();
        
        // 1. Check against DB users
        const user = users.find(u => u.username === credentials.username);
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
            if (isValid) {
                logLoginAttempt(credentials.username, true, ip, userAgent);
                return { id: user.id, name: user.name, email: `${user.username}@hubcos.com` };
            }
            logLoginAttempt(credentials.username, false, ip, userAgent);
            return null;
        }

        // 2. Fallback: Hardcoded admin if NO users exist (or specifically for 'admin' if desired, but better to generic fallback only if empty?)
        // Let's keep the hardcoded admin active IF the username matches 'admin' AND no user in DB has username 'admin'.
        // Actually, simplest is: if not found in DB, check hardcoded.
        if (
          credentials.username === "admin" &&
          credentials.password === "123456"
        ) {
          return { id: "0", name: "System Admin", email: "admin@hubcos.com" };
        }

        logLoginAttempt(credentials.username, false, ip, userAgent);

        return null;
      }
    })
  ],
  pages: {
    signIn: "/O3_HubCos-7x24-STARK-V2.0-SECURE/login",
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async jwt({ token, user }) {
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "hubcos-secret-key-123",
  debug: true,
});

export { handler as GET, handler as POST };
