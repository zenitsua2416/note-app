import { vi, Mock } from "vitest";

import { JSX } from "react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen } from "@testing-library/react";

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

const DummyComponent = () => <>SECRET content in here!!!</>;
const LoginComponent = () => <>Login Page</>;
const FallBackComponent = () => <>FALLBACK</>;

const myFallBackRoute = "/fallback";

const MyRoutes = ({
  ProtectedComponent,
}: {
  ProtectedComponent: JSX.Element;
}) => (
  <Routes>
    <Route path="/" element={ProtectedComponent} />
    <Route path="/login" element={<LoginComponent />} />
    <Route path={myFallBackRoute} element={<FallBackComponent />} />
  </Routes>
);

describe("withProtected", () => {
  it("renders the protected component when user is logged in", () => {
    mockedUseAppSelector.mockReturnValue(true);

    const Protected = withProtected(DummyComponent);

    render(
      <MemoryRouter>
        <MyRoutes ProtectedComponent={<Protected />} />
      </MemoryRouter>,
    );

    const dummyComponent = screen.queryByText("SECRET content in here!!!");
    expect(dummyComponent).toBeInTheDocument();
  });

  it("redirects to fallback if user is not logged in", () => {
    mockedUseAppSelector.mockReturnValue(false);

    const Protected = withProtected(DummyComponent);

    render(
      <MemoryRouter>
        <MyRoutes ProtectedComponent={<Protected />} />
      </MemoryRouter>,
    );

    const dummyComponent = screen.queryByText("SECRET content in here!!!");
    expect(dummyComponent).not.toBeInTheDocument();

    const loginComponent = screen.queryByText("Login Page");
    expect(loginComponent).toBeInTheDocument();
  });

  it("redirects to custom fallback route when provided, if user is not logged in", () => {
    mockedUseAppSelector.mockReturnValue(false);

    const Protected = withProtected(DummyComponent, myFallBackRoute);

    render(
      <MemoryRouter>
        <MyRoutes ProtectedComponent={<Protected />} />
      </MemoryRouter>,
    );

    const dummyComponent = screen.queryByText("SECRET content in here!!!");
    expect(dummyComponent).not.toBeInTheDocument();

    const loginComponent = screen.queryByText("Login Page");
    expect(loginComponent).not.toBeInTheDocument();

    const fallbackComponent = screen.queryByText("FALLBACK");
    expect(fallbackComponent).toBeInTheDocument();
  });
});
