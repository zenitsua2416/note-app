import { NewNoteContainer } from "@/containers";
import { useDocTitle } from "@/hooks";

export const NewNotePage = () => {
  const { setTitle } = useDocTitle();

  setTitle("New Note | Note App");

  return (
    <div className="max-w-app mx-auto pt-5">
      <div className="px-2">
        <h1 className="text-center text-3xl font-semibold">Create Note</h1>

        <NewNoteContainer />
      </div>
    </div>
  );
};
