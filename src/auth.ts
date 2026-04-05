import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // In production, you would check against the database:
        // const user = await db.user.findUnique({ where: { email: credentials.email as string } });
        // if (!user || !user.passwordHash) return null;
        // const isValid = await bcrypt.compare(credentials.password as string, user.passwordHash);
        // if (!isValid) return null;

        // FOR NOW: Maintain your admin login for demo
        const adminEmail = process.env.ADMIN_EMAIL || "admin@earthquake.gov.in";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin1234";

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: "admin-001",
            name: "Admin User",
            email: adminEmail as string,
            role: "ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
