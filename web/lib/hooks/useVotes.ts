import useSWR, { mutate } from "swr"
import fetcher from "../utils/fetcher"

const useVotes = (movieId: string) => {
  let errorCatch: string
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/ratings/${movieId}`,
    fetcher,
  )

  const voteOnMovie = async (vote: "upvote" | "downvote") => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/ratings/${movieId}/${vote}`,
        {
          method: "POST",
        },
      )
      const updatedRating = await res.json()
      return updatedRating
    } catch (err) {
      errorCatch = err
    }
  }

  return {
    votes: {
      upVotes: data?.upVotes ?? 0,
      downVotes: data?.downVotes ?? 0,
    },
    upVote: () =>
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/ratings/${movieId}`,
        voteOnMovie("upvote"),
      ),
    downVote: () =>
      mutate(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/ratings/${movieId}`,
        voteOnMovie("downvote"),
      ),
    loading: !data && !error,
    error: error || errorCatch,
  }
}

export default useVotes
