import { Note } from "@/components/ui";
import { Each } from "@/components/utils";

import { NoteGridProps } from "./NoteGrid.types";

export const NoteGrid = ({ notes, endChild }: NoteGridProps) => (
  <div className="grid grid-cols-1 items-stretch gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
    <Each of={notes} render={(note) => <Note key={note.id} {...note} />} />
    {endChild}
  </div>
);
