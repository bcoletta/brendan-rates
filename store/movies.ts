import { defineStore } from 'pinia';
import type {MovieRating, StoreGetterArgs} from '~/types/types';
import { getMovies } from '~/services/movies';

export const useMovieStore = defineStore('movies', () => {
  const ratings = ref<MovieRating[]>([]);

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

    return getMovies().then((mr: MovieRating[]) => {
      ratings.value = [ ...mr ];
      return sortMovieRatings(filterMovieRatings(mr, filter), sort);
    });
  };

  return { ratings, getMovieRatings };
});