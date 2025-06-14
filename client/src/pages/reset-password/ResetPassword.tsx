import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import debounce from "lodash.debounce";

import { useDocTitle } from "@/hooks";
import { supabase } from "@/supabase";

import { ResetPasswordFields } from "./ResetPassword.types";

export const ResetPasswordPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<ResetPasswordFields>({
    mode: "onChange",
  });
  const { setTitle } = useDocTitle();

  setTitle("Reset Password | Note App");
  const onSubmitHandler = useCallback(
    async (data: ResetPasswordFields) => {
      const { password, confirmPassword } = data;

      if (password !== confirmPassword) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
        return;
      }

      await supabase.auth.updateUser({ password });
    },
    [setError],
  );

  const debouncedSubmit = useCallback(
    debounce(onSubmitHandler, 1500, { leading: true, trailing: false }),
    [],
  );

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className="h-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pb-10 pt-6">
          <p className="pb-4 text-left text-3xl font-semibold dark:text-slate-100">
            Reset Password
            <span aria-label="emoji" className="ml-2" role="img">
              🗝️
            </span>
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(debouncedSubmit)}
          >
            <Input
              isRequired
              label="New Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              errorMessage={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeClosed className="dark:text-white" />
                  ) : (
                    <Eye className="dark:text-white" />
                  )}
                </button>
              }
              classNames={{
                input: "dark:text-white",
              }}
            />
            <Input
              isRequired
              label="Confirm Password"
              labelPlacement="outside"
              placeholder="Confirm your password"
              type={isConfirmVisible ? "text" : "password"}
              variant="bordered"
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              endContent={
                <button type="button" onClick={toggleConfirmVisibility}>
                  {isConfirmVisible ? (
                    <EyeClosed className="dark:text-white" />
                  ) : (
                    <Eye className="dark:text-white" />
                  )}
                </button>
              }
              classNames={{
                input: "dark:text-white",
              }}
            />

            <Button
              color="primary"
              type="submit"
              isLoading={isSubmitting}
              className="mt-4"
            >
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
