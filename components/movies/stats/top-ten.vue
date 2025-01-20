<script setup lang="ts">
import type {MovieRating, TopTenStats} from '~/types';

const { timeSpan, topTen } = defineProps({
  timeSpan: String,
  topTen: {
    type: Array as PropType<MovieRating[]>,
    default: []
  }
});

const topTenWithRanks = computed((): TopTenStats[] => {
  let rank: number = 1;
  let prevAvg: number = 0;
  let returnItems: TopTenStats[] = [];

  topTen.forEach((item: MovieRating, i: number) => {
    let currentAvg: number = <number>item.avg;

    if (prevAvg && currentAvg !== prevAvg) rank = i + 1;

    prevAvg = currentAvg;

    returnItems.push({
      avg: currentAvg,
      id: item.id,
      rank,
      title: item.title,
    });
  });

  return returnItems;
});
</script>

<template>
  <div class="p-4">
    <div class="flex justify-between font-semibold text-lg">
      <div class="capitalize">{{timeSpan}} Top Ten</div>
      <div>Avg</div>
    </div>
    <div v-for="mv in topTenWithRanks" :key="mv.id" class="flex justify-between">
      <div>{{ mv.rank }}. {{ mv.title }}</div>
      <div>{{ mv.avg }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>