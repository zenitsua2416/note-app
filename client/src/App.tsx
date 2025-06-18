import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { selectTheme } from "@/features";
import { useAppSelector } from "@/hooks";
import { router } from "@/routes";

const App = () => {
  const { theme } = useAppSelector(selectTheme);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <RouterProvider router={router} />;
};

export default App;
