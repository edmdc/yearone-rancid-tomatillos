import { NextApiRequest, NextApiResponse } from "next"
import { tmdbAxios } from "@/lib/api/tmdbClient"

export default async function trendingMoviesHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data } = await tmdbAxios.get("/trending/movie/day")
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}
