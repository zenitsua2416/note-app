import { ForgotPasswordContainer } from "@/containers";
import { useDocTitle } from "@/hooks";

export const ForgotPasswordPage = () => {
  const { setTitle } = useDocTitle();

  setTitle("Forgot Password | Note App");

  return <ForgotPasswordContainer />;
};
