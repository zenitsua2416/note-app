import { useDisclosure } from "@heroui/react";

import { STORAGE, THEME } from "@/constants";
import { NavBar } from "@/components/layout";
import {
  logout,
  selectIsLoggedIn,
  selectTheme,
  selectUserProfile,
  toggleTheme,
} from "@/features";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { saveToStorage } from "@/utils";
import { Theme } from "@/types";

export const NavBarContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(selectTheme);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userProfile = useAppSelector(selectUserProfile);

  const handleToggleTheme = () => {
    saveToStorage<Theme>(
      STORAGE.THEME,
      theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT,
    );
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <NavBar
      userProfile={userProfile}
      theme={theme}
      isLoggedIn={isLoggedIn}
      isConfirmModalOpen={isOpen}
      onToggleTheme={handleToggleTheme}
      onLogout={handleLogout}
      onOpenConfirmModal={onOpen}
      onCloseConfirmModal={onClose}
    />
  );
};
