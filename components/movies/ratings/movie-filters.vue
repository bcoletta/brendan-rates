<script setup lang="ts">
import { useMovieStore } from '~/store/movies';
import type { MovieCollection, MovieGenre, PropItem } from '~/types';
import BcSelect from '~/components/bc-design-system/bc-select.vue';

const $movies = useMovieStore();

const expanded = ref<boolean>(false);

const genreValue = computed((): number => {
  return $movies.filters.genre || -1;
});

const collectionValue = computed((): number => {
  return $movies.filters.collection || -1;
});

const hasFilters = computed((): boolean => {
  return !!$movies.filters.title || !!$movies.filters.genre || !!$movies.filters.collection;
});

const genreOptions = computed((): PropItem[] => {
  if (!$movies.genres.length) return [];

  const genres = $movies.genres.map((g: MovieGenre) => ({ text: `${g.name} (${g.count})`, value: g.id }));

  return [
    { text: '-', value: -1 },
      ...genres,
  ];
});

const collectionOptions = computed((): PropItem[] => {
  if (!$movies.collections.length) return [];

  const collections = $movies.collections.map((c: MovieCollection) => ({ text: `${c.name} (${c.count})`, value: c.id }));

  return [
    { text: '-', value: -1 },
      ...collections,
  ];
});

const selectGenre = (val: number) => {
  if (val === -1 || $movies.filters.genre === val) $movies.filters.genre = undefined;
  else $movies.filters.genre = val;
};

const selectCollection = (val: number) => {
  if (val === -1 || $movies.filters.collection === val) $movies.filters.collection = undefined;
  else $movies.filters.collection = val;
};

const clearFilters = () => {
  $movies.filters = {};
};

onMounted(() => {
  $movies.getMovieGenres({ force: false });
  $movies.getMovieCollections({ force: false });
});
</script>

<template>
  <div class="bg-slate-800 px-2 py-2 md:py-0">
    <div class="w-full relative flex flex-col gap-2 md:hidden">
      <div class="absolute -top-2 right-2 text-2xl cursor-pointer" @click="expanded = !expanded">
        {{ expanded ? '-' : '+' }}
      </div>
      <div class="w-full text-center" @click="expanded = !expanded">
        {{ expanded ? 'Collapse' : 'Expand' }} Filters
      </div>

      <template v-if="expanded">
        <bc-select
          :items="genreOptions"
          label="Genre"
          :modelValue="genreValue"
          @update:model-value="selectGenre"
        />

        <bc-select
          :items="collectionOptions"
          label="Collection"
          :modelValue="collectionValue"
          @update:model-value="selectCollection"
        />

        <div v-if="hasFilters" class="text-red-400 font-medium cursor-pointer" @click="clearFilters">
          Clear Filters
        </div>
      </template>
    </div>

    <div class="hidden md:flex items-center gap-4">
      <div>Filters:</div>

        <bc-select
            :items="genreOptions"
            label="Genre"
            :modelValue="genreValue"
            @update:model-value="selectGenre"
        />

        <bc-select
            :items="collectionOptions"
            label="Collection"
            :modelValue="collectionValue"
            @update:model-value="selectCollection"
        />

      <div class="flex-grow"></div>

      <div v-if="hasFilters" class="text-red-400 font-medium cursor-pointer" @click="clearFilters">
        Clear Filters
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>