import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

import { config } from "@/config";
import { selectIsLoggedIn } from "@/features";
import { useAppSelector } from "@/hooks";

/**
 * Higher-order component that wraps a component and protects it from unauthenticated access.
 * Redirects to fallbackRoute if the user is not logged in.
 */
export const withProtected = <P extends object>(
  Component: ComponentType<P>,
  fallbackRoute: string = config.protectedRouteFallback,
) => {
  const WithProtected = (props: P) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (!isLoggedIn) return <Navigate to={fallbackRoute} replace />;

    return <Component {...props} />;
  };

  WithProtected.displayName = `withProtected(${Component.displayName || Component.name})`;

  return WithProtected;
};
