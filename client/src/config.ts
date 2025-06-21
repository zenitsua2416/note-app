import { ROUTES, THEME } from "@/constants";
import { Theme } from "@/types";

const { HOME_ROUTE, LOGIN_ROUTE } = ROUTES;

// Make sure the properties are all REQUIRED!!!
interface Config {
  defaultTheme: Theme;
  protectedRouteFallback: string;
  restrictedPublicRouteFallback: string;
}

const config: Config = {
  defaultTheme: THEME.DARK,
  protectedRouteFallback: LOGIN_ROUTE,
  restrictedPublicRouteFallback: HOME_ROUTE,
};

export { config };
