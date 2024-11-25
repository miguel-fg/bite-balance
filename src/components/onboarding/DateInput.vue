<template>
  <div class="flex items-center px-1 h-10 rounded-md shadow-md bg-white" :class="borderStyle">
    <div class="mr-1.5 pr-1.5 border-r border-ui-gray-200">
      <img src="../../assets/icons/calendar 1.svg" alt="Calendar icon" class="w-6 h-6" />
    </div>
    <input v-model="dateValue" type="date" id="onboarding-date" placeholder="YYYY/MM/DD" autocomplete="on"
      class="w-full font-HM font-light text-body text-ui-gray-900 focus:outline-primary-500" />
    <img v-if="props.status === 'VALID'" src="../assets/icons/check.svg" alt="Input is valid icon" class="w-6 h-6" />
  </div>
  <div v-if="props.status === 'ERROR'" class="font-HM font-light text-body text-danger-500">
    {{ props.errorMsg }}
  </div>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  import {InputStatus} from "../../types/InputStatus";
  const dateValue = defineModel({default: ""});

  interface formProps {
    status: InputStatus;
    errorMsg: string;
  }

  const props = withDefaults(defineProps < formProps > (), {
    status: "NORMAL",
  });

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
