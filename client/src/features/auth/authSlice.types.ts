import { AuthSession } from "@/types";

export interface ExtendedAuthSession extends AuthSession {
  isLoggedIn: boolean;
}
