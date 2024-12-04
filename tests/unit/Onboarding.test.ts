import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import OnboardingModal from "../../src/components/Onboarding.vue";

describe("Onboarding.vue", () => {
  const createWrapper = (props = { visible: true }) => {
    return mount(OnboardingModal, {
      props,
      global: {
        stubs: {
          ProgressNodes: true,
          OnboardingQuestion: true,
        },
      },
    });
  };

  it("renders the onboarding modal when visible", () => {
    const wrapper = createWrapper();

    expect(wrapper.find("h1").text()).toBe("Welcome to Bite Balance");
    expect(wrapper.text()).toContain("Let's get to know you better!");
  });

  it("does not render the modal when not visible", () => {
    const wrapper = createWrapper({ visible: false });

    expect(wrapper.find(".z-50").exists()).toBe(false);
  });

  it("emits closeOnboarding when the 'Skip' button is clicked", async () => {
    const wrapper = createWrapper();

    await wrapper.find('[data-test-id="skip-button"]').trigger("click");
    expect(wrapper.emitted()).toHaveProperty("closeOnboarding");
  });

  it("advances to the next question when 'Get Started' is clicked", async () => {
    const wrapper = createWrapper();

    await wrapper.find('[data-test-id="get-started-button"]').trigger("click");
    //@ts-ignore
    expect(wrapper.vm.currentQuestion).toBe(1);
  });

  it("displays validation errors for invalid inputs", async () => {
    const wrapper = createWrapper();

    wrapper.vm.currentQuestion = 5;
    wrapper.vm.invalidDOB = true;
    wrapper.vm.invalidHeight = true;
    wrapper.vm.invalidWeight = true;

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".text-danger-500").exists()).toBe(true);
    expect(wrapper.text()).toContain("Some of your answers are not valid.");
  });

  it("enables the 'Finish' button when all inputs are valid", async () => {
    const wrapper = createWrapper();

    wrapper.vm.currentQuestion = 5;
    wrapper.vm.invalidDOB = false;
    wrapper.vm.invalidHeight = false;
    wrapper.vm.invalidWeight = false;

    await wrapper.vm.$nextTick();

    const finishButton = wrapper.find('[data-test-id="finish-button"]');
    expect(finishButton.attributes()).not.toHaveProperty("disabled");
  });

  it("disables the 'Finish' button when inputs are invalid", async () => {
    const wrapper = createWrapper();

    wrapper.vm.currentQuestion = 5;
    wrapper.vm.invalidDOB = true;
    wrapper.vm.invalidHeight = false;
    wrapper.vm.invalidWeight = false;
    await wrapper.vm.$nextTick();

    const finishButton = wrapper.find('[data-test-id="finish-button"]');
    expect(finishButton.attributes()).toHaveProperty("disabled");
  });
});
