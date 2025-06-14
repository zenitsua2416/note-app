import { RouterProvider } from "react-router-dom";

import { selectTheme } from "@/features";
import { useAppSelector } from "@/hooks";
import { router } from "@/routes";

const App = () => {
  const { theme } = useAppSelector(selectTheme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
