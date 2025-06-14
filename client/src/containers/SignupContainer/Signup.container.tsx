import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { z } from "zod";

import { ROUTES } from "@/constants";
import { supabase } from "@/supabase";

const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
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

type SignupFormFields = z.infer<typeof signupSchema>;

export const SignupContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, touchedFields },
  } = useForm<SignupFormFields>({
    mode: "onTouched",
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormFields) => {
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError("root", {
        message: error.message,
      });
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pb-10 pt-6">
      <p className="pb-4 text-left text-3xl font-semibold dark:text-slate-100">
        Sign Up
        <span aria-label="emoji" className="ml-2" role="img">
          👋
        </span>
      </p>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
            input: "dark:text-white",
          }}
        />
        <Input
          isRequired
          label="Password"
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
                <EyeClosed className="dark:text-default-500" />
              ) : (
                <Eye className="dark:text-default-500" />
              )}
            </button>
          }
        />
        <Input
          isRequired
          label="Confirm Password"
          labelPlacement="outside"
          placeholder="Confirm your password"
          type={isConfirmVisible ? "text" : "password"}
          variant="bordered"
          isInvalid={
            !!touchedFields.confirmPassword && !!errors.confirmPassword
          }
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          endContent={
            <button type="button" onClick={toggleConfirmVisibility}>
              {isConfirmVisible ? (
                <EyeClosed className="dark:text-default-500" />
              ) : (
                <Eye className="dark:text-default-500" />
              )}
            </button>
          }
        />

        <Button
          color="primary"
          type="submit"
          isLoading={isSubmitting}
          className="mt-4"
        >
          Sign Up
        </Button>
      </form>
      <p className="text-small text-default-800 text-center hover:underline">
        <Link to={ROUTES.LOGIN_ROUTE}>Already have an account? Log In</Link>
      </p>
    </div>
  );
};
