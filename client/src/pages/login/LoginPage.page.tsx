import { LoginContainer } from "@/containers";
import { useDocTitle } from "@/hooks";

export const LoginPage = () => {
  const { setTitle } = useDocTitle();

  setTitle("Login | Note App");

  return (
    <div className="h-full">
      <div className="flex h-full w-full items-center justify-center">
        <LoginContainer />
      </div>
    </div>
  );
};
