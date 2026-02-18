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
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for") || "unknown";
        const userAgent = headersList.get("user-agent") || "unknown";

        if (!credentials?.username || !credentials?.password) {
          console.log("[NextAuth] Missing credentials");
            logLoginAttempt("unknown", false, ip, userAgent);
            return null;
        }

        // 1. Check against DB users using the helper
        // We use getUsers which now fetches from DB, but better to filter efficiently if we had many users.
        // For now, we fetch all and find, or we can add a specific find helper.
        // Let's use the new finding logic.
        const users = await getUsers();
        const user = users.find(u => u.username === credentials.username);

        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
            if (isValid) {
              console.log("[NextAuth] Password valid for user:", user.username);
                logLoginAttempt(credentials.username, true, ip, userAgent);
              // Return simple object to avoid serialisation issues
              return {
                id: user.id,
                name: user.username, // Use username as name 
                email: "admin@hubcos.com" // Dummy email as it might be required
              };
            }
          console.log("[NextAuth] Invalid password");
            logLoginAttempt(credentials.username, false, ip, userAgent);
            return null;
        }

        // 2. Fallback: Removed strictly. Everything must be in DB.
        // But for safety during migration, if NO admin exists in DB, maybe we allow fallback?
        // No, let's rely on the seed.

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
