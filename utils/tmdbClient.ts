import axios, { AxiosInstance } from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export interface Movie {
  poster_path?: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path?: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
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

  async getLatestReleases() {
    try {
      const { data } = await this.client.get(
        '/discover/movie?language=en-US&sort_by=release_date.desc',
      )
      return data
    } catch (error) {
      return error
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

  async getConfig() {
    try {
      const { data } = await this.client.get('/configuration')
      return data
    } catch (error) {
      return error
    }
  }
}
