import { Outlet } from "react-router-dom";

import { NavBar } from "@/components/layout";

export const DefaultLayout = () => (
  <div className="font-inter bg-default-50 text-default-800 grid min-h-screen grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto]">
    <NavBar />

    <main>
      <Outlet />
    </main>

    {/* TODO: Add any footer */}
  </div>
);
