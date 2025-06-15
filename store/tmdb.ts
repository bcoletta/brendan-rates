import { DStoreError } from '~/constants';
import type { TMDBDetailsResult } from '~/types';
import { fetchTMDBMovieDetails } from '~/services/tmdb-api';

export const useTMDBStore = defineStore('tmdb', () => {
  const $config = useRuntimeConfig();

  const movies = ref<TMDBDetailsResult[]>([]);
  const pendingMovies = ref<number[]>([]);

  const getMovieDetails = (tmdbId: number): Promise<TMDBDetailsResult> => {
    const existingMovie: TMDBDetailsResult|undefined = movies.value.find((m: TMDBDetailsResult) => m.id === tmdbId);
    if (existingMovie) return Promise.resolve(existingMovie);

    const isPending: boolean = pendingMovies.value.includes(tmdbId);
    if (isPending) return Promise.reject(DStoreError.RETRY);

    pendingMovies.value.push(tmdbId);

    return fetchTMDBMovieDetails(tmdbId, $config.public.tmdbToken).then((dtls: TMDBDetailsResult): TMDBDetailsResult => {
      const idx: number = pendingMovies.value.indexOf(tmdbId);
      pendingMovies.value.splice(idx, 1);
      movies.value.push(dtls);

      return dtls;
    });
  };

  return { getMovieDetails };
});