import TmdbClient from "@/lib/api/tmdbClient"
import { NextApiRequest, NextApiResponse } from "next"

export default async function creditsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { query } = req.query
  const tmdbClient = new TmdbClient()
  try {
    const data = await tmdbClient.searchMovies(String(query))
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}
