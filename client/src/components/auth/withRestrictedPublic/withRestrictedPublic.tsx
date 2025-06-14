import { ComponentType } from "react";
import { Navigate } from "react-router-dom";

import { config } from "@/config";
import { selectIsLoggedIn } from "@/features";
import { useAppSelector } from "@/hooks";

/**
 * HOC that prevents authenticated users from accessing public-only components
 * (e.g. login/register pages).
 */
export const withRestrictedPublic =
  <P extends object>(
    Component: ComponentType<P>,
    fallbackRoute: string = config.restrictedPublicRouteFallback,
  ) =>
  (props: P) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (isLoggedIn) {
      return <Navigate to={fallbackRoute} replace />;
    }

    return <Component {...props} />;
  };
