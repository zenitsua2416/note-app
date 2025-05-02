import { Outlet } from "react-router-dom";

import { NavBar } from "@/components/layout";

export const DefaultLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);
