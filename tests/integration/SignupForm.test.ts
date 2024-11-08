import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import SignupForm from "../../src/components/forms/SignupForm.vue";

describe("sign up form", () => {
  it("validates the form correctly when submit button is clicked", async () => {
    const wrapper = mount(SignupForm);
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

    expect(wrapper.text()).toContain(
      "Username must be at least 2 characters long and can only contain letters and spaces",
    );
    expect(wrapper.text()).toContain("Please enter a valid email address");
    expect(wrapper.text()).toContain(
      "Password must be at least 8 characters long and include: one symbol",
    );
    expect(wrapper.text()).toContain("Passwords don't match");
  });
});
