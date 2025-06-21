import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { Button, Checkbox, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import { z } from "zod";

import { ROUTES } from "@/constants";
import { login } from "@/features";
import { useAppDispatch } from "@/hooks";
import { supabase } from "@/supabase";
import { AuthSession } from "@/types";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

type LoginFormFields = z.infer<typeof loginSchema>;

export const LoginContainer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormFields>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
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
    console.log(session);

    if (error) setError("root", { message: error.message });
    else if (session) {
      // success
      dispatch(login(session as AuthSession));
    }
  };
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="rounded-large flex w-full max-w-sm flex-col gap-4 px-8 pb-10 pt-6">
      <p className="text-default-800 pb-4 text-left text-3xl font-semibold">
        Log In
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
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
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
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
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
          <Link className="text-default-500" to={ROUTES.FORGOT_PASSWORD_ROUTE}>
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
      <p className="text-small text-default-800 text-center hover:underline">
        <Link to={ROUTES.SIGNUP_ROUTE}>Don&apos;t have account? Sign Up</Link>
      </p>
    </div>
  );
};
