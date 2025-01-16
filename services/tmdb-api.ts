import axios, {AxiosHeaders, AxiosResponse} from 'axios';
import type { TMDBSearchResult } from '~/types';

const BASE_URI: string = `https://api.themoviedb.org/3/`;

export function searchTMDBMovies(searchTerm:string, token:string): Promise<TMDBSearchResult> {
    const url: string = `${BASE_URI}search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`;
    const headers: AxiosHeaders = {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
    }

    return axios.get(url, { headers })
        .then((res:AxiosResponse) => res.data);
}