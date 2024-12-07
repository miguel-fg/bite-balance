<template>
  <div
    class="flex px-4 md:px-16 lg:px-48 justify-between items-center py-1 bg-primary-800"
  >
    <RouterLink to="/">
      <div class="flex items-center gap-1">
        <img
          src="/bb_logo.png"
          alt="Bite Balance logo"
          class="w-8 h-8 md:w-10 md:h-10"
        />
        <span class="hidden lg:flex font-MT font-bold text-body text-white"
          >Bite Balance</span
        >
      </div>
    </RouterLink>
    <div class="hidden md:flex items-center">
      <nav class="font-HM font-light text-white">
        <RouterLink v-if="!authStore.isAuthenticated" to="/">Home</RouterLink>
        <RouterLink v-if="!authStore.isAuthenticated" to="/about" class="ml-10"
          >About</RouterLink
        >
        <RouterLink
          v-if="authStore.isAuthenticated"
          to="/dashboard"
          class="ml-10"
          >Dashboard</RouterLink
        >
        <RouterLink
          v-if="authStore.isAuthenticated"
          to="/metrics"
          class="ml-10"
        >
          Metrics
        </RouterLink>
        <RouterLink
          v-if="authStore.isAuthenticated"
          to="/profile"
          class="ml-10"
        >
          Profile
        </RouterLink>
      </nav>
      <div v-if="!authStore.isAuthenticated" class="flex gap-2 ml-12">
        <RouterLink to="/login"
          ><span
            class="px-4 py-2 rounded-md bg-white font-HM font-semibold text-body text-primary-900"
            >Login</span
          >
        </RouterLink>
        <RouterLink to="/signup"
          ><span
            class="px-4 py-2 rounded-md bg-transparent border-white border-2 font-HM font-semibold text-body text-white"
            >Sign up</span
          ></RouterLink
        >
      </div>
      <div v-else class="flex gap-2 ml-12">
        <button
          @click="authStore.logout"
          class="px-4 py-2 rounded-md bg-white font-HM font-semibold text-body text-primary-900"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="flex md:hidden">
      <button @click="toggleNav">
        <img
          v-if="!isOpen"
          src="../assets/icons/menu 1.svg"
          alt="Menu icon"
          class="w-10 h-8"
        />
        <img
          v-else
          src="../assets/icons/close 1.svg"
          alt="Menu icon"
          class="w-10 h-8"
        />
      </button>
    </div>
  </div>
  <div v-if="isOpen" class="flex flex-col px-4 md:hidden bg-primary-800">
    <nav class="font-HM font-light text-white">
      <RouterLink
        v-if="!authStore.isAuthenticated"
        to="/"
        class="block mt-8 pb-4 border-b-2 border-ui-gray-500"
        >Home
      </RouterLink>
      <RouterLink
        v-if="!authStore.isAuthenticated"
        to="/about"
        class="block mt-4 pb-4 border-b-2 border-ui-gray-500"
      >
        About</RouterLink
      >
      <RouterLink
        v-if="authStore.isAuthenticated"
        to="/dashboard"
        class="block mt-4 pb-5 border-b-2 border-ui-gray-500"
        >Dashboard</RouterLink
      >
      <RouterLink
        v-if="authStore.isAuthenticated"
        to="/dashboard"
        class="block mt-4 pb-5 border-b-2 border-ui-gray-500"
        >Metrics</RouterLink
      >
      <RouterLink
        v-if="authStore.isAuthenticated"
        to="/dashboard"
        class="block mt-4 pb-5 border-b-2 border-ui-gray-500"
        >Profile</RouterLink
      >
    </nav>
    <div
      v-if="!authStore.isAuthenticated"
      class="flex flex-col w-32 gap-5 mt-5 mb-5"
    >
      <RouterLink to="/login"
        ><span
          class="flex justify-center py-2 rounded-md bg-white font-HM font-semibold text-body text-primary-900"
          >Login</span
        >
      </RouterLink>
      <RouterLink to="/signup"
        ><span
          class="flex justify-center py-2 rounded-md bg-transparent border-white border-2 font-HM font-semibold text-body text-white"
          >Sign up</span
        ></RouterLink
      >
    </div>
    <div v-else class="flex flex-col w-32 gap-5 mt-5 mb-5">
      <button
        @click="authStore.logout"
        class="flex justify-center py-2 rounded-md bg-white font-HM font-semibold text-body text-primary-900"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const isOpen = ref(false);
const authStore = useAuthStore();

const toggleNav = () => {
  isOpen.value = !isOpen.value;
};
</script>
