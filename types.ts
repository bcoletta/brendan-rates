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

export interface TMDBSearchResult {
    page: number
    results: TMDBMovie[]
    total_pages: number
    total_results: number
}

export interface MovieRating {
    date: string
    s: number
    id: string
    e: number
    tmdbId: number
    title: string
}

export interface PropItem {
    text?: string
    value: string|number
}

export interface DropdownItem {
    image?: string;
    text: string;
    value: number;
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