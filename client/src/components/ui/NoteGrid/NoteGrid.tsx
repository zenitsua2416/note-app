import { Each } from "@/components/utils";
import { Note } from "@/components/ui";

import { NoteGridProps } from "./NoteGrid.types";

export const NoteGrid = ({ notes, endChild }: NoteGridProps) => (
  <div className="grid grid-cols-3 items-start gap-x-4">
    <Each of={notes} render={(note) => <Note key={note.id} {...note} />} />
    {endChild}
  </div>
);
