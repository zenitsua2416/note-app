import { Note } from "@/types";

export type NewNoteFormData = Omit<
  Note,
  "id" | "in_trash" | "user_id" | "created_at"
>;
