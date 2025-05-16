import { Note } from "@/components/ui";
import { Each } from "@/components/utils";

import { NoteGridProps } from "./NoteGrid.types";

export const NoteGrid = ({ notes, endChild }: NoteGridProps) => (
  <div className="grid grid-cols-3 items-stretch gap-x-4 gap-y-6">
    <Each of={notes} render={(note) => <Note key={note.id} {...note} />} />
    {endChild}
  </div>
);
