<template>
  <div class="flex justify-center items-center">
    <svg :width="(nodes.length - 1) * spacing + 2 * radius" :height="radius * 2" class="relative">
      <line v-for="i in nodes.length - 1" :key="'line-' + i" :x1="(i - 1) * spacing + radius" :y1="radius"
        :x2="i * spacing + radius" :y2="radius" :stroke="i - 1 < props.active ? '#30CfC0' : '#D0D9D6'" stroke-width="4">
        <animate v-if="i - 1 < active" attribute-name="stroke-dasharray" from="0, 100" to="100, 0" dur="0.5s"
          fill="freeze" />
      </line>

      <circle v-for="(_, index) in nodes" :key="'circle-' + index" :cx="index * spacing + radius" :cy="radius"
        :r="index === active ? radius - 2 : radius" :stroke="index === active ? '#30CFC0' : ''"
        :stroke-width="index === active ? '4' : '0'" :fill="index < active ? '#30CFC0' : index === active ? 'white' : '#D0D9D6'
          ">
        <animate v-if="index < active" attributeName="fill" from="#D0D9D6" to="#30CFC0" dur="0.5s" fill="freeze" />
      </circle>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  active: number;
}>();

const nodes = Array(4).fill(null);

const spacing = 100;
const radius = 15;
</script>
