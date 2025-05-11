import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Checkbox, Input } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";

import { login } from "@/features";
import { useAppDispatch } from "@/hooks";
import { supabase } from "@/supabase";
import { AuthSession } from "@/types";

import { LoginFormFields } from "./LoginPage.types";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormFields>({
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormFields) => {
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) setError("root", { message: error.message });
    else if (session) {
      // success
      dispatch(login(session as AuthSession));
    }
  };

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="h-screen pt-20">
      <div className="flex h-full w-full items-center justify-center">
        <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pb-10 pt-6">
          <p className="text-default-800 pb-4 text-left text-3xl font-semibold">
            Log In
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
            <Input
              isRequired
              label="Password"
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
                    <EyeClosed className="text-default-500" />
                  ) : (
                    <Eye className="text-default-500" />
                  )}
                </button>
              }
              classNames={{
                input: "text-default-700",
              }}
            />
            <div className="flex w-full items-center justify-between px-1 pt-2">
              <Checkbox defaultSelected size="sm" {...register("remember")}>
                Remember me
              </Checkbox>
              <Link className="text-default-500" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

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
              Log In
            </Button>
          </form>
          <p className="text-small text-default-800 text-center">
            <Link to="/signup">Don&apos;t have account? Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
