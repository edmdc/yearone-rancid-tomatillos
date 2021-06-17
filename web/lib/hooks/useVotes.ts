import useSWR, { mutate } from "swr"

const fetcher = async (url) => {
  const res = await fetch(url)

  if (!res.ok) {
    const error = new Error(`${res.status} - ${res.statusText}`)
    throw error
  }

  return res.json()
}

const useVotes = (movieId) => {
  let errorCatch
  const { data, error } = useSWR(
    `http://localhost:8081/v1/ratings/${movieId}`,
    fetcher,
  )

  const voteOnMovie = async (vote: "upvote" | "downvote") => {
    try {
      const res = await fetch(
        `http://localhost:8081/v1/ratings/${movieId}/${vote}`,
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
        `http://localhost:8081/v1/ratings/${movieId}`,
        voteOnMovie("upvote"),
      ),
    downVote: () =>
      mutate(
        `http://localhost:8081/v1/ratings/${movieId}`,
        voteOnMovie("downvote"),
      ),
    loading: !data && !error,
    error: error || errorCatch,
  }
}

export default useVotes
