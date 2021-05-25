import { NextApiRequest, NextApiResponse } from 'next'
import tmdbClient from '../../../utils/tmdbClient'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await tmdbClient.get(
      '/discover/movie?language=en-US&sort_by=release_date.desc',
    )
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
