<script setup lang="ts">
import Bubble from '~/components/charts/bubble.vue';
import { useMovieStore } from '~/store/movies';
import { useUtilStore } from "~/store/utils";
import type { MovieRating, RatingPoint } from '~/types';
import type { TooltipItem, ChartType, ChartData, ChartOptions, ScriptableContext, BubbleDataPoint } from 'chart.js';

const { ratings=[] } = defineProps({
  ratings: Array as PropType<MovieRating[]>
});

const $movies = useMovieStore();
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
      backgroundColor: function(ctx: ScriptableContext<'bubble'>) {
        const idx: number = ctx.dataIndex;
        const val: BubbleDataPoint = ctx.dataset.data[idx];

        return getBackgroundColor(val);
      },
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

const getBackgroundColor = (pt: BubbleDataPoint): string => {
  if (!pt?.x || !pt?.y) return $utils.colors.white;

  const xDistance: number = (pt.x - $movies.avgMovie.s) ** 2; // '** 2' is ES6 syntax for x^2
  const yDistance: number = (pt.y - $movies.avgMovie.e) ** 2;
  const distance: number = Math.sqrt(xDistance + yDistance);

  if (distance === 0) return $utils.colors.orange[500];
  if (distance < 1) return $utils.colors.orange[400];
  if (distance < 2) return $utils.colors.orange[300];
  if (distance < 3) return $utils.colors.orange[200];
  if (distance < 4) return $utils.colors.orange[100];

  return $utils.colors.white;
};

const getStats = () => {
  $movies.getMovieStats({});
}

onBeforeMount(getStats);
</script>

<template>
<Bubble :data="chartData" :options="chartOptions" />
</template>

<style scoped>

</style>