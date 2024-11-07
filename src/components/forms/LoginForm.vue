<template>
  <div class="flex flex-col gap-3">
    <InputGroup
      v-model="email"
      label="email"
      icon="email"
      placeholder="yummy@food.com"
      :status="emailStatus"
    />
    <InputGroup
      v-model="password"
      label="password"
      icon="lock"
      placeholder="********"
      :hiddenValue="true"
      :status="passwordStatus"
    />
  </div>
  <button class="btn-fixed-width mt-6 shadow-md bg-primary-500">Log In</button>
</template>

<script setup lang="ts">
import InputGroup from "../InputGroup.vue";
import { ref } from "vue";
import { InputStatus } from "../../types/InputStatus";

const email = ref("");
const password = ref("");
const emailStatus = ref<InputStatus>("NORMAL");
const passwordStatus = ref<InputStatus>("NORMAL");
</script>
