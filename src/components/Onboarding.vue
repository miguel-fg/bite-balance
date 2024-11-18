<template>
  <div
    v-if="props.visible"
    class="z-50 inset-0 fixed flex flex-col justify-center px-4 bg-ui-gray-100"
  >
    <!-- Welcome to Onboarding quiz -->
    <div v-if="currentQuestion === 0" class="flex flex-col gap-12">
      <h1 class="font-MT font-bold text-title text-ui-gray-900">
        Welcome to Bite Balance
      </h1>
      <img src="/bb_logo_dark.png" alt="Bite Balance logo" class="w-24 h-24" />
      <div class="flex flex-col gap-1">
        <h1 class="font-HK font-regular text-subtitle text-ui-gray-900">
          Let's get to know you better!
        </h1>
        <p class="font-HM font-light text-body text-ui-gray-700">
          Answer these quick questions to personalize your nutrition tracker
          experience.
        </p>
      </div>
      <div class="flex justify-end gap-4">
        <button @click="$emit('closeOnboarding')" class="btn text-ui-gray-700">
          Skip
        </button>
        <button
          @click="nextQuestion"
          class="btn bg-primary-500 text-ui-gray-900 shadow"
        >
          Get Started
        </button>
      </div>
    </div>

    <!-- Summary of Onboarding user answers -->
    <div v-else-if="currentQuestion === 5">
      <h1>Summary</h1>
      <p><span>Date of Birth:</span> {{ dateOfBirth }}</p>
      <p><span>Height:</span> {{ height }}</p>
      <p><span>Weight:</span> {{ weight }}</p>
      <p><span>Gender:</span> {{ gender }}</p>
      <div>
        <button @click="prevQuestion">Back</button>
        <button @click="$emit('closeOnboarding')">Finish</button>
      </div>
    </div>

    <!-- Onboarding questions -->
    <OnboardingQuestion
      v-else
      :question-num="currentQuestion - 1"
      @increment="nextQuestion"
      @decrement="prevQuestion"
    />
    <ProgressNodes :active="currentQuestion - 1" class="mt-24" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProgressNodes from "./onboarding/ProgressNodes.vue";
import OnboardingQuestion from "./onboarding/OnboardingQuestion.vue";

const currentQuestion = ref(0);
const props = defineProps<{
  visible: boolean;
}>();

const dateOfBirth = ref();
const height = ref(0.0);
const weight = ref(0.0);
const gender = ref("");

const nextQuestion = () => {
  currentQuestion.value =
    currentQuestion.value < 5
      ? currentQuestion.value + 1
      : currentQuestion.value;
};

const prevQuestion = () => {
  currentQuestion.value =
    currentQuestion.value > 0
      ? currentQuestion.value - 1
      : currentQuestion.value;
};
</script>
