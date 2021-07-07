import axios, { AxiosInstance } from "axios"

export interface Movie {
  poster_path?: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  genres: { id: number; name: string }[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path?: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
  runtime: number
  tagline?: string
}

interface Person {
  adult?: boolean
  gender?: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
}

export interface Cast extends Person {
  cast_id: number
  character: string
  order: number
}

export interface Crew extends Person {
  department: string
  job: string
}

export interface TmdbResponse {
  page?: number
  results?: Movie[]
  total_pages?: number
  total_results?: number
}

export default class TmdbClient {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: "https://api.themoviedb.org/3",
      timeout: 1200,
      headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
    })
  }

  async getTrendingMovies(): Promise<TmdbResponse> {
    try {
      const { data } = await this.client.get("/trending/movie/day")
      return data
    } catch (error) {
      return error
    }
  }

  async getSingleMovie(movieId: number): Promise<Movie> {
    try {
      const { data } = await this.client.get(`/movie/${movieId}`)
      return data
    } catch (err) {
      return err
    }
  }

  async searchMovies(query: string, page = 1): Promise<TmdbResponse> {
    try {
      const { data } = await this.client.get(
        `/search/movie?query=${encodeURI(query)}&page=${page}`,
      )
      return data
    } catch (err) {
      const status = err.message.match(/\b\d{3}\b/g)
      return status
    }
  }

  async getMovieCredits(movieId: number | string) {
    try {
      const { data } = await this.client.get(`/movie/${movieId}/credits`)
      return data
    } catch (err) {
      return err
    }
  }

  async getConfig() {
    try {
      const { data } = await this.client.get("/configuration")
      return data
    } catch (error) {
      return error
    }
  }
}
