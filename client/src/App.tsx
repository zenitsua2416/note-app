import { RouterProvider } from "react-router-dom";

import { THEME } from "@/constants";
import { selectTheme } from "@/features";
import { useAppSelector } from "@/hooks";
import { router } from "@/routes";

const App = () => {
  const { theme } = useAppSelector(selectTheme);

  return (
    <div className={theme === THEME.DARK ? "dark" : ""}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
