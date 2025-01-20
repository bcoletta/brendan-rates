<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js';
import { useUtilStore } from '~/store/utils';
import type { MovieReportStats } from '~/types';
import Bar from '~/components/charts/bar.vue';

const { year } = defineProps({
  year: {
    type: Object as PropType<MovieReportStats>,
    default: { avg_e: 0, avg_s: 0, byMonth: {}, total: 0, },
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
  labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
  datasets: [
    {
      label: 'Monthly Movies Watched',
      backgroundColor: $utils.colors.orange[300],
      data: months.value.map((month: MovieReportStats) => month.total),
    },
  ],
}));

const months = computed((): MovieReportStats[] => {
  if (!year.byMonth) return [];

  const defaultMonth: MovieReportStats = { avg_e: 0, avg_s: 0, total: 0 };
  let months: MovieReportStats[] = [];

  for (let i:number=0; i < 12; i++) {
    months.push(year.byMonth[i.toString()] || defaultMonth);
  }

  return months;
});
</script>

<template>
  <div class="w-full px-4">
    <div class="w-full text-center text-lg font-semibold">{{ year.year }} Movies Watched by Month</div>
    <bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>

</style>