<template>
  <div class="flex items-center px-1 h-10 rounded-md shadow-md bg-white" :class="borderStyle">
    <div class="mr-1.5 pr-1.5 border-r border-ui-gray-200">
      <img src="../../assets/icons/calendar 1.svg" alt="Calendar icon" class="w-6 h-6" />
    </div>
    <input :value="dateOfBirth" @change="updateDOBHandler" type="date" id="onboarding-date" placeholder="YYYY/MM/DD"
      autocomplete="on" class="w-full font-HM font-light text-body text-ui-gray-900 focus:outline-primary-500" />
    <img v-if="status === 'VALID'" src="../assets/icons/check.svg" alt="Input is valid icon" class="w-6 h-6" />
  </div>
  <div v-if="status === 'ERROR'" class="font-HM font-light text-body text-danger-500">
    {{ errorMsg }}
  </div>
</template>

<script setup lang="ts">
  import {ref, computed, inject} from "vue";
  import {InputStatus} from "../../types/InputStatus";
  const status = ref < InputStatus > ("NORMAL");
  const errorMsg = ref("");

  //@ts-ignore
  const {dateOfBirth, updateDOB} = inject("dateOfBirth");

  const borderStyle = computed(() => {
    switch (status.value) {
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

  const updateDOBHandler = (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (input) {
      updateDOB(input.value);
    }
  };
</script>
