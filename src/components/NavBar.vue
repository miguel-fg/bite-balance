<template>
  <div class="flex px-16 md:px-20 lg:px-48 justify-between items-center py-1 bg-primary-800">
    <RouterLink to="/">
      <div class="flex items-center gap-1">
        <img src="../../public/bb_logo.png" alt="Bite Balance logo" class="w-8 h-8 md:w-10 md:h-10">
        <span class="font-MT font-bold text-body text-white">Bite Balance</span>
      </div>
    </RouterLink>
    <div class="flex">
      <nav class="font-HM font-light underline text-white">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about" class="ml-10">About</RouterLink>
        <RouterLink to="/dashboard" class="ml-10">Dashboard</RouterLink>
      </nav>
      <div class="flex gap-2 ml-12">
        <RouterLink to="/login"><span class="px-4 py-2 rounded-md bg-white font-HM font-semibold text-body text-primary-900">Login</span></RouterLink>
        <RouterLink to="/signup"><span class="px-4 py-2 rounded-md bg-transparent border-white border-2 font-HM font-semibold text-body text-white">Sign up</span></RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
