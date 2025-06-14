import { ReactNode } from "react";
import { Provider as StoreProvider } from "react-redux";

import { Toaster } from "sonner";
import { HeroUIProvider } from "@heroui/system";

import { store } from "@/store";

const Provider = ({ children }: { children: ReactNode }) => (
  <HeroUIProvider>
    <Toaster
      richColors
      closeButton
      position="top-right"
      offset={{
        top: 60,
        right: 20,
      }}
    />
    <StoreProvider store={store}>{children}</StoreProvider>
  </HeroUIProvider>
);

export default Provider;
