import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import Header from "@/components/layout/Header"
import {
  MovieContainer,
  MovieInfo,
  MoviePoster,
  MovieText,
  MovieTitle,
  Tagline,
} from "@/components/movies/MovieDetails"
import Ratings from "@/components/movies/Ratings"
import { H2, H4 } from "@/styles/typography"
import TmdbClient, { Movie } from "@/lib/api/tmdbClient"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Footer from "@/components/layout/Footer"

type Votes = {
  upVotes: number
  downVotes: number
}

type Errors = {
  tmdb?: string
  ratings?: string
}

interface SingleMovieProps {
  movie: Movie
  errors?: Errors
}

const rootImgSrc = "https://image.tmdb.org/t/p/w500"
const formatRuntime = (runtime: number): string => {
  const hrs = Math.floor(runtime / 60)
  const min = runtime % 60
  return hrs ? `${hrs}h ${min}m` : `${min}m`
}

const initialVotes: Votes = {
  upVotes: 0,
  downVotes: 0,
}

export default function SingleMovieModal({ movie, errors }: SingleMovieProps) {
  const router = useRouter()
  const { movieId } = router.query
  const [movieVotes, updateVotes] = useState<Votes>(initialVotes)
  const [voteError, setError] = useState("")

  useEffect(() => {
    const findMovieVotes = async () => {
      try {
        const res2 = await fetch(`http://localhost:8081/v1/ratings/${movieId}`)
        const { UpVotes, DownVotes } = await res2.json()
        updateVotes(() => ({ upVotes: UpVotes, downVotes: DownVotes }))
      } catch (err) {
        console.log(err)
      }
    }
    findMovieVotes()
  }, [])

  const upVoteMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/v1/ratings/${movieId}/upvote`,
        {
          method: "POST",
        },
      )
      const { UpVotes } = await res.json()
      updateVotes(() => ({ ...movieVotes, upVotes: UpVotes }))
    } catch (err) {
      setError(`${err.message}. Could not record your vote. Sorry!`)
    }
  }

  const downVoteMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/v1/ratings/${movieId}/downvote`,
        {
          method: "POST",
        },
      )
      const { DownVotes } = await res.json()
      updateVotes(() => ({ ...movieVotes, downVotes: DownVotes }))
    } catch (err) {
      setError(`${err.message}. Could not record your vote. Sorry!`)
    }
  }

  useEffect(() => {
    if (voteError !== "") {
      alert(voteError)
      setError("")
    }
  }, [voteError])

  return (
    <div>
      <Header />
      <MovieContainer backDropUrl={movie?.backdrop_path}>
        <MoviePoster>
          <Image
            src={rootImgSrc + movie?.poster_path}
            alt={`Movie Poster for ${movie?.title}`}
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </MoviePoster>
        <MovieInfo>
          <MovieTitle>
            <H2>
              {movie?.title}
              <span>({new Date(movie?.release_date).getFullYear()})</span>
            </H2>
            <MovieText>
              {movie?.genres?.map((genre) => genre.name).join(", ")} ●{" "}
              {formatRuntime(movie?.runtime)}
            </MovieText>
          </MovieTitle>
          <Ratings
            upVotes={movieVotes?.upVotes}
            downVotes={movieVotes?.downVotes}
            upVoteMovie={upVoteMovie}
            downVoteMovie={downVoteMovie}
          />
          {errors?.ratings && <span>{errors.ratings}</span>}
          <Tagline>{movie?.tagline}</Tagline>
          <H4>Overview</H4>
          <MovieText>{movie?.overview}</MovieText>
        </MovieInfo>
      </MovieContainer>
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tmdbClient = new TmdbClient()
  const { movieId } = context.params
  const errors = {
    tmdb: null,
    ratings: null,
  }
  let movieData: Movie

  try {
    const data = await tmdbClient.getSingleMovie(
      Number.parseInt(String(movieId), 10),
    )
    movieData = data
  } catch (err) {
    errors.tmdb = err.message
  }

  return {
    props: {
      movie: movieData,
      error: errors,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})
