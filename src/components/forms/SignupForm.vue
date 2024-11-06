<template>
  <div class="flex flex-col gap-3">
    <InputGroup label="name" icon="user" placeholder="Jane Doe" />
    <InputGroup label="email" icon="email" placeholder="yummy@food.com" />
    <InputGroup label="password" icon="lock" placeholder="********" :hiddenValue="true" />
    <InputGroup label="confirm password" icon="lock" placeholder="********" :hiddenValue="true" />
  </div>
  <button class="btn-fixed-width mt-6 shadow-md bg-primary-500">Sign up</button>
</template>

<script setup lang="ts">
import InputGroup from "../InputGroup.vue";
</script>
