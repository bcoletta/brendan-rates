import { getMovies, getMovieReport, getGenres, getCollections } from '~/services/movies';
import type {
  BaseMovieRating, MovieCollection, MovieFilters,
  MovieGenre,
  MovieRating,
  MovieReport,
  StoreGetterArgs, TMDBGenre,
} from '~/types';

const roundHalf = (num: number): number => {
  return Math.round(num * 2) / 2;
};

export const useMovieStore = defineStore('movies', () => {
  const avgMovie = ref<BaseMovieRating>({ e: 5, s: 5 });
  const collections = ref<MovieCollection[]>([]);
  const genres = ref<MovieGenre[]>([]);
  const loading = ref<boolean>(false);
  const ratings = ref<MovieRating[]>([]);
  const report = ref<MovieReport>({
    overall: { avg_e: 0, avg_s: 0, total: 0 },
    years: [ { avg_e: 0, avg_s: 0, total: 0 } ],
  });

  const filters = ref<MovieFilters>({});
  const sort = ref<string>('date');

  const filteredMovieRatings = computed((): MovieRating[] => {
    return sortMovieRatings(ratings.value.filter((mr: MovieRating) => {
      let titleValid = false;
      let genreValid = false;
      let collectionValid = false;

      if (filters.value.title) {
        titleValid = mr.title.toLowerCase().includes(filters.value.title.toLowerCase());
      } else {
        titleValid = true;
      }

      if (filters.value.genre && mr.genres?.length) {
        genreValid = mr.genres.some((mg: TMDBGenre) => filters.value.genre === mg.id);
      } else {
        genreValid = true;
      }

      if (filters.value.collection && mr.collection) {
        collectionValid = filters.value.collection === mr.collection.id;
      } else if (filters.value.collection && !mr.collection) {
        collectionValid = false;
      } else {
        collectionValid = true;
      }

      return titleValid && genreValid && collectionValid;
    }));
  });

  const sortMovieRatings = (movieRatings: MovieRating[]): MovieRating[] => {
    const sortedArr = [ ...movieRatings ];

    switch (sort.value) {
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

  const clearFilters = () => {
    filters.value = {};
  };

  const getMovieRatings = (
    { force=false }: StoreGetterArgs
  ): Promise<MovieRating[]> => {
    if (!force && ratings.value.length > 0) {
      return Promise.resolve(filteredMovieRatings.value);
    }

    loading.value = true;
    return getMovies().then((mrs: MovieRating[]) => {
      ratings.value = mrs.map((mr: MovieRating) => ({
        ...mr,
        avg: (mr.e + mr.s) / 2,
      }));
      loading.value = false;
      return filteredMovieRatings.value;
    });
  };

  const getMovieStats = ({ force=false }: StoreGetterArgs): Promise<MovieReport> => {
    if (!force && report.value.overall.total > 0) {
      return Promise.resolve(report.value);
    }

    loading.value = true;
    return getMovieReport().then((res:MovieReport) => {
      report.value = res;
      loading.value = false;
      avgMovie.value = {
        e: roundHalf(res.overall.avg_e),
        s: roundHalf(res.overall.avg_s),
      };
      return res;
    });
  };

  const getMovieCollections = ({ force=false }: StoreGetterArgs): Promise<MovieCollection[]> => {
    if (!force && collections.value.length > 0) {
      return Promise.resolve(collections.value);
    }

    loading.value = true;
    return getCollections().then((res:MovieCollection[]) => {
      collections.value = res;
      loading.value = false;
      return res;
    });
  };

  const getMovieGenres = ({ force=false }: StoreGetterArgs): Promise<MovieGenre[]> => {
    if (!force && genres.value.length > 0) {
      return Promise.resolve(genres.value);
    }

    loading.value = true;
    return getGenres().then((res:MovieGenre[]) => {
      genres.value = res;
      loading.value = false;
      return res;
    });
  };

  return { avgMovie, collections, filteredMovieRatings, filters, genres, loading, ratings, report, sort, getMovieCollections, getMovieGenres, getMovieRatings, getMovieStats };
});