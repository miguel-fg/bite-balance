<template>
  <div class="flex">
    <div class="flex relative items-center px-1 mb-1 h-10 rounded-md shadow-md bg-white">
      <div class="mr-1.5 pr-1.5 border-r border-ui-gray-200">
        <img src="../../assets/icons/user.svg" alt="Calendar icon" class="w-6 h-6" />
      </div>
      <input :value="unit" @change="updateUnitHandler"
        class="w-full font-HM font-light text-body text-ui-gray-900 focus:outline-primary-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

const props = defineProps<{
  unitSet: string;
}>();

//@ts-ignore
const { height, updateHeight } = inject("height");

//@ts-ignore
const { weight, updateWeight } = inject("weight");

const unit = computed(() =>
  props.unitSet === "height" ? height.value : weight.value,
);

const updateUnitHandler = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input) {
    if (props.unitSet === "height") {
      updateHeight(input.value);
    } else if (props.unitSet === "weight") {
      updateWeight(input.value);
    }
  }
};
</script>

<style scoped></style>
