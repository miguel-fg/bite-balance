<template>
  <div class="flex flex-col gap-3">
    <button @click="redirectToGitHub" class="btn-fixed-width shadow-md bg-white">
      <div class="flex justify-center items-center gap-1">
        <img src="../../assets/icons/github-142 1.svg" alt="Github icon" class="w-4 h-4" />
        Github
      </div>
    </button>
    <button @click="redirectToGoogle" class="btn-fixed-width shadow-md bg-white">
      <div class="flex justify-center items-center gap-1">
        <img src="../../assets/icons/google-color 1.svg" alt="Github icon" class="w-4 h-4" />
        Google
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
  const redirectToGitHub = () => {
    window.location.href = "http://localhost:3000/api/oauth/github";
  };

  const redirectToGoogle = () => {
    console.log("I don't work yet!");
  };
</script>
