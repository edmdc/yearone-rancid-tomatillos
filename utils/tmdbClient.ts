import axios, { AxiosInstance } from 'axios'

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

  async getConfig() {
    try {
      const { data } = await this.client.get('/configuration')
      return data
    } catch (error) {
      return error
    }
  }
}
