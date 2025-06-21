import { Theme, UserProfile } from "@/types";

export interface NavBarProps {
  theme: Theme;
  userProfile: UserProfile;
  isLoggedIn: boolean;
  isConfirmModalOpen: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onOpenConfirmModal: () => void;
  onCloseConfirmModal: () => void;
}
