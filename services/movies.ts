import type { AxiosResponse } from 'axios';
import API from './api';
import type { AddMovieBody, ApiMovieRating, MovieRating } from "~/types/types";

const baseURI = 'movies';

export const getMovies = (): Promise<MovieRating[]> => {
  return API.get(baseURI)
    .then((res:AxiosResponse|Error) => {
      if (res instanceof Error) return [];

      return res.data.map((movie:ApiMovieRating) => {
          return { ...movie, e: parseFloat(movie.e), s: parseFloat(movie.s) };
      });
    })
    .catch((err: Error) => err);
};

export const addMovie = (body:AddMovieBody): Promise<AxiosResponse|Error> => {
  return API.put(baseURI, body)
    .then((res:AxiosResponse|Error) => res)
    .catch((err: Error) => err);
};