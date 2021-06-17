import TmdbClient from "@/lib/api/tmdbClient"
import { NextApiRequest, NextApiResponse } from "next"

export default async function creditsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { movieId } = req.query
  const tmdbClient = new TmdbClient()
  try {
    const data = await tmdbClient.getMovieCredits(String(movieId))
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}
