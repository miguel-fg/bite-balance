<template>
  <div class="flex relative items-center px-1 mb-1 h-10 rounded-md shadow-md bg-white">
    <div class="mr-1.5 pr-1.5 border-r border-ui-gray-200">
      <img src="../../assets/icons/calendar.svg" alt="Calendar icon" class="w-6 h-6" />
    </div>
    <input :value="dateOfBirth" @change="updateDOBHandler" type="date" :max="maxDate" :min="minDate"
      id="onboarding-date" autocomplete="on"
      class="w-full font-HM font-light text-body text-ui-gray-900 focus:outline-primary-500" />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const today = new Date();
const maxDate = today.toISOString().split("T")[0];
const minDate = new Date(
  today.getFullYear() - 120,
  today.getMonth(),
  today.getDate(),
)
  .toISOString()
  .split("T")[0];

//@ts-ignore
const { dateOfBirth, updateDOB } = inject("dateOfBirth");

const updateDOBHandler = (event: Event) => {
  const input = event.target as HTMLInputElement;

  if (input) {
    updateDOB(input.value);
  }
};
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}
</style>
