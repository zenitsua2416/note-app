import { vi } from "vitest";

import type { AuthSession, User } from "@/types";

import { isValidSession } from "./auth";

const mockUser: User = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "user@example.com",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe("isValidSession", () => {
  const now = Date.now();

  it("returns false if session is null", () => {
    expect(isValidSession(null)).toBe(false);
  });

  it("returns false if session is missing access_token", () => {
    const session: AuthSession = {
      access_token: "", // Invalid token
      expires_in: 3600,
      expires_at: Math.floor(now / 1000) + 3600,
      refresh_token: "refresh123",
      token_type: "bearer",
      user: mockUser,
    };
    expect(isValidSession(session)).toBe(false);
  });

  it("returns false if session is expired", () => {
    const session: AuthSession = {
      access_token: "abc123",
      expires_in: 3600,
      expires_at: Math.floor(now / 1000) - 10,
      refresh_token: "refresh123",
      token_type: "bearer",
      user: mockUser,
    };
    expect(isValidSession(session)).toBe(false);
  });

  it("returns true if session is valid and not expired", () => {
    const session: AuthSession = {
      access_token: "abc123",
      expires_in: 3600,
      expires_at: Math.floor(now / 1000) + 3600,
      refresh_token: "refresh123",
      token_type: "bearer",
      user: mockUser,
    };
    expect(isValidSession(session)).toBe(true);
  });

  it("returns false if expires_at is exactly now (not strictly >)", () => {
    const session: AuthSession = {
      access_token: "abc123",
      expires_in: 3600,
      expires_at: Math.floor(now / 1000), // Now
      refresh_token: "refresh123",
      token_type: "bearer",
      user: mockUser,
    };
    expect(isValidSession(session)).toBe(false);
  });

  it("can use mocked time with vi.setSystemTime", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T00:00:00Z"));

    const session: AuthSession = {
      access_token: "abc123",
      expires_in: 3600,
      expires_at: Math.floor(new Date("2025-01-01T01:00:00Z").getTime() / 1000),
      refresh_token: "refresh123",
      token_type: "bearer",
      user: mockUser,
    };

    expect(isValidSession(session)).toBe(true);

    vi.useRealTimers();
  });
});
