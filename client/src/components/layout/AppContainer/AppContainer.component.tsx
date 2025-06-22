import { AppContainerProps } from "./AppContainer.types";

export const AppContainer = ({ children, className }: AppContainerProps) => (
  <div className={`max-w-app mx-auto h-full ${className}`}>{children}</div>
);
