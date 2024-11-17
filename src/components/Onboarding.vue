<template>
  <div v-if="props.visible">
    <div v-if="currentQuestion === 0">
      <h1>Welcome to Bite Balance</h1>
      <h2>Let's get to know you better!</h2>
      <p>
        Answer these quick questions to personalize your nutrition tracker
        experience.
      </p>
      <div>
        <button @click="$emit('closeOnboarding')">Skip</button>
        <button @click="nextQuestion">Get Started</button>
      </div>
    </div>
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
    <OnboardingQuestion v-else :question-num="currentQuestion - 1" @increment="nextQuestion"
      @decrement="prevQuestion" />
    <ProgressNodes :active="currentQuestion - 1" />
  </div>
</template>

<script setup lang="ts">
  import {ref} from "vue";
  import ProgressNodes from "./onboarding/ProgressNodes.vue";
  import OnboardingQuestion from "./onboarding/OnboardingQuestion.vue";

  const currentQuestion = ref(0);
  const props = defineProps < {
    visible: boolean;
  } > ();

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
