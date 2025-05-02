import { Switch } from "@heroui/switch";

import { selectTheme, toggleTheme } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hook";

export const NavBar = () => {
  const { theme } = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const handleToggleTheme = () => dispatch(toggleTheme());

  return (
    <header className="absolute w-full border shadow-md backdrop-blur-md dark:border-neutral-800">
      <nav className="flex justify-between bg-transparent py-4 lg:mx-auto lg:w-[1000px]">
        <a
          href="/"
          className="text-lg font-semibold hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-500"
        >
          Home
        </a>
        <Switch
          defaultSelected={theme === "dark"}
          isSelected={theme === "dark"}
          onChange={handleToggleTheme}
        />
      </nav>
    </header>
  );
};
