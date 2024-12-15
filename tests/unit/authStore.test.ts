import { setActivePinia, createPinia } from "pinia";
import { useAuthStore } from "../../src/stores/auth";
import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../../src/scripts/axiosConfig";

vi.mock("../../src/scripts/axiosConfig", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("Auth Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should fetch user and update state on successful response", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({ data: mockUser });
    const authStore = useAuthStore();

    await authStore.fetchUser();

    expect(authStore.user).toEqual(mockUser);
    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.isInitialized).toBe(true);
  });

  it("should set user to null on fetch user error", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValueOnce(new Error("API error"));
    const authStore = useAuthStore();

    await authStore.fetchUser();

    expect(authStore.user).toBeNull();
    expect(authStore.isAuthenticated).toBe(false);
    expect(authStore.isInitialized).toBe(true);
  });

  it("should call API and redirect on signup", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({});
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({ data: mockUser });
    const authStore = useAuthStore();

    await authStore.signup("testuser", "test@example.com", "Password123!");

    expect(axiosInstance.post).toHaveBeenCalledWith("/auth/register", {
      username: "testuser",
      email: "test@example.com",
      password: "Password123!",
    });
    expect(authStore.user).toEqual(mockUser);
  });

  it("should call API and redirect on login", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({});
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({ data: mockUser });
    const authStore = useAuthStore();

    await authStore.login("test@example.com", "Password123!");

    expect(axiosInstance.post).toHaveBeenCalledWith("/auth/login", {
      email: "test@example.com",
      password: "Password123!",
    });

    expect(authStore.user).toEqual(mockUser);
  });

  it("should call API and reset user state on logout", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValueOnce({});
    const authStore = useAuthStore();

    await authStore.logout();

    expect(axiosInstance.post).toHaveBeenCalledWith("/auth/logout");
    expect(authStore.user).toBeNull();
    expect(authStore.isAuthenticated).toBe(false);
  });
});
