import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Input } from "@heroui/react";

import { ROUTES } from "@/constants";

import { ForgotPasswordFields } from "./ForgotPassword.types";
import { supabase } from "@/supabase";
import { getEnv } from "@/utils";
import { useCallback } from "react";

export const ForgotPasswordContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ForgotPasswordFields>({
    mode: "onChange",
  });

  const onSubmit = useCallback(async (data: ForgotPasswordFields) => {
    const { email } = data;
    const appUrl = getEnv("VITE_APP_URL");
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${appUrl}/reset-password`,
    });
  }, []);

  return (
    <div className="h-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pb-10 pt-6">
          <p className="text-default-800 pb-4 text-left text-3xl font-semibold">
            Forgot Password
            <span aria-label="emoji" className="ml-2" role="img">
              ❓
            </span>
          </p>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              classNames={{
                input: "text-default-700",
              }}
            />

            {errors.root && (
              <p className="text-small text-danger-500 text-center">
                {errors.root.message}
              </p>
            )}

            <Button
              isLoading={isSubmitting}
              color="primary"
              type="submit"
              className="mt-4"
            >
              Send Reset Link
            </Button>
          </form>
          <p className="text-small text-default-800 text-center hover:underline">
            <Link to={ROUTES.LOGIN_ROUTE}>Wanna login? Click here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
