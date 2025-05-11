import { createBrowserRouter } from "react-router-dom";

import { withProtected, withRestrictedPublic } from "@/components/auth";
import { DefaultLayout } from "@/layouts";
import { HomePage, LoginPage, SignupPage } from "@/pages";

const Home = withProtected(HomePage);
const Login = withRestrictedPublic(LoginPage);
const Signup = withRestrictedPublic(SignupPage);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);
