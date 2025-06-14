import { useNavigate } from "react-router-dom";

import { toast } from "sonner";

import { NotifyPayload, ToastType } from "@/types";

export const useNotify = () => {
  const navigate = useNavigate();

  const notify = (payload: NotifyPayload) => {
    const {
      title,
      description,
      type = "info" as ToastType,
      duration,
      redirectTo,
      redirectDelay = 2000,
      action,
    } = payload;

    if (type === "normal") {
      toast(title, {
        description,
        duration,
        action,
      });
    } else {
      const { success, error, info, warning } = toast;
      let toastFn;

      if (type === "success") toastFn = success;
      else if (type === "error") toastFn = error;
      else if (type === "info") toastFn = info;
      else if (type === "warning") toastFn = warning;
      else toastFn = info;

      toastFn(title, {
        description,
        duration,
        action,
      });
    }

    if (redirectTo) {
      setTimeout(() => {
        navigate(redirectTo);
      }, redirectDelay);
    }
  };

  return notify;
};
