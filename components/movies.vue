<script setup lang="ts">
import BcLoader from "~/components/bc-design-system/bc-loader.vue";
import BcTabs from "~/components/bc-design-system/bc-tabs.vue";
import MovieChart from '~/components/movie-chart.vue';
import MovieList from "~/components/movie-list.vue";
import { useMovieStore } from '~/store/movies';
import type {MovieRating, Tab, TabList} from '~/types';

const $movies = useMovieStore();

const movieRatings = ref<MovieRating[]>([]);
const sort = ref<string>('date');
const tabs = ref<TabList>({
  tabs: [
    { id: 1, name: 'Ratings', active: true },
    { id: 2, name: 'Stats', active: false },
  ],
});

const activeTabId = computed((): number => {
  return tabs.value.tabs.find(t => t.active)?.id || tabs.value.tabs[0].id;
});

const hasData = computed(():boolean => {
  return movieRatings.value.length > 0;
});

const getMovieData = (filter:string='') => {
  $movies.getMovieRatings({ filter, sort: sort.value })
    .then((res: MovieRating[]) => movieRatings.value = res);
};

const filter = (searchTerm:string) => {
  getMovieData(searchTerm);
};

const setActiveTab = (tab: Tab) => {
  tabs.value.tabs.forEach((t: Tab) => {
    t.active = t.id === tab.id;
  });
}

onMounted(getMovieData);
</script>

<template>
  <!-- TODO - Masthead -->
  <div v-if="$movies.loading" class="w-full mt-4 flex justify-center">
    <bc-loader />
  </div>

  <div v-else-if="hasData" class="container mx-auto">
    <bc-tabs :tabs="tabs" @select="setActiveTab" />

    <!-- TODO - Move to movie-ratings component -->
    <template v-if="activeTabId === 1">
      <div class="grid grid-cols-1 lg:grid-cols-3">
        <div class="xl:max-h-[90vh] lg:col-span-2">
          <movie-chart :ratings="movieRatings" />
        </div>
        <div class="lg:h-[90vh] overflow-y-auto">
          <movie-list :ratings="movieRatings" @search="filter" />
        </div>
      </div>
    </template>

    <!-- TODO - Move to movie-stats component -->
    <template v-if="activeTabId === 2">
      Stats
    </template>

  </div>
</template>

<style scoped>

</style>