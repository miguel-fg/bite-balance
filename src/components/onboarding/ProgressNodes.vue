<template>
  <div>Node: {{ active }}</div>
</template>

<script setup lang="ts">
  import {ref} from "vue";

  const props = defineProps < {
    active: number;
  } > ();
</script>
