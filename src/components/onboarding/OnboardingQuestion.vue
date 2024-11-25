<template>
  <div class="flex flex-col gap-7">
    <p class="font-MK font-normal text-subtitle text-ui-gray-900">
      {{ questions[props.questionNum].title }}
    </p>
    <div class="flex justify-center">
      <img v-if="imgSrc" :src="imgSrc" :alt="`Illustration showing a ${questions[props.questionNum].image}`"
        class="h-36" />
    </div>
    <div>
      <DateInput v-if="inputType === 'date'" />
      <p class="font-HM font-light text-body text-ui-gray-700">
        {{ questions[props.questionNum].subtitle }}
      </p>
    </div>
  </div>
  <div class="flex justify-end gap-4 mt-28">
    <button @click="goBackward" class="btn text-ui-gray-700">Back</button>
    <button @click="goForward" class="btn bg-primary-500 text-ui-gray-900">
      Continue
    </button>
  </div>
</template>

<script setup lang="ts">
  import {computed} from "vue";
  import DateInput from "./DateInput.vue";

  const props = defineProps < {
    questionNum: number;
  } > ();

  const emit = defineEmits(["increment", "decrement"]);

  const goForward = () => {
    emit("increment");
  };

  const goBackward = () => {
    emit("decrement");
  };

  const questions = [
    {
      title: "What is your date of birth?",
      image: "../../assets/illustrations/cake.svg",
      input: "date",
      subtitle:
        "This will help Bite Balance Calculate your age for BMI and nutritional needs.",
    },
    {
      title: "What is your current height?",
      image: "../../assets/illustrations/plants.svg",
      input: "height",
      subtitle: "",
    },
    {
      title: "What is your current weight?",
      image: "../../assets/illustrations/scale.svg",
      input: "weight",
      subtitle: "",
    },
    {
      title: "Would you like to share your gender?",
      image: "../../assets/illustrations/question.svg",
      input: "gender",
      subtitle:
        "This can help Bite Balance fine-tune BMI calculations based on gender-related standards.",
    },
  ];

  const imgSrc = computed(
    () => new URL(questions[props.questionNum].image, import.meta.url).href,
  );

  const inputType = computed(() => questions[props.questionNum].input);
</script>
