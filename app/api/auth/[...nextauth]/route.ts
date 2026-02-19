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
        console.log("[NextAuth] Authorize called with:", credentials?.username);

        try {
          // EMERGENCY HARDCODED AUTH to bypass all DB/FS/Bcrypt dependencies
          const validUser = "HUBYAPI";
          const validPass = "123456";

          if (
            credentials?.username?.toLowerCase() === validUser.toLowerCase() &&
            credentials?.password === validPass
          ) {
            console.log("[NextAuth] Success via hardcoded check");
            return {
                id: "hardcoded-admin",
                name: "HUBYAPI",
                email: "info@hubyapı.com",
                role: 'admin'
              };
            }

          // RESTORED DB LOGIC START
          const headersList = await headers();
          const ip = headersList.get("x-forwarded-for") || "unknown";
          const userAgent = headersList.get("user-agent") || "unknown";

          // 1. Check against DB users using the helper
          const users = await getUsers();
          // Case-insensitive find
          const user = users.find(u => u.username.toLowerCase() === credentials?.username?.toLowerCase());

          if (user) {
            const isValid = await bcrypt.compare(credentials?.password || "", user.passwordHash);
            if (isValid) {
              console.log("[NextAuth] Password valid for user:", user.username);
              logLoginAttempt(credentials?.username || "unknown", true, ip, userAgent);
              return {
                id: user.id,
                name: user.username,
                email: "info@hubyapı.com",
                role: 'admin' // Ensure role is passed
              };
            }
          }
          // RESTORED DB LOGIC END

          console.log("[NextAuth] Invalid credentials via hardcoded check and DB check");
          return null;

        } catch (error) {
          console.error("[NextAuth] Critical Error in Authorize:", error);
          return null;
        }
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
