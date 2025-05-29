import { Link as RouterLink } from "react-router-dom";
import { Link } from "@heroui/react";

export const NotFoundPage = () => (
  <div className="max-w-app mx-auto py-[10vh]">
    <h1 className="text-default-800 mb-4 text-center text-4xl font-bold">
      Ooops...
    </h1>
    <p className="text-default-500 text-center text-lg font-semibold">
      The page you are looking for doesn&apos;t exists!!
    </p>

    {/* ACTION LINKS */}
    <div className="mt-8 flex justify-center">
      <Link as={RouterLink} to="/" underline="hover">
        Go back to Home Page
      </Link>
    </div>
  </div>
);
