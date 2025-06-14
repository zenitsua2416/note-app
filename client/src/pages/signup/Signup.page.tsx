import { SignupContainer } from "@/containers";
import { useDocTitle } from "@/hooks";

export const SignupPage = () => {
  const { setTitle } = useDocTitle();

  setTitle("Signup | Note App");
  return (
    <div className="h-full">
      <div className="flex h-full w-full items-center justify-center">
        <SignupContainer />
      </div>
    </div>
  );
};
