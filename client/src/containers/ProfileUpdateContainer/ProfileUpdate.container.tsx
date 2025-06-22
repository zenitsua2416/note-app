import { useForm } from "react-hook-form";

import { Button, Input } from "@heroui/react";

import { selectUserProfile } from "@/features";
import { useAppSelector } from "@/hooks";

export const ProfileUpdateContainer = () => {
  const userProfile = useAppSelector(selectUserProfile);
  const { register } = useForm({
    defaultValues: {
      displayName: userProfile?.full_name,
    },
  });

  return (
    <>
      <h2 className="my-12 text-2xl font-semibold">Your Profile</h2>
      <form className="mb-8 flex w-full max-w-96 flex-col items-start gap-4">
        <Input
          id="displayName"
          label="Display Name"
          labelPlacement="outside"
          placeholder="John Doe..."
          autoComplete="off"
          {...register("displayName", {
            required: "Display name is required",
          })}
        />
        <Button
          type="submit"
          color="primary"
          // disabled={loading}
        >
          Save
        </Button>
      </form>
    </>
  );
};
