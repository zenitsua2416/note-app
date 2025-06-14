import { Theme } from "./types";

import { ROUTES } from "@/constants";

const { HOME_ROUTE, LOGIN_ROUTE } = ROUTES;

// Make sure the properties are all REQUIRED!!!
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
