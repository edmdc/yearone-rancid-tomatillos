import { NextApiRequest, NextApiResponse } from 'next'
import TmdbClient from '../../../utils/tmdbClient'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const tmdb = new TmdbClient()
  return tmdb.getSingleMovie(req, res)
}
