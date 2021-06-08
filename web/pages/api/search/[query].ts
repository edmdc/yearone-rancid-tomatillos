import { NextApiRequest, NextApiResponse } from 'next'
import TmdbClient from '@/lib/api/tmdbClient'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const tmdb = new TmdbClient()
  return tmdb.searchMovies(req, res)
}
