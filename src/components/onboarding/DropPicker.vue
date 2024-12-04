<template>
  <div
    class="flex relative items-center px-1 mb-1 h-10 rounded-md shadow-md bg-white"
  >
    <div class="mr-1.5 pr-1.5 border-r border-ui-gray-200">
      <img
        src="../../assets/icons/user.svg"
        alt="Calendar icon"
        class="w-6 h-6"
      />
    </div>
    <select
      :value="gender"
      @click="toggleMenu"
      @change="updateGenderHandler"
      class="w-full font-HM font-light text-body text-ui-gray-900 focus:outline-primary-500"
    >
      <option selected></option>
      <option
        class="font-HM font-light text-body text-ui-gray-900"
        value="Male"
      >
        Male
      </option>
      <option
        class="font-HM font-light text-body text-ui-gray-900 hover:text-ui-gray-900 hover:bg-ui-gray-300"
        value="Female"
      >
        Female
      </option>
      <option
        class="font-HM font-light text-body text-ui-gray-900"
        value="Other"
      >
        Other
      </option>
      <option class="font-HM font-light text-body text-ui-gray-900" value="">
        Prefer not to say
      </option>
    </select>
    <img
      v-if="!menuIsOpen"
      src="../../assets/icons/chevron-down.svg"
      alt="Open select menu icon"
      class="absolute pointer-events-none right-1 w-6 h-6"
    />
    <img
      v-else
      src="../../assets/icons/chevron-up.svg"
      alt="Close select menu icon"
      class="pointer-events-none absolute right-1 w-6 h-6"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
const menuIsOpen = ref(false);

const toggleMenu = () => {
  menuIsOpen.value = !menuIsOpen.value;
};

//@ts-ignore
const { gender, updateGender } = inject("gender");

const updateGenderHandler = (event: Event) => {
  const input = event.target as HTMLSelectElement;

  toggleMenu();
  updateGender(input.value);
};
</script>

<style scoped>
select {
  /* for Firefox */
  -moz-appearance: none;
  appearance: none;
  /* for Chrome */
  -webkit-appearance: none;
}

/* For IE10 */
select::-ms-expand {
  display: none;
}
</style>
