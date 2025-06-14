import { ResetPasswordContainer } from "@/containers";
import { useDocTitle } from "@/hooks";

export const ResetPasswordPage = () => {
  const { setTitle } = useDocTitle();

  setTitle("Reset Password | Note App");

  return <ResetPasswordContainer />;
};
