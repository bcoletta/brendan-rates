import axios from 'axios';
import type { RawAxiosRequestHeaders, AxiosResponse } from 'axios';
import type { TMDBDetailsResult, TMDBSearchResult } from '~/types';

const BASE_URI: string = `https://api.themoviedb.org/3/`;

const HEADERS = (token:string): RawAxiosRequestHeaders => ({
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
});

export function searchTMDBMovies(searchTerm:string, token:string): Promise<TMDBSearchResult> {
    const url: string = `${BASE_URI}search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;

    return axios.get(url, { headers: HEADERS(token) })
        .then((res:AxiosResponse) => res.data);
}

export const fetchTMDBMovieDetails = (tmdbId:number, token:string): Promise<TMDBDetailsResult> => {
    const url: string = `${BASE_URI}movie/${tmdbId}?append_to_response=credits`; //?append_to_response=credits

    return axios.get(url, { headers: HEADERS(token) })
        .then((res:AxiosResponse) => res.data);
}