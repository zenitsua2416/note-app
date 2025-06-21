import { Link } from "react-router-dom";

import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@heroui/react";
import { Sun, Moon } from "lucide-react";

import { ROUTES, THEME } from "@/constants";

import { NavBarProps } from "./NavBar.types";

const { HOME_ROUTE, LOGIN_ROUTE } = ROUTES;

export const NavBar = ({
  theme,
  userProfile,
  isLoggedIn,
  isConfirmModalOpen,
  onToggleTheme,
  onLogout,
  // onOpenConfirmModal,      //  TODO: Implement this
  onCloseConfirmModal,
}: NavBarProps) => (
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
          defaultSelected={theme === THEME.DARK}
          isSelected={theme === THEME.DARK}
          onChange={onToggleTheme}
          startContent={<Sun />}
          endContent={<Moon />}
        />

        {isLoggedIn ? (
          <Button isIconOnly radius="full">
            <Avatar
              src={userProfile?.avatar_url || undefined}
              name={userProfile?.full_name || userProfile.email}
              showFallback
            />
          </Button>
        ) : (
          <Button as={Link} to={LOGIN_ROUTE} variant="light">
            Login
          </Button>
        )}
      </div>
    </nav>
    <Modal
      isOpen={isConfirmModalOpen}
      onClose={onCloseConfirmModal}
      backdrop="blur"
    >
      <ModalContent className="text-default-800 bg-neutral-200 dark:bg-neutral-800">
        {(onClose) => (
          <>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalBody>
              <p>You will be logged out.</p>
            </ModalBody>
            <ModalFooter className="flex flex-row-reverse justify-start gap-4">
              <Button color="danger" variant="solid" onPress={onLogout}>
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
