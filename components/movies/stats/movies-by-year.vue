<script setup lang="ts">
import type {ChartData, ChartOptions} from 'chart.js';
import Bar from '~/components/charts/bar.vue';
import { useUtilStore } from '~/store/utils';
import type { MovieReportStats } from '~/types';

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
  min: 0,
  ticks: {
    color: $utils.colors.gray[300],
  },
};

const chartOptions: ChartOptions = {
  aspectRatio: 1,
  maintainAspectRatio: true,
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: axisOptions,
    y: axisOptions,
  },
};

const chartData = computed((): ChartData => ({
  labels: years.map((yr: MovieReportStats) => yr.year),
  datasets: [
    {
      label: 'Total Movies Watched',
      backgroundColor: $utils.colors.orange[300],
      data: years.map((yr: MovieReportStats) => yr.total),
    },
  ],
}));
</script>

<template>
  <div class="w-full px-4">
    <div class="w-full text-center text-lg font-semibold">Total Movies Watched by Year</div>
    <bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>

</style>