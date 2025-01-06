import { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        imageId?: string | null;
        role?: string | null;
    }

    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
            imageId?: string | null;
            role?: string | null;
        };
    }

    interface JWT {
        id: string;
        imageId?: string | null;
        role?: string | null;
    }
}
