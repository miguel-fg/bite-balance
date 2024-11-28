<template>
  <div class="flex gap-4">
    <div class="flex items-center px-1 mb-1 h-10 rounded-md shadow-md bg-white">
      <div class="mr-1.5 pr-1.5 border-r border-ui-gray-200">
        <img
          src="../../assets/icons/user.svg"
          alt="Calendar icon"
          class="w-6 h-6"
        />
      </div>
      <input
        :value="numericValue"
        @change="updateNumericValue"
        class="w-full font-HM font-light text-body text-ui-gray-900 focus:outline-primary-500"
      />
    </div>
    <div
      class="flex items-center gap-1 px-1 mb-1 h-10 rounded-md shadow-md font-HM font-semibold text-body bg-white"
    >
      <span
        @click="updateUnit('metric')"
        class="flex items-center justify-center w-10 h-8 rounded"
        :class="
          unit === options.metric
            ? 'bg-primary-500 text-ui-gray-900'
            : 'text-ui-gray-600'
        "
        >{{ options.metric }}</span
      >
      <span
        @click="updateUnit('imperial')"
        class="flex items-center justify-center w-10 h-8 rounded"
        :class="
          unit === options.imperial
            ? 'bg-primary-500 text-ui-gray-900'
            : 'text-ui-gray-600'
        "
        >{{ options.imperial }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";

const props = defineProps<{
  unitSet: string;
}>();

const options = computed(() => {
  if (props.unitSet === "height") {
    return { metric: "m", imperial: "ft" };
  }

  if (props.unitSet === "weight") {
    return { metric: "kg", imperial: "lb" };
  }

  return { metric: "", imperial: "" };
});

//@ts-ignore
const { height, updateHeight } = inject("height");

//@ts-ignore
const { weight, updateWeight } = inject("weight");

const currentState = computed(() =>
  props.unitSet === "height" ? height.value : weight.value,
);

const numericValue = computed({
  get: () => currentState.value.value,
  set: (newValue: number) => {
    const updated = { ...currentState.value, value: newValue };
    if (props.unitSet === "height") {
      updateHeight(updated);
    } else if (props.unitSet === "weight") {
      updateWeight(updated);
    }
  },
});

const unit = computed({
  get: () => currentState.value.unit,
  set: (newUnit: string) => {
    const updated = { ...currentState.value, unit: newUnit };
    if (props.unitSet === "height") {
      updateHeight(updated);
    } else if (props.unitSet === "weight") {
      updateWeight(updated);
    }
  },
});

const updateUnit = (system: string) => {
  const unitValue =
    system === "metric" ? options.value.metric : options.value.imperial;
  unit.value = unitValue;
};

const updateNumericValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  numericValue.value = Number(input.value);
};
</script>
