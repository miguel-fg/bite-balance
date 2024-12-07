<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
  import {onMounted} from "vue";
  import {useAuthStore} from "./stores/auth";
  import NavBar from "./components/NavBar.vue";

  const authStore = useAuthStore();

  onMounted(() => {
    authStore.checkAuthStatus();
  });
</script>
