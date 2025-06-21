import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { THEME } from "@/constants";
import { selectTheme } from "@/features";
import { useAppSelector } from "@/hooks";
import { router } from "@/routes";

const App = () => {
  const { theme } = useAppSelector(selectTheme);

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

  return <RouterProvider router={router} />;
};

export default App;
