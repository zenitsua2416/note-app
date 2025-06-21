import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { Toaster } from "sonner";

import { THEME } from "@/constants";
import { selectAuthUser, selectTheme, setUserProfile } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { router } from "@/routes";
import { supabase } from "@/supabase";

const App = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(selectTheme);
  const { id, email } = useAppSelector(selectAuthUser);

  /**
   * Adding the `dark` class to the <body> sets the dark theme globally,
   * which ensures consistent styling across the entire app, including third-party components
   * that rely on Tailwind's dark mode classes.
   *
   * In contrast, applying it only to the React app's root element may limit
   * the dark theme to just our components, potentially ignoring external or
   * third-party code using Tailwind.
   */
  useEffect(() => {
    document.body.classList.toggle("dark", theme === THEME.DARK);
  }, [theme]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("user_profile").select("*");

      if (error) {
        console.error(error);
        return;
      } else {
        const { id, user_id, full_name, avatar_url } = data[0];
        dispatch(setUserProfile({ id, user_id, email, full_name, avatar_url }));
      }
    })();
  }, [id, email, dispatch]);

  return (
    <>
      <Toaster
        richColors
        closeButton
        position="top-right"
        offset={{
          top: 60,
          right: 20,
        }}
        theme={theme === THEME.LIGHT ? "light" : "dark"}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
