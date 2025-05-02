import { useState } from "react";

import { DefaultLayout } from "@/layouts";
import { useAppSelector } from "@/hook";
import { selectTheme } from "@/features";

const App = () => {
  const [count, setCount] = useState<number>(0);
  const { theme } = useAppSelector(selectTheme);

  return (
    <main className={theme === "dark" ? "dark" : ""}>
      <DefaultLayout>
        <div className="flex h-screen w-screen flex-col items-center justify-center dark:bg-gray-900 dark:text-gray-100">
          <h1 className="my-10 text-3xl font-bold">My Simple Vite App⭐</h1>
          <button
            onClick={() => setCount((prev) => prev + 1)}
            className="rounded-md border bg-gray-200 p-2 px-4 font-semibold outline-none hover:bg-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
          >
            Count is {count}
          </button>
        </div>
      </DefaultLayout>
    </main>
  );
};

export default App;
