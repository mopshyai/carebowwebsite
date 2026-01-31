import { UserType } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  type: UserType;
  hasProfile: boolean;
}

export interface AuthSession {
  user: User;
  expires: string;
}

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      type: UserType;
      hasProfile?: boolean;
    };
  }

  interface User {
    id: string;
    type: UserType;
    hasProfile?: boolean;
  }
}
