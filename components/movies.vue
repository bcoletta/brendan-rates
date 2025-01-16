<script setup lang="ts">
import MovieChart from "~/components/movie-chart.vue";
import { getMovies } from "~/services/movies";
import type { MovieRating } from "~/types";

const movieRatings = ref<MovieRating[]>([]);

const hasData = computed<boolean>(() => {
  return movieRatings.value.length > 0;
})

const getMovieData = () => {
  getMovies().then((ratings: MovieRating[]) => {
    movieRatings.value = [ ...ratings ]
        .sort((a,b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
    console.log('e type', typeof movieRatings.value[0].e)
  });
};

onMounted(getMovieData);
</script>

<template>
  <!-- TODO - Masthead -->
  <div v-if="hasData" class="w-fit mx-auto grid grid-cols-1 md:grid-cols-3">
    <div class="xl:max-h-[90vh] md:col-span-2">
      <movie-chart :ratings="movieRatings"/>
    </div>
    <div class="md:h-[90vh] overflow-y-auto">
      <!-- TODO - List component -->
      <!-- TODO - Search -->
      <div
        v-for="rating in movieRatings"
        :key="rating.id"
        class="grid grid-cols-3 border-b p-2 bg-slate-800 text-gray-300"
      >
        <div class="col-span-2">
          <div class="font-semibold text-lg" :title="rating.title">{{ rating.title }}</div>
          <div class="text-sm">{{ rating.date }}</div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="border rounded flex justify-center items-center relative">
            <span class="text-lg font-semibold">{{ rating.e }}</span>
            <!-- TODO - Responsiveness -->
            <div class="absolute -bottom-[.4rem] text-xs px-1 bg-slate-800">Entertainment</div>
          </div>
          <div class="border rounded flex justify-center items-center relative">
            <span class="text-lg font-semibold">{{ rating.s }}</span>
            <div class="absolute -bottom-[.4rem] text-xs px-1 bg-slate-800">Story</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>