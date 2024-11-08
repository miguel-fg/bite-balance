import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import LoginForm from "../../src/components/forms/LoginForm.vue";

describe("login form", () => {
  it("validates the form correctly when submit button is clicked", async () => {
    const wrapper = mount(LoginForm);
    const emailInput = wrapper.find('input[id="email"]');
    const passwordInput = wrapper.find('input[id="password"]');
    const submitButton = wrapper.find("button");

    await emailInput.setValue("invalid-email");
    await passwordInput.setValue("ValidPassword123!");
    await submitButton.trigger("click");

    expect(wrapper.text()).toContain("Please enter a valid email");

    const validIcon = wrapper.find('img[alt="Input is valid icon"]');
    expect(validIcon.exists()).toBe(true);
  });
});
