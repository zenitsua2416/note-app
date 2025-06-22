import { createBrowserRouter } from "react-router-dom";

import { withProtected, withRestrictedPublic } from "@/components/auth";
import { DefaultLayout } from "@/layouts";
import {
  AccountPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  NewNotePage,
  NotFoundPage,
  NotePage,
  ResetPasswordPage,
  SignupPage,
} from "@/pages";

const Account = withProtected(AccountPage);
const ForgotPassword = withRestrictedPublic(ForgotPasswordPage);
const Home = withProtected(HomePage);
const NewNote = withProtected(NewNotePage);
const Note = withProtected(NotePage);
const Login = withRestrictedPublic(LoginPage);
const ResetPassword = withRestrictedPublic(ResetPasswordPage);
const Signup = withRestrictedPublic(SignupPage);

/**
 * MAKE SURE TO MATCH ALL THE ROUTES FROM `constants/routes.ts`
 */
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
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "note",
        children: [
          {
            /* route: /note/new */
            path: "new",
            element: <NewNote />,
          },
          {
            /* route: /note/:id */
            path: ":id",
            element: <Note />,
          },
        ],
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
