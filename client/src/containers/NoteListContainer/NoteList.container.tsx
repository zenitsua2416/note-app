import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";

import { NoteGrid } from "@/components/ui";
import { ROUTES } from "@/constants";
import { addNotes, selectNotes } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { supabase } from "@/supabase";
import { Note as INote } from "@/types";
import { saveToStorage } from "@/utils";

export const NoteListContainer = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector(selectNotes);

  useEffect(() => {
    (async () => {
      const { data: notes } = await supabase.from("note").select("*");
      if (!notes) return;

      saveToStorage<INote[]>("notes", notes);
      dispatch(addNotes(notes));
    })();
  }, [dispatch]);

  return (
    <div className="px-2">
      <NoteGrid
        notes={notes}
        endChild={
          <Button
            as={Link}
            to={ROUTES.NEW_NOTE_ROUTE}
            variant="ghost"
            color="danger"
            startContent={<PlusIcon />}
            className="self-end"
          >
            Add Note
          </Button>
        }
      />
    </div>
  );
};
