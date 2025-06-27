import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@heroui/react";
import { z } from "zod";

import { selectUserProfile } from "@/features";
import { useAppSelector, useNotify } from "@/hooks";
import { supabase } from "@/supabase";

const ProfileUpdateSchema = z.object({
  displayName: z.string().min(3),
});

type ProfileUpdateSchema = z.infer<typeof ProfileUpdateSchema>;

export const ProfileUpdateContainer = () => {
  const notify = useNotify();
  const userProfile = useAppSelector(selectUserProfile);
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<ProfileUpdateSchema>({
    mode: "onTouched",
    resolver: zodResolver(ProfileUpdateSchema),
  });

  useEffect(() => {
    if (userProfile.full_name) {
      reset({
        displayName: userProfile.full_name,
      });
    }
  }, [userProfile, reset]);

  // Refs
  const initialDisplayName = useRef(userProfile?.full_name ?? "");

  const onSubmit = useCallback(
    async (data: ProfileUpdateSchema) => {
      const { error, data: res } = await supabase
        .from("user_profile")
        .update({
          full_name: data.displayName,
        })
        .eq("id", userProfile.id);

      if (error) {
        console.log(error);
        notify({
          title: "Cannot update profile",
          description: "Please try again later",
          type: "error",
        });
        return;
      }

      console.log(res);
      notify({
        title: "Profile updated",
        description: "Your profile has been updated",
        type: "success",
      });
      initialDisplayName.current = data.displayName;
    },
    [notify, userProfile.id],
  );

  if (userProfile.user_id === "") {
    return (
      <div className="mb-8 flex gap-2">
        <Spinner variant="simple" size="sm" color="current" />
        <p>Loading...</p>
      </div>
    );
  }

  const currentDisplayName = watch("displayName");

  const isChanged = currentDisplayName !== initialDisplayName.current;

  return (
    <>
      <h2 className="mb-12 text-2xl font-semibold">Your Profile</h2>
      <form
        className="mb-8 flex w-full max-w-96 flex-col items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="displayName"
          label="Display Name"
          labelPlacement="outside"
          placeholder="John Doe..."
          {...register("displayName")}
        />
        <Button
          type="submit"
          color="primary"
          isLoading={isSubmitting}
          isDisabled={!isChanged}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </form>
    </>
  );
};
