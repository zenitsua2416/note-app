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

const MyRoutes = ({
  restrictedComponent,
}: {
  restrictedComponent: JSX.Element;
}) => (
  <Routes>
    <Route path="/" element={<DummyComponent />} />
    <Route path="/login" element={restrictedComponent} />
    <Route path={myFallBackRoute} element={<FallBackComponent />} />
  </Routes>
);

describe("withRestrictedPublic", () => {
  it("renders the restricted component when user is not logged in", () => {
    mockedUseAppSelector.mockReturnValue(false);

    const PublicRestrictedComponent = withRestrictedPublic(LoginComponent);

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <MyRoutes restrictedComponent={<PublicRestrictedComponent />} />
      </MemoryRouter>,
    );

    const loginComponent = screen.queryByText(LoginComponent());
    expect(loginComponent).toBeInTheDocument();
  });

  it("redirects to fallback if user is not logged in", () => {
    mockedUseAppSelector.mockReturnValue(true);

    const PublicRestrictedComponent = withRestrictedPublic(LoginComponent);

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <MyRoutes restrictedComponent={<PublicRestrictedComponent />} />
      </MemoryRouter>,
    );

    const loginComponent = screen.queryByText(LoginComponent());
    expect(loginComponent).not.toBeInTheDocument();

    const dummyComponent = screen.queryByText(DummyComponent());
    expect(dummyComponent).toBeInTheDocument();
  });

  it("redirects to custom fallback route when provided, if user is not logged in", () => {
    mockedUseAppSelector.mockReturnValue(true);

    const PublicRestrictedComponent = withRestrictedPublic(
      DummyComponent,
      myFallBackRoute,
    );

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <MyRoutes restrictedComponent={<PublicRestrictedComponent />} />
      </MemoryRouter>,
    );

    const dummyComponent = screen.queryByText(DummyComponent());
    expect(dummyComponent).not.toBeInTheDocument();

    const loginComponent = screen.queryByText(LoginComponent());
    expect(loginComponent).not.toBeInTheDocument();

    const fallbackComponent = screen.queryByText(FallBackComponent());
    expect(fallbackComponent).toBeInTheDocument();
  });
});
