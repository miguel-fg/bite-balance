<template>
  <div class="flex flex-col">
    <label :for="`${props.label}`" class="capitalize font-HM font-light text-body text-ui-gray-900">{{props.label}}</label>
    <div class="flex items-center px-1 h-11 rounded-md shadow-md bg-white">
      <div class="mr-1.5 pr-1.5 border-r border-ui-gray-200">
        <img v-if="imgSrc" :src="imgSrc" :alt="`Icon for the ${props.label} input`" class="w-6 h-6">
      </div>
      <input :type="props.hiddenValue ? 'password' : 'text'" :id="`${props.label}`" :placeholder="`${props.placeholder}`" autocomplete="on" class="w-full font-HM font-light text-body text-ui-gray-900">
    </div>
  </div>
</template>

<script setup lang="ts">
  interface formProps {
    label: string,
    icon: string,
    placeholder: string,
    hiddenValue?: boolean
  }

  const props = withDefaults(defineProps<formProps>(), {
    hiddenValue: false
  })

  const imgSrc = new URL(`../assets/icons/${props.icon}.svg`, import.meta.url).href
</script>
