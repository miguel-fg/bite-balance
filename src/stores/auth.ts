import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../scripts/axiosConfig";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);
  const isInitialized = ref(false);
  const user = ref<{
    id: number;
    username: string | null;
    email: string;
    dateOfBirth: Date | null;
    weight: number | null;
    height: number | null;
    gender: string | null;
  } | null>(null);

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
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      user.value = response.data.user;
      isAuthenticated.value = true;
    } catch (error) {
      console.error("Registration failed: ", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      user.value = response.data.user;
      isAuthenticated.value = true;
    } catch (error) {
      console.error("Login failed: ", error);
      throw error;
    }
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    user.value = null;
    isAuthenticated.value = false;
  };

  return {
    user,
    isAuthenticated,
    isInitialized,
    fetchUser,
    signup,
    login,
    logout,
  };
});
