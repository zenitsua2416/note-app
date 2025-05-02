import { Link } from "react-router-dom";

import { Switch, Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

import { selectTheme, toggleTheme } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hook";
import { saveToStorage } from "@/utils";
import { Theme } from "@/types";

export const NavBar = () => {
  const { theme } = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleToggleTheme = () => {
    saveToStorage<Theme>("theme", theme === "light" ? "dark" : "light");
    dispatch(toggleTheme());
  };

  return (
    <header className="absolute w-full border shadow-md backdrop-blur-md dark:border-neutral-800">
      <nav className="flex items-center justify-between bg-transparent py-2 lg:mx-auto lg:w-[1000px]">
        <Link
          to="/"
          className="dark:text-default-700 text-lg font-semibold hover:text-blue-500 dark:hover:text-blue-500"
        >
          Note App
        </Link>

        <div className="flex items-center gap-4">
          <Switch
            defaultSelected={theme === "dark"}
            isSelected={theme === "dark"}
            onChange={handleToggleTheme}
            startContent={<Sun />}
            endContent={<Moon />}
          />

          <Link to="/login">
            <Button variant="light">Login</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};
