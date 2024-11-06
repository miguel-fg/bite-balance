<template>
  <div class="flex justify-between lg:pr-48">
    <div class="flex flex-col md:max-w-md lg:max-w-xl mt-10 md:mt-20 px-4 md:pl-16 md:pr-0 lg:pl-48 lg:pr-0">
      <h1 class="mb-8 md:mb-10 text-balance font-MT font-bold text-title text-ui-gray-900">
        Create Your Account
      </h1>
      <SignupForm />
      <div class="my-12">
        <p class="mb-3 font-HM font-light text-body text-ui-gray-900">
          Or use a social provider to create your account
        </p>
        <SocialProviders />
      </div>
      <p class="font-HM font-light text-body text-ui-gray-900">
        Have an account?
        <RouterLink to="/login" class="font-HM font-bold underline text-body text-primary-700">Log in</RouterLink>
      </p>
    </div>
    <div class="hidden lg:flex items-center">
      <img src="../assets/illustrations/signup-illustration.svg" alt="" class="w-[600px] h-[600px] mt-10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SignupForm from "../components/forms/SignupForm.vue";
import SocialProviders from "../components/forms/SocialProviders.vue";
</script>
