<script setup lang="ts">
import { Bubble } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BubbleController, PointElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BubbleController, PointElement, CategoryScale, LinearScale);

// TODO - Typing
const { data, options } = defineProps([ 'data', 'options' ]);
</script>

<template>
  <Bubble :data="data" :options="options" />
</template>

<style scoped>

</style>