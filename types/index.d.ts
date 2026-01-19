import { DTMDBGender } from '~/constants';

type Modify<T, R> = Omit<T, keyof R> & R;

// TODO - Move Design System types to their own .d.ts
export interface PropItem {
    text?: string
    value: string|number
}

export interface DropdownItem {
    image?: string;
    text: string;
    value: number;
}

export interface NotificationAction {
    route?: string
}

export interface NotificationType {
    message: string
    id?: number
    timeout?: number
    color?: string
    action?: NotificationAction
}

export interface Tab {
    id: number,
    name: string,
    active: boolean,
}

export interface TabListConfig {
    bgColor?: string,
    borderColor?: string,
    tabBgColor?: string,
    tabBorderColor?: string,
    activeTabBgColor?: string,
    activeTabBorderColor?: string,
}

export interface TabList {
    tabs: Tab[],
    config?: TabListConfig,
}

/*** END DESIGN SYSTEM ***/

export interface TMDBCastMember {
    adult: boolean
    gender: DTMDBGender
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    cast_id: number
    character: string
    credit_id: string
    order: number
}

export interface TMDBCrewMember {
    adult: boolean
    gender: DTMDBGender
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
    credit_id: string
    department: string
    job: string
}

export interface TMDBCollection {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string,
}

export interface TMDBCountry {
    iso_3166_1: string
    name: string
}

export interface TMDBGenre {
    id: number,
    name: string,
}

export interface TMDBLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

export interface TMDBMovie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface TMDBProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

export interface TMDBCreditsResult {
    id?: number
    cast: TMDBCastMember[]
    crew: TMDBCrewMember[]
}

export interface TMDBDetailsResult {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: TMDBCollection | null
    budget: integer
    credits?: TMDBCreditsResult
    genres: { id: number; name: string }[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: TMDBProductionCompany[]
    production_country: TMDBCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: TMDBLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface TMDBSearchResult {
    page: number
    results: TMDBMovie[]
    total_pages: number
    total_results: number
}

export interface BaseMovieRating {
    e: number
    s: number
}

export interface MovieRating {
    avg?: number
    date: string
    s: number
    id: string
    e: number
    tmdbId: number
    title: string
    collection?: TMDBCollection
    genres?: TMDBGenre[]
}

export interface Movie {
    rating: MovieRating
    details: TMDBDetailsResult
}

export type ApiMovieRating = Modify<MovieRating, {
    e: string
    s: string
    collection?: string
    genres?: string
}>

export interface RatingPoint {
    label: string
    titles: string[]
    r: number
    x: number
    y: number
}

export interface AddMovieBody {
    password: string
    title: string
    tmdbId: number
    e: number
    s: number
    date: string
    review?: string
}

export interface StoreGetterArgs {
    filter?: string,
    force?: boolean,
    sort?: string,
}

export interface MovieReportStats {
    avg_e: number
    avg_s: number
    byMonth?: {
        [key: string]: MovieReportStats
    }
    topTen?: MovieRating[]
    total: number
    year?: string
}

export interface TopTenStats {
    avg: number
    id: string
    rank: number
    title: string
}

export interface MovieReport {
    overall: MovieReportStats
    years: MovieReportStats[]
}

export interface MovieGenre {
    id: number
    name: string
    count: number
}

export interface MovieCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
    count: number
}

export interface MovieFilters {
    title?: string
    genre?: number
    collection?: number
}