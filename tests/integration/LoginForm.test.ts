import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginForm from "../../src/components/forms/LoginForm.vue";
import { createTestingPinia } from "@pinia/testing";
import { useAuthStore } from "../../src/stores/auth";
import router from "../../src/router";

vi.mock("../../src/router", () => ({
  default: {
    push: vi.fn(),
  },
}));

describe("login form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates the form correctly when submit button is clicked", async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const authStore = useAuthStore();
    const emailInput = wrapper.find('input[id="email"]');
    const passwordInput = wrapper.find('input[id="password"]');
    const submitButton = wrapper.find("button");

    await emailInput.setValue("invalid-email");
    await passwordInput.setValue("ValidPassword123!");
    await submitButton.trigger("click");

    expect(authStore.login).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain("Please enter a valid email");

    const validIcon = wrapper.find('img[alt="Input is valid icon"]');
    expect(validIcon.exists()).toBe(true);
  });

  it("calls login and redirects when inputs are valid", async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const authStore = useAuthStore();
    const emailInput = wrapper.find('input[id="email"]');
    const passwordInput = wrapper.find('input[id="password"]');
    const submitButton = wrapper.find("button");

    await emailInput.setValue("valid@email.com");
    await passwordInput.setValue("ValidPassword123!");
    await submitButton.trigger("click");

    expect(authStore.login).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/dashboard");
  });

  it("does not redirect if login fails", async () => {
    const wrapper = mount(LoginForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const authStore = useAuthStore();
    vi.mocked(authStore.login).mockImplementation(() => {
      throw new Error("Login failed");
    });
    const emailInput = wrapper.find('input[id="email"]');
    const passwordInput = wrapper.find('input[id="password"]');
    const submitButton = wrapper.find("button");

    await emailInput.setValue("valid@email.com");
    await passwordInput.setValue("Password123!");
    await submitButton.trigger("click");

    expect(authStore.login).toHaveBeenCalledTimes(1);
    expect(router.push).not.toHaveBeenCalled();
  });
});
