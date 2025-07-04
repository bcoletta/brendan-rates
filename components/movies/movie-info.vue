<script setup lang="ts">
import type { TMDBCastMember, TMDBCrewMember, TMDBDetailsResult, TMDBGenre } from '~/types';
import { DStoreError } from '~/constants';
import BcLoader from '~/components/bc-design-system/bc-loader.vue';
import { useTMDBStore } from '~/store/tmdb';
import { format } from '@formkit/tempo';

const props = defineProps({
  tmdbId: { type: Number, default: -1 },
});

const $tmdb = useTMDBStore();

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/'; // TODO - Load from configuration endpoint

const loading = ref<boolean>(true);
const movieInfo = ref<TMDBDetailsResult>();

const joinWithCommasAndAmpersand = (arr: string[]): string => {
  if (!arr?.length) return '';

  if (arr.length === 1) return arr[0];

  if (arr.length === 2) return arr.join(' & ');

  const lastItem: string = <string>arr.pop();

  return `${arr.join(', ')}, & ${lastItem}`;
};

const director = computed((): string => {
  if (!movieInfo.value || !movieInfo.value.credits) return '-';

  const directors: TMDBCrewMember[] = movieInfo.value.credits.crew.filter((c: TMDBCrewMember) => c.job.toLowerCase() === 'director');
  const directorNames: string[] = directors.map((d: TMDBCrewMember) => d.name);

  return directorNames.length === 0 ? '-' : joinWithCommasAndAmpersand(directorNames);
});

const genres = computed((): string => {
  if (!movieInfo.value || !movieInfo.value.genres) return '-';

  const genres: string[] = movieInfo.value.genres.map((g: TMDBGenre) => g.name);

  return genres.length === 0 ? '-' : genres.join(', ');
});

const runtime = computed((): string => {
  if (!movieInfo.value?.runtime) return '-';

  const hours = Math.floor(movieInfo.value.runtime / 60);
  const minutes = movieInfo.value.runtime % 60;

  return `${hours}h ${minutes}m`;
})

const topCast = computed((): TMDBCastMember[] => {
  if (!movieInfo.value || !movieInfo.value.credits) return [];

  return movieInfo.value.credits.cast.filter(cm => cm.order < 5);
});

const getMovieInfo = () => {
  loading.value = true;
  $tmdb.getMovieDetails(props.tmdbId)
    .then((dtls: TMDBDetailsResult) => {
      movieInfo.value = dtls;
      loading.value = false;
    })
    .catch((err: DStoreError) => {
      if (err === DStoreError.RETRY) {
        setTimeout(() => getMovieInfo(), 100);
      }
    });
};

watch(
    () => props.tmdbId,
    () => {
      console.log('movie-info:9 - LOADING...');
      if (props.tmdbId > -1) getMovieInfo();
    },
    { immediate: true }
)
</script>

<template>
  <div v-if="loading" class="w-full h-full flex justify-center align-center">
    <bc-loader />
  </div>
  <div v-else-if="movieInfo">
    <div class="flex flex-col-reverse sm:flex-row gap-6">
      <div class="flex flex-col gap-2">
        <div>{{ format(movieInfo.release_date, 'MMM D, YYYY') }} - {{ runtime }} - {{ genres }}</div>

        <div class="italic text-lg">{{ movieInfo.tagline }}</div>

        <div>{{ movieInfo.overview }}</div>
      </div>

      <div class="flex-shrink-0 flex flex-col align-center">
        <img :src="`${BASE_IMG_URL}w185${movieInfo.poster_path}`" class="flex-shrink-0 flex-grow-0 mb-2" />
      </div>
    </div>

    <div class="mt-2 py-2 border-t border-solid border-sky-900 text-lg font-semibold">
      Directed By: {{ director }}
    </div>

    <div class="pt-2 border-t border-solid border-sky-900 text-lg font-semibold">Starring:</div>
    <div class="flex flex-wrap gap-2 align-center justify-between">
      <div v-for="cm in topCast" :key="cm.id" class="flex flex-col items-center">
        <img :src="`${BASE_IMG_URL}original/${cm.profile_path}`" class="h-48">
        {{ cm.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>