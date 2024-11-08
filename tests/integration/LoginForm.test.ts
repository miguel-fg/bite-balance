import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import LoginForm from "../../src/components/forms/LoginForm.vue";

describe("LoginForm", () => {
    it("validates the form correctly when submit button is clicked", async () => {
        const wrapper = mount(LoginForm);
        const emailInput = wrapper.find('input[id="email"]');
        const passwordInput = wrapper.find('input[id="email"]');
        const submitButton = wrapper.find("button");

        await emailInput.setValue("invalid-email");
        await passwordInput.setValue("password123!");
        await submitButton.trigger("click");

        expect(wrapper.text()).toContain("Please enter a valid email address");
    });
});
