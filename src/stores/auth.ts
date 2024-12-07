import { defineStore } from "pinia";
import { ref } from "vue";
import axiosInstance from "../scripts/axiosConfig";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);

  const checkAuthStatus = async () => {
    try {
      await axiosInstance.get("/users/me");
      isAuthenticated.value = true;
    } catch (error) {
      isAuthenticated.value = false;
    }
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    isAuthenticated.value = false;
  };

  return { isAuthenticated, checkAuthStatus, logout };
});
