import { Theme } from "./types";

import { LOGIN_ROUTE, HOME_ROUTE } from "@/constants";

interface Config {
  defaultTheme: Theme;
  protectedRouteFallback: string;
  restrictedPublicRouteFallback: string;
}

const config: Config = {
  defaultTheme: "dark",
  protectedRouteFallback: LOGIN_ROUTE,
  restrictedPublicRouteFallback: HOME_ROUTE,
};

export { config };
