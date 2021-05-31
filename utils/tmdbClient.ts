import axios, { AxiosInstance } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

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

export default class TmdbClient {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.themoviedb.org/3',
      timeout: 1200,
      headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
    })
  }

  async getTrendingMovies(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { data } = await this.client.get('/trending/movie/day')
      res.status(200).json(data)
    } catch (error) {
      res.status(error.response.status).json(error)
    }
  }

  async getSingleMovie(req: NextApiRequest, res: NextApiResponse) {
    const { movieId } = req.query
    try {
      const result = await this.client.get(`/movie/${movieId}`)
      res.status(200).json(result.data)
    } catch (err) {
      res.status(err.response.status).json(err)
    }
  }

  async searchMovies(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query
    try {
      const { data } = await this.client.get(`/search/movie?query=${query}`)
      res.status(200).json(data)
    } catch (err) {
      const status = err.message.match(/\b\d{3}\b/g)
      res.status(status).json(err)
    }
  }

  async getConfig() {
    try {
      const { data } = await this.client.get('/configuration')
      return data
    } catch (error) {
      return error
    }
  }
}
