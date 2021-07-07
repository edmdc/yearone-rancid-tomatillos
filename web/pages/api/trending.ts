import { NextApiRequest, NextApiResponse } from "next"
import TmdbClient from "@/lib/api/tmdbClient"

export default async function trendingMoviesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const tmdbClient = new TmdbClient()
  try {
    const data = await tmdbClient.getTrendingMovies()
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}
