<script setup lang="ts">
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// TODO - Typing
const { data, options } = defineProps([ 'data', 'options' ]);
</script>

<template>
  <Bar :data="data" :options="options" />
</template>

<style scoped>

</style>