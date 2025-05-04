import { Link } from "react-router-dom";

import { Switch, Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

import { logout, selectIsLoggedIn, selectTheme, toggleTheme } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Theme } from "@/types";
import { saveToStorage } from "@/utils";

export const NavBar = () => {
  const dispatch = useAppDispatch();

  const { theme } = useAppSelector(selectTheme);

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleToggleTheme = () => {
    saveToStorage<Theme>("theme", theme === "light" ? "dark" : "light");
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
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

          {isLoggedIn ? (
            <Button variant="light" color="danger" onPress={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="light">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
