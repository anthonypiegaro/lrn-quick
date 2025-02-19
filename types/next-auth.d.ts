import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// 🔹 Extend User Type
declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        email: string;
    }

    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
        };
    }

    interface JWT extends DefaultJWT {
        id: string;
        email: string;
    }
}
