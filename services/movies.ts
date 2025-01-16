import { AxiosResponse } from 'axios';
import type {AddMovieBody, ApiMovieRating, MovieRating} from "~/types";
import API from './api';

const baseURI = 'movies';

export const getMovies = (): Promise<MovieRating[]> => {
    return API.get(baseURI)
        .then((res:AxiosResponse) => {
            return res.data.map((movie:ApiMovieRating) => {
                return { ...movie, e: parseFloat(movie.e), s: parseFloat(movie.s) };
            });
        })
        .catch((err: Error) => err);
};

export const addMovie = (body:AddMovieBody): Promise<AxiosResponse|Error> => {
    return API.put(baseURI, body)
        .then((res:AxiosResponse) => res)
        .catch((err: Error) => err);
};