import { AxiosResponse } from 'axios';
import type { AddMovieBody, MovieRating } from "~/types";
import API from './api';

const baseURI = 'movies';

export const getMovies = (): Promise<MovieRating[]> => {
    return API.get(baseURI)
        .then((res:AxiosResponse) => res.data)
        .catch((err: Error) => err);
};

export const addMovie = (body:AddMovieBody): Promise<AxiosResponse|Error> => {
    return API.put(baseURI, body)
        .then((res:AxiosResponse) => res)
        .catch((err: Error) => err);
};