import { UserRole } from "./user-role.enum";

/** A pared-down view of your Firebase user */
export interface AppUser {
    uid: string;
    email: string | null;
    displayName?: string | null;
    photoURL?: string | null;
    role: UserRole;
    phone?: string | null;
  }
  