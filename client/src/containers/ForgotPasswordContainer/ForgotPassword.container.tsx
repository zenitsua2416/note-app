import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ROUTES } from "@/constants";
import { supabase } from "@/supabase";
import { getEnv } from "@/utils";
import { useNotify } from "@/hooks";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, touchedFields },
  } = useForm<ForgotPasswordFields>({
    mode: "onTouched",
    resolver: zodResolver(forgotPasswordSchema),
  });
  const notify = useNotify();

  const onSubmit = useCallback(
    async (data: ForgotPasswordFields) => {
      const { email } = data;
      const appUrl = getEnv("VITE_APP_URL");

      try {
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${appUrl}/reset-password`,
        });
        notify({
          title: "Reset password email sent!",
          description:
            "Please check your email for a link to reset your password.",
          type: "success",
        });
      } catch (error) {
        notify({
          title: "Something went wrong. Please try again.",
          type: "error",
        });
        console.error(error);
      }
    },
    [notify],
  );

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
              isInvalid={!!touchedFields.email && !!errors.email}
              errorMessage={errors.email?.message}
              {...register("email")}
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
