<script setup lang="ts">
import BcSelect from '~/components/bc-design-system/bc-select.vue';
import BcLoader from '~/components/bc-design-system/bc-loader.vue';
import { useMovieStore } from '~/store/movies';
import type { MovieReportStats, PropItem } from '~/types';
import BcStat from "~/components/bc-design-system/bc-stat.vue";
import TopTen from "~/components/movies/stats/top-ten.vue";
import MoviesByYear from "~/components/movies/stats/movies-by-year.vue";
import AveragesByYear from '~/components/movies/stats/averages-by-year.vue';
import MoviesByMonth from '~/components/movies/stats/movies-by-month.vue';

const $movies = useMovieStore();

const activeYear = ref<string>('overall');

const activeStats = computed((): MovieReportStats => {
  if (activeYear.value === 'overall') return $movies.report.overall;

  const foundYr: (MovieReportStats|undefined) =
    $movies.report.years.find((yr:MovieReportStats) =>
      (parseInt(<string>yr.year) === parseInt(activeYear.value))
    );

  return foundYr || { avg_e: 0, avg_s: 0, total: 0 };
});

const yearOptions = computed(():PropItem[] => {
  const optArr:PropItem[] = $movies.report.years.map((yr:MovieReportStats) => {
    return {
      text: <string>yr.year,
      value: <string>yr.year,
    };
  });

  optArr.unshift({ text: 'All', value: 'overall' });

  return optArr;
});

const getStats = () => {
  $movies.getMovieStats({});
}

onMounted(getStats);
</script>

<template>
  <div v-if="$movies.loading" class="w-full mt-4 flex justify-center">
    <bc-loader />
  </div>

  <template v-else>
    <div class="w-full md:w-1/2 lg:w-1/4 mx-auto">
      <bc-select :items="yearOptions" label="Filter by Year" v-model="activeYear" />
    </div>

    <hr class="my-4 border-slate-500" />

    <div>
      <div class="flex justify-around">
        <div class="h-16 w-24">
          <bc-stat label="Total" text-size="text-2xl" :value="activeStats.total" />
        </div>

        <div class="h-16 w-32">
          <bc-stat
            label="Avg Entertainment"
            text-size="text-2xl"
            title="Average Entertainment"
            :value="activeStats.avg_e.toFixed(2)"
          />
        </div>

        <div class="h-16 w-24">
          <bc-stat
            label="Avg Story"
            text-size="text-2xl"
            title="Average Story"
            :value="activeStats.avg_s.toFixed(2)"
          />
        </div>
      </div>

      <hr class="my-4 border-slate-500" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div class="grid grid-cols-1 md:grid-cols-2 md:col-span-2">
          <div>
            <movies-by-year v-if="activeYear === 'overall'" :years="$movies.report.years" />
            <movies-by-month v-else :year="activeStats" />
          </div>
          <div>
            <averages-by-year v-if="activeYear === 'overall'" :years="$movies.report.years" />
            <!-- TODO - second year chart -->
          </div>
        </div>

        <div class="bg-slate-800 text-gray-300">
          <top-ten :time-span="activeYear" :top-ten="activeStats.topTen" />
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>

</style>