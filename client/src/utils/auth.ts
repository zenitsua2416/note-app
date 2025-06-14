import { AuthSession } from "@/types";

export const isValidSession = (session: AuthSession | null): boolean => {
  if (!session || !session.access_token) return false;
  return session.expires_at > Date.now() / 1000;
};
