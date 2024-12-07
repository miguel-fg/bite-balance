import { createMemoryHistory, createRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Dashboard from "./views/Dashboard.vue";
import Metrics from "./views/Metrics.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/metrics",
    name: "Metrics",
    component: Metrics,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { requiresUnauthenticated: true },
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    meta: { requiresUnauthenticated: true },
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Redirect authenticated users away from login / sign up
  if (to.meta.requiresUnauthenticated && authStore.isAuthenticated) {
    next("/dashboard");
  } else if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
