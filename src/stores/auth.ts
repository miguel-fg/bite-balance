import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import axiosInstance from "../scripts/axiosConfig";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const isInitialized = ref(false);
  const user = ref<{ id: number; email: string } | null>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get("/users/me");
      user.value = response.data;
      isAuthenticated.value = true;
    } catch (error) {
      user.value = null;
      isAuthenticated.value = false;
    } finally {
      isInitialized.value = true;
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      await axiosInstance.post("/auth/register", { username, email, password });
      await fetchUser();
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed: ", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await axiosInstance.post("/auth/login", { email, password });
      await fetchUser();
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    }
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    user.value = null;
    isAuthenticated.value = false;
    router.push("/login");
  };

  return { isAuthenticated, isInitialized, fetchUser, signup, login, logout };
});
