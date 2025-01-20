<script setup lang="ts">
import Bubble from '~/components/charts/bubble.vue';
import { useUtilStore } from "~/store/utils";
import type { MovieRating, RatingPoint } from '~/types';
import type { TooltipItem, ChartType, ChartData, ChartOptions } from 'chart.js';

const { ratings=[] } = defineProps({
  ratings: Array as PropType<MovieRating[]>
});

const $utils = useUtilStore();

const points = computed<RatingPoint[]>(() => {
  let pts: RatingPoint[] = [];

  ratings.forEach((rating:MovieRating) => {
    let newPt = {
      label: '',
      titles: [ rating.title ],
      r: 5,
      x: rating.s,
      y: rating.e,
    };
    let exPt = pts.find((pt:RatingPoint) => {
      return pt.x === newPt.x && pt.y === newPt.y;
    });

    if (!exPt) {
      newPt.label = newPt.titles.join('\n');
      pts.push(newPt);
    } else {
      exPt.titles.push(newPt.titles[0]);
      exPt.titles.sort((a,b) => a > b ? 1 : -1);
      const sizeIncrease: number = $utils.activeBreakpoint === 'xs' ? .1 : .5;
      exPt.r = 5 + ((exPt.titles.length - 1) * sizeIncrease);
    }
  });

  return pts;
});

const chartData = computed((): ChartData => ({
  labels: [ '' ],
  datasets: [
    {
      label: 'Movie Ratings',
      backgroundColor: $utils.colors.orange[300],
      data: points.value,
    }
  ],
}));

const axisOptions = (label:string) => {
  return {
    grid: {
      color: $utils.colors.gray[700],
      display: true,
    },
    min: 0,
    max: 10,
    title: {
      display: true,
      color: $utils.colors.gray[300],
      text: label
    },
    ticks: {
      color: $utils.colors.gray[300],
    },
  }
};

const chartOptions = computed((): ChartOptions => ({
  aspectRatio: 1,
  maintainAspectRatio: true,
  responsive: true,
  scales: {
    x: axisOptions('Story'),
    y: axisOptions('Entertainment'),
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      enabled: true,
      callbacks: {
        label: (tooltipItem: TooltipItem<ChartType>) => {
          return points.value[tooltipItem.dataIndex].titles;
        },
      },
    },
  },
}));
</script>

<template>
<Bubble :data="chartData" :options="chartOptions" />
</template>

<style scoped>

</style>