import { NoteListContainer } from "@/containers";
import { useDocTitle } from "@/hooks";

export const HomePage = () => {
  const { setTitle } = useDocTitle();

  setTitle("Home");

  return (
    <div className="max-w-app mx-auto h-full pt-5">
      <div className="mb-8">
        <h1 className="text-center text-3xl font-semibold text-blue-500">
          Home Page
        </h1>
      </div>

      <NoteListContainer />
    </div>
  );
};
