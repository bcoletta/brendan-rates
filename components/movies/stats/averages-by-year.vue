<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { useUtilStore } from '~/store/utils';
import type { MovieReportStats } from '~/types';
import Bar from '~/components/charts/bar.vue';

const { years } = defineProps({
  years: {
    type: Array as PropType<MovieReportStats[]>,
    default: [],
  },
});

const $utils = useUtilStore();

const axisOptions = {
  grid: {
    color: $utils.colors.gray[700],
    display: true,
  },
  ticks: {
    color: $utils.colors.gray[300],
  },
};

const chartOptions: ChartOptions = {
  aspectRatio: 1,
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: { display: true },
  },
  scales: {
    x: axisOptions,
    y: { ...axisOptions, min: 5, max: 10 },
  },
};

const chartData = computed((): ChartData => ({
  labels: years.map((yr: MovieReportStats) => yr.year),
  datasets: [
    {
      label: 'Average Entertainment Score',
      backgroundColor: $utils.colors.orange[300],
      data: years.map((yr: MovieReportStats) => parseFloat(yr.avg_e.toFixed(2))),
    },
    {
      label: 'Average Story Score',
      backgroundColor: $utils.colors.blue[300],
      data: years.map((yr: MovieReportStats) => parseFloat(yr.avg_s.toFixed(2))),
    },
  ],
}));
</script>

<template>
  <div class="w-full px-4">
    <div class="w-full text-center text-lg font-semibold">Movie Rating Averages by Year</div>
    <bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>

</style>