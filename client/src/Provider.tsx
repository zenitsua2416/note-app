import { ReactNode } from "react";
import { Provider as StoreProvider } from "react-redux";

import { HeroUIProvider } from "@heroui/system";

import { store } from "@/store";

const Provider = ({ children }: { children: ReactNode }) => (
  <HeroUIProvider>
    <StoreProvider store={store}>{children}</StoreProvider>
  </HeroUIProvider>
);

export default Provider;
