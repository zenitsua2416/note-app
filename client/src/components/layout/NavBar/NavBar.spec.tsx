import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { NavBar } from "./NavBar.component";
import { THEME } from "@/constants";

const renderNavBar = (propsOverrides = {}) => {
  const defaultProps = {
    theme: THEME.LIGHT,
    isLoggedIn: false,
    userProfile: {
      id: 2,
      user_id: "so-long-uuid-of-the-user",
      full_name: "John Doe",
      email: "john@example.com",
      avatar_url: "",
    },
    isConfirmModalOpen: false,
    onToggleTheme: () => {},
    onLogout: () => {},
    onOpenConfirmModal: () => {},
    onCloseConfirmModal: () => {},
  };

  return render(
    <MemoryRouter>
      <NavBar {...defaultProps} {...propsOverrides} />
    </MemoryRouter>,
  );
};

describe("Navbar", () => {
  it("renders correctly when logged out", () => {
    renderNavBar({ isLoggedIn: false });

    expect(screen.getByText("Note App")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("renders avatar and dropdown when logged in", async () => {
    renderNavBar({ isLoggedIn: true });

    const avatarButton = screen.getByRole("button");
    expect(avatarButton).toBeInTheDocument();

    await userEvent.click(avatarButton);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText(/account/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it("calls onToggleTheme when switching theme", async () => {
    const onToggleTheme = vi.fn();
    renderNavBar({ onToggleTheme });

    const toggle = screen.getByRole("switch");
    await userEvent.click(toggle);

    expect(onToggleTheme).toHaveBeenCalled();
  });

  it("opens logout confirm modal on logout click", async () => {
    const onOpenConfirmModal = vi.fn();
    renderNavBar({ isLoggedIn: true, onOpenConfirmModal });

    const avatarButton = screen.getByRole("button");
    await userEvent.click(avatarButton);

    const logoutItem = screen.getByText(/logout/i);
    await userEvent.click(logoutItem);

    expect(onOpenConfirmModal).toHaveBeenCalled();
  });
  it("shows modal when isConfirmModalOpen is true", () => {
    renderNavBar({ isLoggedIn: true, isConfirmModalOpen: true });

    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
    expect(screen.getByText(/you will be logged out/i)).toBeInTheDocument();
  });

  it("calls onLogout when clicking logout in modal", async () => {
    const onLogout = vi.fn();
    renderNavBar({ isConfirmModalOpen: true, onLogout });

    const logoutBtn = screen.getByRole("button", { name: /logout/i });
    await userEvent.click(logoutBtn);

    expect(onLogout).toHaveBeenCalled();
  });

  it("calls onCloseConfirmModal when clicking cancel in modal", async () => {
    const onCloseConfirmModal = vi.fn();
    renderNavBar({ isConfirmModalOpen: true, onCloseConfirmModal });

    const cancelBtn = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelBtn);

    expect(onCloseConfirmModal).toHaveBeenCalled();
  });

  it("renders switch as selected when theme is dark", () => {
    renderNavBar({ theme: THEME.DARK });

    const switchToggle = screen.getByRole("switch");
    expect(switchToggle.getAttribute("checked")).not.toBeUndefined();
  });
});
