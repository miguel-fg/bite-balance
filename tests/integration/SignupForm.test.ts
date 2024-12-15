import { mount } from "@vue/test-utils";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SignupForm from "../../src/components/forms/SignupForm.vue";
import { createTestingPinia } from "@pinia/testing";
import { useAuthStore } from "../../src/stores/auth";
import router from "../../src/router";

vi.mock("../../src/router", () => ({
  default: {
    push: vi.fn(),
  },
}));

describe("sign up form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates the form correctly when submit button is clicked", async () => {
    const wrapper = mount(SignupForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const authStore = useAuthStore();
    const usernameInput = wrapper.find('input[id="username"]');
    const emailInput = wrapper.find('input[id="email"]');
    const passwordInput = wrapper.find('input[id="password"]');
    const confirmedInput = wrapper.find('input[id="confirmed"]');
    const submitButton = wrapper.find("button");

    await usernameInput.setValue("A");
    await emailInput.setValue("invalid-email");
    await passwordInput.setValue("Password123");
    await confirmedInput.setValue("Password123!");

    await submitButton.trigger("click");

    expect(authStore.signup).not.toHaveBeenCalled();
    expect(wrapper.text()).toContain(
      "Username must be at least 2 characters long and can only contain letters and spaces",
    );
    expect(wrapper.text()).toContain("Please enter a valid email address");
    expect(wrapper.text()).toContain(
      "Password must be at least 8 characters long and include: one symbol",
    );
    expect(wrapper.text()).toContain("Passwords don't match");
  });

  it("calls sign up and redirects when inputs are valid", async () => {
    const wrapper = mount(SignupForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const authStore = useAuthStore();
    const usernameInput = wrapper.find('input[id="username"]');
    const emailInput = wrapper.find('input[id="email"]');
    const passwordInput = wrapper.find('input[id="password"]');
    const confirmedInput = wrapper.find('input[id="confirmed"]');
    const submitButton = wrapper.find("button");

    await usernameInput.setValue("User Name");
    await emailInput.setValue("valid@email.com");
    await passwordInput.setValue("Password123!");
    await confirmedInput.setValue("Password123!");

    await submitButton.trigger("click");

    expect(authStore.signup).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/dashboard");
  });

  it("does not redirect if sign up fails", async () => {
    const wrapper = mount(SignupForm, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const authStore = useAuthStore();
    vi.mocked(authStore.signup).mockImplementation(() => {
      throw new Error("Sign up failed");
    });
    const usernameInput = wrapper.find('input[id="username"]');
    const emailInput = wrapper.find('input[id="email"]');
    const passwordInput = wrapper.find('input[id="password"]');
    const confirmedInput = wrapper.find('input[id="confirmed"]');
    const submitButton = wrapper.find("button");

    await usernameInput.setValue("User Name");
    await emailInput.setValue("valid@email.com");
    await passwordInput.setValue("Password123!");
    await confirmedInput.setValue("Password123!");

    await submitButton.trigger("click");

    expect(authStore.signup).toHaveBeenCalledTimes(1);
    expect(router.push).not.toHaveBeenCalled();
  });
});
