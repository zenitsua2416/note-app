import { Outlet } from "react-router-dom";

import { NavBarContainer } from "@/containers";

export const DefaultLayout = () => (
  <div className="bg-default-50 text-default-800 grid min-h-screen grid-cols-[minmax(0,1fr)] grid-rows-[auto_1fr_auto]">
    <NavBarContainer />

    <main>
      <Outlet />
    </main>

    {/* TODO: Add any footer */}
  </div>
);
