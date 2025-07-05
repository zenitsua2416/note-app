import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "lodash.debounce";
import { Eye, EyeClosed } from "lucide-react";
import { z } from "zod";

import { logout } from "@/features";
import { useAppDispatch, useNotify } from "@/hooks";
import { supabase } from "@/supabase";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFields = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordContainer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { touchedFields, errors },
  } = useForm<ResetPasswordFields>({
    mode: "onChange",
    resolver: zodResolver(resetPasswordSchema),
  });
  const notify = useNotify();

  const onSubmitHandler = useCallback(
    async (data: ResetPasswordFields) => {
      console.log("calling");
      setIsSubmitting(true);
      const { password } = data;

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError("root", { message: error.message });
      } else {
        notify({
          title: "Successfully changed the password",
          description: "",
          type: "success",
        });

        // At this point, supabase will automatically logs in the user, but we want to log out the user
        dispatch(logout());
      }
      setIsSubmitting(false);
    },
    [setError, notify, dispatch],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(
    debounce(onSubmitHandler, 1500, { leading: true, trailing: false }),
    [onSubmitHandler],
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
              isInvalid={!!touchedFields.password && !!errors.password}
              errorMessage={errors.password?.message}
              {...register("password")}
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
              {...register("confirmPassword")}
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
            {errors.root && (
              <p className="text-danger-500 text-small text-center">
                {errors.root.message}
              </p>
            )}

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
