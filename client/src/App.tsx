import { RouterProvider } from "react-router-dom";

import { selectTheme } from "@/features";
import { useAppSelector } from "@/hooks";
import { router } from "@/routes";

const App = () => {
  const { theme } = useAppSelector(selectTheme);

  return (
    <main className={theme === "dark" ? "dark" : ""}>
      <div className="bg-default-50">
        <RouterProvider router={router} />
      </div>
    </main>
  );
};

export default App;
