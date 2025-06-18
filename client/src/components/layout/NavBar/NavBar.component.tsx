import { Link } from "react-router-dom";

import {
  Switch,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { Sun, Moon } from "lucide-react";

import { ROUTES } from "@/constants";
import { logout, selectIsLoggedIn, selectTheme, toggleTheme } from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Theme } from "@/types";
import { saveToStorage } from "@/utils";

const { HOME_ROUTE, LOGIN_ROUTE } = ROUTES;

export const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(selectTheme);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const handleToggleTheme = () => {
    saveToStorage<Theme>("theme", theme === "light" ? "dark" : "light");
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <header className="sticky top-0 w-full border shadow-md backdrop-blur-md dark:border-neutral-800">
      <nav className="max-w-app mx-auto flex items-center justify-between bg-transparent px-2 py-2">
        <Link
          to={HOME_ROUTE}
          className="dark:text-default-700 text-lg font-semibold hover:text-blue-500 dark:hover:text-blue-500"
        >
          Note App
        </Link>

        <div className="flex items-center gap-4">
          <Switch
            defaultSelected={theme === "dark"}
            isSelected={theme === "dark"}
            onChange={handleToggleTheme}
            startContent={<Sun />}
            endContent={<Moon />}
          />

          {isLoggedIn ? (
            <Button variant="light" color="danger" onPress={onOpen}>
              Logout
            </Button>
          ) : (
            <Link to={LOGIN_ROUTE}>
              <Button variant="light">Login</Button>
            </Link>
          )}
        </div>
      </nav>
      <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent className="text-default-800 bg-neutral-200 dark:bg-neutral-800">
          {(onClose) => (
            <>
              <ModalHeader>Are you sure?</ModalHeader>
              <ModalBody>
                <p>You will be logged out.</p>
              </ModalBody>
              <ModalFooter className="flex flex-row-reverse justify-start gap-4">
                <Button color="danger" variant="solid" onPress={handleLogout}>
                  Logout
                </Button>
                <Button color="default" variant="solid" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </header>
  );
};
