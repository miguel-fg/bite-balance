import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import InputGroup from "../../src/components/InputGroup.vue";

describe("form input group", () => {
  it("renders the label correctly", () => {
    const wrapper = mount(InputGroup, {
      props: {
        inputId: "email",
        label: "email",
        icon: "email",
        placeholder: "Enter your email",
        status: "NORMAL",
        errorMsg: "",
      },
    });

    expect(wrapper.text()).toContain("email");
  });

  it("renders the group icon correctly", () => {
    const wrapper = mount(InputGroup, {
      props: {
        inputId: "email",
        label: "email",
        icon: "email",
        placeholder: "Enter your email",
        status: "NORMAL",
        errorMsg: "",
      },
    });

    const icon = wrapper.find('img[alt="Icon for the email input"]');
    expect(icon.exists()).toBe(true);
  });

  it("displays an error message when status is ERROR", () => {
    const wrapper = mount(InputGroup, {
      props: {
        inputId: "email",
        label: "email",
        icon: "email",
        placeholder: "Enter your email",
        status: "ERROR",
        errorMsg: "Invalid email",
      },
    });

    expect(wrapper.text()).toContain("Invalid email");
  });

  it("renders the icon when status is VALID", () => {
    const wrapper = mount(InputGroup, {
      props: {
        inputId: "email",
        label: "email",
        icon: "email",
        placeholder: "Enter your email",
        status: "VALID",
        errorMsg: "",
      },
    });

    const input = wrapper.find('img[alt="Input is valid icon"]');
    expect(input.exists()).toBe(true);
  });

  it("updates the model value on input change", async () => {
    const wrapper = mount(InputGroup, {
      props: {
        inputId: "email",
        label: "email",
        icon: "email",
        placeholder: "Enter your email",
        status: "NORMAL",
        errorMsg: "",
      },
    });

    const input = wrapper.find("input");
    await input.setValue("test@example.com");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([
      "test@example.com",
    ]);
  });
});
