import { Theme } from "./types";

interface Config {
  defaultTheme: Theme;
  protectedRouteFallback: string;
  restrictedPublicRouteFallback: string;
}

const config: Config = {
  defaultTheme: "dark",
  protectedRouteFallback: "/login",
  restrictedPublicRouteFallback: "/",
};

export { config };
