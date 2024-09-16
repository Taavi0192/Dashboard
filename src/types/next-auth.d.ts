// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession{
    user: {
      id: string; // Add the 'id' property
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    expires: string;
  }

  interface User {
    id: string; // Add the 'id' property
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}
