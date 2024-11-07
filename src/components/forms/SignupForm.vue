<template>
  <div class="flex flex-col gap-3">
    <InputGroup
      v-model="username"
      label="name"
      icon="user"
      placeholder="Jane Doe"
      :status="usernameStatus"
    />
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
    <InputGroup
      v-model="confirmed"
      label="confirm password"
      icon="lock"
      placeholder="********"
      :hiddenValue="true"
      :status="confirmedStatus"
    />
  </div>
  <button class="btn-fixed-width mt-6 shadow-md bg-primary-500">Sign up</button>
</template>

<script setup lang="ts">
import InputGroup from "../InputGroup.vue";
import { ref } from "vue";
import { InputStatus } from "../../types/InputStatus";

const username = ref("");
const email = ref("");
const password = ref("");
const confirmed = ref("");

const usernameStatus = ref<InputStatus>("NORMAL");
const emailStatus = ref<InputStatus>("NORMAL");
const passwordStatus = ref<InputStatus>("NORMAL");
const confirmedStatus = ref<InputStatus>("NORMAL");
</script>
