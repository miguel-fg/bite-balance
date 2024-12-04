<template>
  <div>
    <h1>Dashboard</h1>
    <Onboarding :visible="modalVisible" @close-onboarding="closeModal" />
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import Onboarding from "../components/Onboarding.vue";

  const modalVisible = ref(true);

  const closeModal = () => {
    modalVisible.value = false;
  };
</script>
