import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@heroui/react";
import { FilePlus2 } from "lucide-react";

import { addNotes, selectAuthUser } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { supabase } from "@/supabase";

import { NewNoteFormData } from "./NewNote.types";

export const NewNotePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewNoteFormData>();

  const onSubmit: SubmitHandler<NewNoteFormData> = async (data) => {
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
      navigate(`/note/${notes[0]}`);
    }
  };

  return (
    <div className="max-w-app mx-auto pt-5">
      <div className="px-2">
        <h1 className="text-center text-3xl font-semibold">Create Note</h1>

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
                className="hover:bg-default-100 active:bg-default-100 focus:bg-default-100 text-default-900 w-full rounded-r-md border-l bg-transparent px-4 py-2 text-4xl font-black leading-6 outline-none lg:text-6xl"
                aria-required="true"
                aria-invalid={!!errors.title}
                aria-describedby="new-note-title-error"
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
                className="hover:bg-default-100 focus:bg-default-100 w-full resize-none rounded-md bg-transparent p-4 font-mono text-lg outline-none"
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
      </div>
    </div>
  );
};
