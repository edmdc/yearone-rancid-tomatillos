import useSWR from "swr"
import { Crew } from "../api/tmdbClient"
import fetcher from "../utils/fetcher"

const useCredits = (movieId: string) => {
  const { data, error } = useSWR(`/api/credits/${movieId}`, fetcher)

  const crewCopy = data?.crew?.reduce((acc: Crew[], member: Crew) => {
    if (member.job === "Director") {
      acc.unshift(member)
      return acc
    }
    acc.push(member)
    return acc
  }, [])

  return {
    cast: data?.cast,
    crew: crewCopy ?? [],
    loading: !data || !error,
    error,
  }
}

export default useCredits
