import { JSX } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { vi, Mock } from "vitest";

import * as hooks from "@/hooks";

import { withProtected } from "./withProtected";

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

const setupWithProtected = (
  isLoggedIn: boolean,
  protectedComponent: JSX.Element,
) => {
  mockedUseAppSelector.mockReturnValue(isLoggedIn);

  // Considering the "/" as the protected route
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={protectedComponent} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path={myFallBackRoute} element={<FallBackComponent />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("withProtected", () => {
  it("renders the protected component when user is logged in", () => {
    const Protected = withProtected(DummyComponent);

    setupWithProtected(true, <Protected />);

    const dummyComponent = screen.queryByText(DummyComponent());
    expect(dummyComponent).toBeInTheDocument();
  });

  it("redirects to fallback if user is not logged in", () => {
    const Protected = withProtected(DummyComponent);

    setupWithProtected(false, <Protected />);

    const dummyComponent = screen.queryByText(DummyComponent());
    expect(dummyComponent).not.toBeInTheDocument();

    const loginComponent = screen.queryByText(LoginComponent());
    expect(loginComponent).toBeInTheDocument();
  });

  it("redirects to custom fallback route when provided, if user is not logged in", () => {
    const Protected = withProtected(DummyComponent, myFallBackRoute);

    setupWithProtected(false, <Protected />);

    const dummyComponent = screen.queryByText(DummyComponent());
    expect(dummyComponent).not.toBeInTheDocument();

    const loginComponent = screen.queryByText(LoginComponent());
    expect(loginComponent).not.toBeInTheDocument();

    const fallbackComponent = screen.queryByText(FallBackComponent());
    expect(fallbackComponent).toBeInTheDocument();
  });
});
