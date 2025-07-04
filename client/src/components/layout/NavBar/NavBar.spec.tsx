import { MemoryRouter } from "react-router-dom";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, Mock } from "vitest";

import { ROUTES } from "@/constants";
import { logout, toggleTheme } from "@/features";
import * as hooks from "@/hooks";

import { NavBar } from "./NavBar.component";

vi.mock("@/hooks", async () => {
  const actual = vi.importActual<typeof import("@/hooks")>("@/hooks");
  return {
    ...actual,
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
  };
});

const mockedUseAppSelector = hooks.useAppSelector as unknown as Mock;
const mockedDispatch = vi.fn();

const setupNavBar = (isLoggedIn: boolean) => {
  mockedUseAppSelector.mockReturnValue(isLoggedIn);

  render(<NavBar />, {
    wrapper: MemoryRouter,
  });
};

describe("NavBar", () => {
  beforeEach(() => {
    (hooks.useAppDispatch as Mock).mockReturnValue(mockedDispatch);
  });

  it("should render a toggle-theme checkbox", () => {
    setupNavBar(false);

    const toggleThemeCheckbox = screen.getByRole("switch");
    expect(toggleThemeCheckbox).toBeInTheDocument();
  });

  it("should call toggle-theme handler on clicking the toggle-theme checkbox", async () => {
    setupNavBar(false);

    const user = userEvent.setup();
    const toggleThemeCheckbox = screen.getByRole("switch");

    await user.click(toggleThemeCheckbox);

    expect(mockedDispatch).toHaveBeenCalledWith(toggleTheme());
  });

  it("should render login link-button if user is not logged in", () => {
    setupNavBar(false);

    const loginBtn = screen.getByRole("link", { name: /login/i });
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveAttribute("href", ROUTES.LOGIN_ROUTE);
  });

  it("should render logout button if user is logged in", () => {
    setupNavBar(true);

    const logoutBtn = screen.getByRole("button", { name: /logout/i });
    expect(logoutBtn).toBeInTheDocument();
  });

  it("should bring up Modal on clicking the logout button", async () => {
    setupNavBar(true);

    const user = userEvent.setup();
    const logoutBtn = screen.getByRole("button", { name: /logout/i });

    await user.click(logoutBtn);

    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();

    const modalUtils = within(modal);
    const logoutBtnInModal = modalUtils.getByRole("button", {
      name: /logout/i,
    });

    expect(logoutBtnInModal).toBeInTheDocument();

    await user.click(logoutBtnInModal);
    expect(mockedDispatch).toHaveBeenCalledWith(logout());
  });
});
