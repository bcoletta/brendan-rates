import type { AxiosResponse } from 'axios';
import API from './api';
import type {
  AddMovieBody,
  ApiMovieRating,
  MovieCollection,
  MovieGenre,
  MovieRating,
  MovieReport,
} from "~/types";

const baseURI = 'movies';

export const getMovies = (): Promise<MovieRating[]> => {
  return API.get(baseURI)
    .then((res:AxiosResponse|Error) => {
      if (res instanceof Error) return [];

      return res.data.map((movie:ApiMovieRating) => {
          return {
            ...movie,
            e: parseFloat(movie.e),
            s: parseFloat(movie.s),
            collection: movie.collection && JSON.parse(movie.collection),
            genres: movie.genres && JSON.parse(movie.genres),
          };
      });
    })
    .catch((err: Error) => err);
};

export const getMovieReport = (): Promise<MovieReport> => {
  return API.get(`${baseURI}/report`)
    .then((res:AxiosResponse|Error) => {
      if (res instanceof Error) return [];

      return res.data;
    })
    .catch((err: Error) => err);
}

export const addMovie = (body:AddMovieBody): Promise<AxiosResponse|Error> => {
  return API.put(baseURI, body)
    .then((res:AxiosResponse|Error) => res)
    .catch((err: Error) => err);
};

export const getGenres = (): Promise<MovieGenre[]> => {
  return API.get(`${baseURI}/genres`)
    .then((res:AxiosResponse|Error) => {
      if (res instanceof Error) return [];

      return res.data;
    })
    .catch((err: Error) => err);
};

export const getCollections = (): Promise<MovieCollection[]> => {
  return API.get(`${baseURI}/collections`)
    .then((res:AxiosResponse|Error) => {
      if (res instanceof Error) return [];

      return res.data;
    })
    .catch((err: Error) => err);
};