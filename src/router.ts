import { createMemoryHistory, createRouter } from "vue-router";

import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Dashboard from "./views/Dashboard.vue";
import Metrics from "./views/Metrics.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/dashboard", component: Dashboard },
  { path: "/metrics", component: Metrics },
  { path: "/profile", component: Profile },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
