import { Theme } from "@/types";

export interface NavBarProps {
  theme: Theme;
  isLoggedIn: boolean;
  isConfirmModalOpen: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onOpenConfirmModal: () => void;
  onCloseConfirmModal: () => void;
}
