<script setup lang="ts">
import BcTabs from '~/components/bc-design-system/bc-tabs.vue';
import Masthead from '~/components/masthead.vue';
import MovieRatings from '~/components/movies/ratings/movie-ratings.vue';
import type { Tab, TabList } from '~/types';
import MovieStats from "~/components/movies/stats/movie-stats.vue";

const tabs = ref<TabList>({
  tabs: [
    { id: 1, name: 'Ratings', active: true },
    { id: 2, name: 'Stats', active: false },
  ],
});

const activeTabId = computed((): number => {
  return tabs.value.tabs.find(t => t.active)?.id || tabs.value.tabs[0].id;
});

const setActiveTab = (tab: Tab) => {
  tabs.value.tabs.forEach((t: Tab) => {
    t.active = t.id === tab.id;
  });
}
</script>

<template>
  <masthead class="mt-4" />

  <div class="container mx-auto">
    <hr class="my-4 border-slate-500" />

    <bc-tabs :tabs="tabs" @select="setActiveTab" />

    <movie-ratings v-if="activeTabId === 1" />

    <movie-stats v-if="activeTabId === 2" />

  </div>
</template>

<style scoped>

</style>