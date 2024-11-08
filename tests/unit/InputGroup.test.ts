import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import InputGroup from "../../src/components/InputGroup.vue";

describe("InputGroup", () => {
    it("renders the label correctly", () => {
        const wrapper = mount(InputGroup, {
            props: {
                label: "email",
                icon: "email",
                placeholder: "Enter your email",
                status: "NORMAL",
                errorMsg: "",
            },
        });

        expect(wrapper.text()).toContain("email");
    });

    it("displays an error message when status is ERROR", () => {
        const wrapper = mount(InputGroup, {
            props: {
                label: "email",
                icon: "email",
                placeholder: "Enter your email",
                status: "ERROR",
                errorMsg: "Invalid email",
            },
        });

        expect(wrapper.text()).toContain("Invalid email");
    });
});
