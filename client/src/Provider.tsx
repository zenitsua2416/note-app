import { ReactNode } from "react";
import { Provider as StoreProvider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { HeroUIProvider } from "@heroui/system";

import { store } from "@/store";

const Provider = ({ children }: { children: ReactNode }) => (
  <HeroUIProvider>
    <ToastContainer
      position="top-right"
      className="top-16"
      pauseOnHover
      stacked
      autoClose={3000}
      theme="colored"
    />
    <StoreProvider store={store}>{children}</StoreProvider>
  </HeroUIProvider>
);

export default Provider;
