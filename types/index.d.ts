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
    avg?: number
    date: string
    s: number
    id: string
    e: number
    tmdbId: number
    title: string
}

export type ApiMovieRating = Modify<MovieRating, {
    s: string
    e: string
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
        0?: MovieReportStats
        1?: MovieReportStats
        2?: MovieReportStats
        3?: MovieReportStats
        4?: MovieReportStats
        5?: MovieReportStats
        6?: MovieReportStats
        7?: MovieReportStats
        8?: MovieReportStats
        9?: MovieReportStats
        10?: MovieReportStats
        11?: MovieReportStats
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