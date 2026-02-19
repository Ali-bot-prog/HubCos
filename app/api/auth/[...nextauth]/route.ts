import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { headers } from "next/headers";

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

          console.log("[NextAuth] Invalid credentials via hardcoded check");
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
