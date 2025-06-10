import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";

import { ROUTES } from "@/constants";
import { supabase } from "@/supabase";

import { SignupFormFields } from "./SignupPage.types";

export const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<SignupFormFields>({
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormFields) => {
    const { data: res, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    console.log(res, error);
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  return (
    <div className="h-full">
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pb-10 pt-6">
          <p className="pb-4 text-left text-3xl font-semibold dark:text-slate-100">
            Sign Up
            <span aria-label="emoji" className="ml-2" role="img">
              👋
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
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
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value ===
                  (watch("password") || "Confirm password is required"),
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
              Sign Up
            </Button>
          </form>
          <p className="text-small text-default-800 text-center hover:underline">
            <Link to={ROUTES.LOGIN_ROUTE}>Already have an account? Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
