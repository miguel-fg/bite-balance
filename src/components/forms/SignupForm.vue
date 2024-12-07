<template>
  <div class="flex flex-col gap-3">
    <InputGroup v-model="username" input-id="username" label="name" icon="user" placeholder="Jane Doe"
      :status="usernameStatus" :error-msg="usernameError" />
    <InputGroup v-model="email" input-id="email" label="email" icon="email" placeholder="yummy@food.com"
      :status="emailStatus" :error-msg="emailError" />
    <InputGroup v-model="password" input-id="password" label="password" icon="lock" placeholder="********"
      :hiddenValue="true" :status="passwordStatus" :error-msg="passwordError" />
    <InputGroup v-model="confirmed" input-id="confirmed" label="confirm password" icon="lock" placeholder="********"
      :hiddenValue="true" :status="confirmedStatus" :error-msg="confirmedError" />
  </div>
  <button @click="handleSubmit" class="btn-fixed-width mt-6 shadow-md bg-primary-500">
    Sign up
  </button>
</template>

<script setup lang="ts">
  import InputGroup from "../InputGroup.vue";
  import {ref} from "vue";
  import {InputStatus} from "../../types/InputStatus";
  import {validateField, matchFields} from "../../scripts/forms";
  import {useAuthStore} from "../../stores/auth";

  const username = ref("");
  const email = ref("");
  const password = ref("");
  const confirmed = ref("");

  const usernameStatus = ref < InputStatus > ("NORMAL");
  const emailStatus = ref < InputStatus > ("NORMAL");
  const passwordStatus = ref < InputStatus > ("NORMAL");
  const confirmedStatus = ref < InputStatus > ("NORMAL");

  const usernameError = ref("");
  const emailError = ref("");
  const passwordError = ref("");
  const confirmedError = ref("");

  const validateForm = () => {
    const {res: usernameRes, msg: usernameMsg} = validateField(
      username.value,
      "USERNAME",
    );
    const {res: emailRes, msg: emailMsg} = validateField(email.value, "EMAIL");
    const {res: passwordRes, msg: passwordMsg} = validateField(
      password.value,
      "PASSWORD",
    );
    const {res: confirmedRes, msg: confirmedMsg} = matchFields(
      password.value,
      confirmed.value,
    );

    usernameStatus.value = usernameRes;
    usernameError.value = usernameMsg;
    emailStatus.value = emailRes;
    emailError.value = emailMsg;
    passwordStatus.value = passwordRes;
    passwordError.value = passwordMsg;
    confirmedStatus.value = confirmedRes;
    confirmedError.value = confirmedMsg;

    return (
      usernameStatus.value === "VALID" &&
      emailStatus.value === "VALID" &&
      passwordStatus.value === "VALID" &&
      confirmedStatus.value === "VALID"
    );
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    const authStore = useAuthStore();

    if (isValid) {
      console.log("FORM VALID!");
      authStore.signup(username.value, email.value, password.value);
    } else {
      console.error("FORM NOT VALID!");
    }
  };
</script>
