<template>
  <div class="flex px-16 md:px-20 lg:px-48 justify-between items-center py-1 bg-primary-800">
    <RouterLink to="/">
      <div class="flex items-center gap-1">
        <img src="/bb_logo.png" alt="Bite Balance logo" class="w-8 h-8 md:w-10 md:h-10">
        <span class="hidden lg:flex font-MT font-bold text-body text-white">Bite Balance</span>
      </div>
    </RouterLink>
    <div class="hidden md:flex">
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
    <div class="flex md:hidden">
      <button>
        <MenuIcon class="w-6 h-5 overflow-visible"/>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import MenuIcon from '../assets/icons/menu 1.svg'
  import CloseIcon from '../assets/icons/close 1.svg'
  import { ref } from 'vue'

  const isOpen = ref(false);

  const openNav = () => {
    isOpen.value = true;
  }

  const closeNav = () => {
    isOpen.value = false;
  }
</script>
