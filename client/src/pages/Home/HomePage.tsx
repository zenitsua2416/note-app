import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Button } from "@heroui/react";
import { PlusIcon } from "lucide-react";

import { NoteGrid } from "@/components/ui";
import { NEW_NOTE_ROUTE } from "@/constants";
import { addNotes, selectNotes } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { supabase } from "@/supabase";
import { Note as INote } from "@/types";
import { saveToStorage } from "@/utils";

export const HomePage = () => {
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
    <div className="max-w-app mx-auto h-full pt-5">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-semibold text-blue-500">
          Home Page
        </h1>
      </div>

      <div className="px-2">
        <NoteGrid
          notes={notes}
          endChild={
            <Button
              as={Link}
              to={NEW_NOTE_ROUTE}
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
    </div>
  );
};
