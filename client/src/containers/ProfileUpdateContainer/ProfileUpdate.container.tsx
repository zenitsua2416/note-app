import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Spinner } from "@heroui/react";
import { z } from "zod";

import { selectUserProfile } from "@/features";
import { useAppSelector, useNotify } from "@/hooks";
import { supabase } from "@/supabase";
import { UserRound, UserRoundPen } from "lucide-react";

const ProfileUpdateSchema = z.object({
  displayName: z.string().min(3),
  avatar: z
    .any()
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file?.[0]?.type),
      "Invalid image type",
    ),
});

type ProfileUpdateSchema = z.infer<typeof ProfileUpdateSchema>;

export const ProfileUpdateContainer = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

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
      setAvatarPreview(userProfile.avatar_url ?? "");
    }
  }, [userProfile, reset]);

  // Refs
  const initialDisplayName = useRef(userProfile.full_name ?? "");

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = useCallback(
    async (data: ProfileUpdateSchema) => {
      const user_id = userProfile.user_id;
      if (!user_id) {
        notify({
          title: "User is not logged in!!!",
          type: "error",
        });
      }
      let avatarPath: string | null = null;
      let avatarUrl: string | null = null;

      // First upload the image, if available
      const avatars = data.avatar as FileList;
      if (avatars.length) {
        const avatar = avatars[0];
        const fileExt = avatar.name.split(".").pop();
        const filePath = `${user_id}/profile.${fileExt}`;

        const { error } = await supabase.storage
          .from("user-avatars")
          .upload(filePath, avatar, {
            upsert: true,
            cacheControl: "3600",
            contentType: avatar.type,
          });

        if (error) {
          console.error(error);
          notify({
            title: "Unable to save the avatar",
            description: "Please try again later",
            type: "error",
          });
          return;
        }

        const { data: publicUrlData } = await supabase.storage
          .from("user-avatars")
          .getPublicUrl(filePath);

        avatarPath = filePath;
        avatarUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from("user_profile")
        .update({
          full_name: data.displayName,
          avatar_url: avatarUrl,
          avatar_path: avatarPath,
        })
        .eq("id", userProfile.id);

      if (error) {
        notify({
          title: "Cannot update profile",
          description: "Please try again later",
          type: "error",
        });
        return;
      }

      notify({
        title: "Profile updated",
        description: "Your profile has been updated",
        type: "success",
      });
      initialDisplayName.current = data.displayName;
    },
    [notify, userProfile.id, userProfile.user_id],
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

  const isChanged =
    currentDisplayName !== initialDisplayName.current ||
    (watch("avatar") as FileList)?.length > 0;

  return (
    <>
      <h2 className="mb-12 text-2xl font-semibold">Your Profile</h2>
      <form
        className="mb-8 flex w-full max-w-96 flex-col items-start gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="group relative h-40 w-40 overflow-hidden rounded-full shadow ring-1 ring-neutral-300 dark:ring-neutral-700">
          <input
            type="file"
            accept="image/*"
            title="Choose an image for your profile avatar"
            {...register("avatar")}
            onChange={handlePreview}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
          />

          {avatarPreview ? (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-neutral-200 dark:bg-neutral-800">
              <UserRound className="h-12 w-12 text-neutral-400" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 ease-in-out group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
            <UserRoundPen className="h-6 w-6 scale-90 transform text-white transition-transform duration-300 group-focus-within:scale-100 group-hover:scale-100" />
          </div>
        </div>

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
