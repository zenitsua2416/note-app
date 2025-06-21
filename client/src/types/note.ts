import { UUID } from "./utils";

export interface Note {
  id: UUID;
  title: string;
  notes: string | null;
  created_at: string;
  in_trash: boolean;
  user_id: UUID;
}

export type NoteStore = Record<UUID, Note>;
