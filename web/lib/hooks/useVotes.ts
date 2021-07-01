import useSWR, { mutate } from "swr"
import fetcher from "../utils/fetcher"

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://rancid-tomatillos-api-v7ekia46ga-uc.a.run.app"
    : "http://localhost:8081"

const useVotes = (movieId: string) => {
  let errorCatch: string
  const { data, error } = useSWR(`${apiUrl}/v1/ratings/${movieId}`, fetcher)

  const voteOnMovie = async (vote: "upvote" | "downvote") => {
    try {
      const res = await fetch(`${apiUrl}/v1/ratings/${movieId}/${vote}`, {
        method: "POST",
      })
      const updatedRating = await res.json()
      return updatedRating
    } catch (err) {
      errorCatch = err
      return err
    }
  }

  return {
    votes: {
      upVotes: data?.upVotes ?? 0,
      downVotes: data?.downVotes ?? 0,
    },
    upVote: () =>
      mutate(`${apiUrl}/v1/ratings/${movieId}`, voteOnMovie("upvote")),
    downVote: () =>
      mutate(`${apiUrl}/v1/ratings/${movieId}`, voteOnMovie("downvote")),
    loading: !data && !error,
    error: error || errorCatch,
  }
}

export default useVotes
