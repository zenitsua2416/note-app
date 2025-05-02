import { ReactNode } from "react";

import { NavBar } from "@/components/layout";

export const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <>
    <NavBar />
    {children}
    {/* Add a footer if needed */}
  </>
);
