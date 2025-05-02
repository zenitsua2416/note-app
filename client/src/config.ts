import { Theme } from "./types";

interface Config {
  defaultTheme: Theme;
}

const config: Config = {
  defaultTheme: "dark",
};

export { config };
