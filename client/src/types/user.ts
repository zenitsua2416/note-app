import { UUID } from ".";

export interface User {
  id: UUID;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: number;
  user_id: UUID;
  email: string;
  full_name?: string;
  avatar_url?: string;
}
