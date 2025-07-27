import { getMovies, getMovieReport } from '~/services/movies';
import type { MovieRating, MovieReport, StoreGetterArgs } from '~/types';

export const useMovieStore = defineStore('movies', () => {
  const loading = ref<boolean>(false);
  const ratings = ref<MovieRating[]>([]);
  const report = ref<MovieReport>({
    overall: { avg_e: 0, avg_s: 0, total: 0 },
    years: [ { avg_e: 0, avg_s: 0, total: 0 } ],
  });

  const filterMovieRatings = (movieRatings: MovieRating[], filter:string): MovieRating[] => {
    if (!filter) return movieRatings;

    return [ ...movieRatings ].filter((mr: MovieRating) => {
      return mr.title.toLowerCase().includes(filter.toLowerCase());
    })
  };

  const sortMovieRatings = (movieRatings: MovieRating[], sort:string='none'): MovieRating[] => {
    const sortedArr = [ ...movieRatings ];

    switch (sort) {
      case 'none':
        return sortedArr;
      case 'date':
        return sortedArr
          .sort((a,b) => new Date(a.date) < new Date(b.date) ? 1 : -1);
      case 'title':
        return sortedArr
          .sort((a,b) => a.title < b.title ? 1 : -1);
      default:
        return sortedArr;
    }
  };

  const getMovieRatings = (
    { filter='', force=false, sort='none' }: StoreGetterArgs
  ): Promise<MovieRating[]> => {
    if (!force && ratings.value.length > 0) {
      return Promise.resolve(sortMovieRatings(filterMovieRatings(ratings.value, filter), sort));
    }

    loading.value = true;
    return getMovies().then((mrs: MovieRating[]) => {
      ratings.value = mrs.map((mr: MovieRating) => ({
        ...mr,
        avg: (mr.e + mr.s) / 2,
      }));
      loading.value = false;
      return sortMovieRatings(filterMovieRatings(ratings.value, filter), sort);
    });
  };

  const getMovieStats = ({ force=false }: StoreGetterArgs): Promise<MovieReport> => {
    loading.value = true;
    return getMovieReport().then((res:MovieReport) => {
      report.value = res;
      loading.value = false;
      return res;
    });
  };

  return { loading, ratings, report, getMovieRatings, getMovieStats };
});