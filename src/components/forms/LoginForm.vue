<template>
  <div class="flex flex-col gap-3">
    <InputGroup v-model="email" input-id="email" label="email" icon="email" placeholder="yummy@food.com"
      :status="emailStatus" :error-msg="emailError" />
    <InputGroup v-model="password" input-id="password" label="password" icon="lock" placeholder="********"
      :hiddenValue="true" :status="passwordStatus" :error-msg="passwordError" />
  </div>
  <button @click="validateForm"
    class="btn-fixed-width mt-6 shadow-md bg-primary-500 focus:outline-primary-700 active:bg-primary-700 active:text-white">
    Log In
  </button>
</template>

<script setup lang="ts">
import InputGroup from "../InputGroup.vue";
import { ref } from "vue";
import { InputStatus } from "../../types/InputStatus";
import { validateField } from "../../scripts/forms";

const email = ref("");
const password = ref("");

const emailStatus = ref<InputStatus>("NORMAL");
const passwordStatus = ref<InputStatus>("NORMAL");

const emailError = ref("");
const passwordError = ref("");

const validateForm = () => {
  const { res: emailRes, msg: emailMsg } = validateField(email.value, "EMAIL");
  const { res: passwordRes, msg: passwordMsg } = validateField(
    password.value,
    "PASSWORD",
  );

  emailStatus.value = emailRes;
  emailError.value = emailMsg;
  passwordStatus.value = passwordRes;
  passwordError.value = passwordMsg;
};
</script>
