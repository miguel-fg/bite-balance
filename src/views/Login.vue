<template>
  <div class="flex flex-col md:max-w-md lg:max-w-xl mt-10 md:mt-20 px-4 md:pl-16 md:pr-0 lg:pl-48 lg:pr-0">
    <h1 class="mb-8 md:mb-10 text-balance font-MT font-bold text-title text-ui-gray-900">Log Into Your Account</h1>
    <LoginForm /> 
    <div class="my-12">
      <p class="mb-3 font-HM font-light text-body text-ui-gray-900">Or use a social provider to log in</p>
      <SocialProviders />
    </div>
    <p class="font-HM font-light text-body text-ui-gray-900">Don't have an account? <RouterLink to="/signup" class="font-HM font-bold underline text-body text-primary-700">Sign up</RouterLink></p>
  </div>
</template>

<script setup lang="ts">
  import LoginForm from '../components/forms/LoginForm.vue';
  import SocialProviders from '../components/forms/SocialProviders.vue';
</script>
