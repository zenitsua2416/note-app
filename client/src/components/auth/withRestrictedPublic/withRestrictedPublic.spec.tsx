import { vi, Mock } from "vitest";

import { JSX } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import * as hooks from "@/hooks";

import { withRestrictedPublic } from "./withRestrictedPublic";

vi.mock("@/hooks", async () => {
  const actual = vi.importActual<typeof import("@/hooks")>("@/hooks");
  return {
    ...actual,
    useAppSelector: vi.fn(),
  };
});

const mockedUseAppSelector = hooks.useAppSelector as unknown as Mock;

const DummyComponent = () => "SECRET content in here!!!";
const LoginComponent = () => "Login Page";
const FallBackComponent = () => "FALLBACK";

const myFallBackRoute = "/fallback";

const setupWithRestrictedPublic = (
  isLoggedIn: boolean,
  restrictedComponent: JSX.Element,
) => {
  mockedUseAppSelector.mockReturnValue(isLoggedIn);

  // Considering the "/login" as the protected route
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/" element={<DummyComponent />} />
        <Route path="/login" element={restrictedComponent} />
        <Route path={myFallBackRoute} element={<FallBackComponent />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("withRestrictedPublic", () => {
  it("renders the restricted component when user is not logged in", () => {
    const PublicRestrictedComponent = withRestrictedPublic(LoginComponent);

    setupWithRestrictedPublic(false, <PublicRestrictedComponent />);

    const loginComponent = screen.queryByText(LoginComponent());
    expect(loginComponent).toBeInTheDocument();
  });

  it("redirects to fallback if user is not logged in", () => {
    const PublicRestrictedComponent = withRestrictedPublic(LoginComponent);

    setupWithRestrictedPublic(true, <PublicRestrictedComponent />);

    const loginComponent = screen.queryByText(LoginComponent());
    expect(loginComponent).not.toBeInTheDocument();

    const dummyComponent = screen.queryByText(DummyComponent());
    expect(dummyComponent).toBeInTheDocument();
  });

  it("redirects to custom fallback route when provided, if user is not logged in", () => {
    const PublicRestrictedComponent = withRestrictedPublic(
      DummyComponent,
      myFallBackRoute,
    );

    setupWithRestrictedPublic(true, <PublicRestrictedComponent />);

    const dummyComponent = screen.queryByText(DummyComponent());
    expect(dummyComponent).not.toBeInTheDocument();

    const loginComponent = screen.queryByText(LoginComponent());
    expect(loginComponent).not.toBeInTheDocument();

    const fallbackComponent = screen.queryByText(FallBackComponent());
    expect(fallbackComponent).toBeInTheDocument();
  });
});
