<template>
  <div>
    <p><span>Title: </span> {{ questions[props.questionNum].title }}</p>
    <p>
      <span>Image to display: </span> {{ questions[props.questionNum].image }}
    </p>
    <p><span>Input type: </span> {{ questions[props.questionNum].input }}</p>
    <p><span>Subtitle: </span> {{ questions[props.questionNum].subtitle }}</p>
  </div>
  <div>
    <button @click="$emit('decrement')">Back</button>
    <button @click="$emit('increment')">Continue</button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps < {
    questionNum: number;
  } > ();

  const questions = [
    {
      title: "What is your date of birth?",
      image: "cake",
      input: "date",
      subtitle:
        "This will help Bite Balance Calculate your age for BMI and nutritional needs.",
    },
    {
      title: "What is your current height?",
      image: "plants",
      input: "height",
      subtitle: "",
    },
    {
      title: "What is your current weight?",
      image: "scale",
      input: "weight",
      subtitle: "",
    },
    {
      title: "Would you like to share your gender?",
      image: "question",
      input: "gender",
      subtitle:
        "This can help Bite Balance fine-tune BMI calculations based on gender-related standards.",
    },
  ];
</script>
