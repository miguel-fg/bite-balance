<template>
  <div class="flex flex-col">
    <label :for="`${props.label}`" class="capitalize font-HM font-light text-body text-ui-gray-900">{{ props.label
      }}</label>
    <div class="flex items-center px-1 h-10 rounded-md shadow-md bg-white" :class="borderStyle">
      <div class="mr-1.5 pr-1.5 border-r border-ui-gray-200">
        <img v-if="imgSrc" :src="imgSrc" :alt="`Icon for the ${props.label} input`" class="w-6 h-6" />
      </div>
      <input v-model="textValue" :type="props.hiddenValue ? 'password' : 'text'" :id="`${props.label}`"
        :placeholder="`${props.placeholder}`" autocomplete="on"
        class="w-full font-HM font-light text-body text-ui-gray-900 focus:outline-primary-500" />
      <img v-if="props.status === 'VALID'" src="../assets/icons/check.svg" alt="Input is valid icon" class="w-6 h-6" />
    </div>
    <div v-if="props.status === 'ERROR'" class="font-HM font-light text-body text-danger-500">
      {{ props.errorMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { InputStatus } from "../types/InputStatus";

interface formProps {
  label: string;
  icon: string;
  placeholder: string;
  hiddenValue?: boolean;
  status: InputStatus;
  errorMsg: string;
}

const props = withDefaults(defineProps<formProps>(), {
  hiddenValue: false,
  status: "NORMAL",
});

const imgSrc = new URL(`../assets/icons/${props.icon}.svg`, import.meta.url)
  .href;

const textValue = defineModel({ default: "" });

const borderStyle = computed(() => {
  switch (props.status) {
    case "VALID":
      return "border-solid border-2 border-success-500";
    case "ERROR":
      return "border-solid border-2 border-danger-500";
    case "NORMAL":
      return "";
    default:
      return "";
  }
});
</script>
