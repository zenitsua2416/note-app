import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus2 } from "lucide-react";
import { z } from "zod";

import { ROUTES } from "@/constants";
import { addNotes, selectAuthUser } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { supabase } from "@/supabase";

const newNoteSchema = z.object({
  title: z.string().min(1, "This field is required"),
  notes: z.string().min(1, "This field is required"),
});

type NewNoteFields = z.infer<typeof newNoteSchema>;

const { NOTE_ROUTE } = ROUTES;

export const NewNoteContainer = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewNoteFields>({
    resolver: zodResolver(newNoteSchema),
  });

  const onSubmit: SubmitHandler<NewNoteFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { data: notes, error } = await supabase
      .from("note")
      .insert([
        {
          title: data.title,
          notes: data.notes,
          in_trash: false,
          user_id: user.id,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return;
    } else {
      dispatch(addNotes(notes));
      navigate(NOTE_ROUTE(notes[0].id));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 flex flex-col gap-4">
        <div className="my-8">
          <label htmlFor="new-note-title-field" className="sr-only">
            Note Title:
          </label>
          <input
            type="text"
            id="new-note-title-field"
            autoComplete="off"
            disabled={isSubmitting}
            {...register("title", {
              required: "This field is required",
            })}
            placeholder="Title goes here"
            aria-required="true"
            aria-invalid={!!errors.title}
            aria-describedby="new-note-title-error"
            className="hover:bg-default-100 active:bg-default-100 focus:bg-default-100 text-default-900 border-default-400 w-full rounded-r-md border-l-2 bg-transparent px-4 py-2 text-4xl font-black leading-6 outline-none lg:text-6xl"
          />
          {errors.title && (
            <p
              id="new-note-title-error"
              className="mt-1 text-sm text-red-500"
              role="alert"
            >
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="mb-8">
          <label htmlFor="new-note-content-field" className="sr-only">
            Note Content:
          </label>
          <textarea
            id="new-note-content-field"
            {...register("notes")}
            disabled={isSubmitting}
            placeholder="We support markdown"
            rows={10}
            className="hover:bg-default-100 text-default-600 focus:bg-default-100 w-full resize-none rounded-md bg-transparent p-4 font-mono text-lg outline-none"
          />
        </div>

        <Button
          color="primary"
          isLoading={isSubmitting}
          startContent={!isSubmitting && <FilePlus2 size={20} />}
          type="submit"
          aria-label="Create Note"
        >
          Create Note
        </Button>
      </div>
    </form>
  );
};
