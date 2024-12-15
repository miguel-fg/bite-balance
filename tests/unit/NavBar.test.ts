import { nextTick } from "vue";
import { mount, RouterLinkStub } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import NavBar from "../../src/components/NavBar.vue";
import { createTestingPinia } from "@pinia/testing";
import { useAuthStore } from "../../src/stores/auth";
import { RouterLink } from "vue-router";

describe("Navigation Bar", () => {
  const createWrapper = () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    return wrapper;
  };

  it("renders the correct links when the user is not authenticated", async () => {
    const wrapper = createWrapper();

    const authStore = useAuthStore();
    authStore.isAuthenticated = false;
    await nextTick();

    const homeLink = wrapper.findComponent('[data-test="home-link"]');
    const aboutLink = wrapper.findComponent('[data-test="about-link"]');
    const dashboardLink = wrapper.findComponent('[data-test="dashboard-link"]');
    const metricsLink = wrapper.findComponent('[data-test="metrics-link"]');
    const profileLink = wrapper.findComponent('[data-test="profile-link"]');
    const loginButton = wrapper.findComponent('[data-test="login-link"]');
    const signupButton = wrapper.findComponent('[data-test="signup-link"]');

    expect(homeLink.exists()).toBe(true);
    expect(aboutLink.exists()).toBe(true);
    expect(dashboardLink.exists()).toBe(false);
    expect(metricsLink.exists()).toBe(false);
    expect(profileLink.exists()).toBe(false);
    expect(loginButton.exists()).toBe(true);
    expect(signupButton.exists()).toBe(true);
  });

  it("renders the correct links when the user is authenticated", async () => {
    const wrapper = createWrapper();

    const authStore = useAuthStore();
    authStore.isAuthenticated = true;
    await nextTick();

    const homeLink = wrapper.findComponent('[data-test="home-link"]');
    const aboutLink = wrapper.findComponent('[data-test="about-link"]');
    const dashboardLink = wrapper.findComponent('[data-test="dashboard-link"]');
    const metricsLink = wrapper.findComponent('[data-test="metrics-link"]');
    const profileLink = wrapper.findComponent('[data-test="profile-link"]');
    const loginButton = wrapper.findComponent('[data-test="login-link"]');
    const signupButton = wrapper.findComponent('[data-test="signup-link"]');

    expect(homeLink.exists()).toBe(false);
    expect(aboutLink.exists()).toBe(false);
    expect(dashboardLink.exists()).toBe(true);
    expect(metricsLink.exists()).toBe(true);
    expect(profileLink.exists()).toBe(true);
    expect(loginButton.exists()).toBe(false);
    expect(signupButton.exists()).toBe(false);
  });

  it("toggles the mobile navigation menu visibility", async () => {
    const wrapper = createWrapper();

    const menuButton = wrapper.find('button img[alt="Menu icon"]');

    let mobileNav = wrapper.find("div.md\\:hidden > nav");
    expect(mobileNav.exists()).toBe(false);

    await menuButton.trigger("click");
    await nextTick();

    mobileNav = wrapper.find("div.md\\:hidden > nav");
    expect(mobileNav.exists()).toBe(true);

    const closeButton = wrapper.find('button img[alt="Close menu icon"]');

    await closeButton.trigger("click");
    await nextTick();

    mobileNav = wrapper.find("div.md\\:hidden > nav");
    expect(mobileNav.exists()).toBe(false);
  });

  it("calls logout function when the button is clicked", async () => {
    const wrapper = createWrapper();

    const authStore = useAuthStore();
    authStore.isAuthenticated = true;

    await nextTick();

    const logoutButton = wrapper.find('[data-test="logout-button"]');
    expect(logoutButton.exists()).toBe(true);

    await logoutButton.trigger("click");

    expect(authStore.logout).toHaveBeenCalledTimes(1);
  });
});
