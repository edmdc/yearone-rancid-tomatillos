import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import {
  MovieContainer,
  MovieInfo,
  MoviePoster,
  MovieText,
  MovieTitle,
  Tagline,
} from '@/components/movies/MovieDetails'
import Ratings from '@/components/movies/Ratings'
import { H2, H4 } from '@/styles/typography'
import { Movie } from '@/lib/api/tmdbClient'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Footer from '@/components/layout/Footer'

type Votes = {
  UpVotes: number
  DownVotes: number
}

type Errors = {
  tmdb?: string
  ratings?: string
}

interface SingleMovieProps {
  movie: Movie
  votes: Votes
  errors?: Errors
}

const rootImgSrc = 'https://image.tmdb.org/t/p/w500'
const formatRuntime = (runtime: number): string => {
  const hrs = Math.floor(runtime / 60)
  const min = runtime % 60
  return hrs ? `${hrs}h ${min}m` : `${min}m`
}

export default function SingleMovieModal({
  movie,
  votes,
  errors,
}: SingleMovieProps) {
  const router = useRouter()
  const { query } = router
  const [movieVotes, updateVotes] = useState<Votes>(votes)
  const [voteError, setError] = useState('')

  const upVoteMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/v1/ratings/${query.movieId}/upvote`,
        {
          method: 'POST',
        },
      )
      const { UpVotes } = await res.json()
      updateVotes(() => ({ ...movieVotes, UpVotes }))
    } catch (err) {
      setError(`${err.message}. Could not record your vote. Sorry!`)
    }
  }

  const downVoteMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:8081/v1/ratings/${query.movieId}/downvote`,
        {
          method: 'POST',
        },
      )
      const { DownVotes } = await res.json()
      updateVotes(() => ({ ...movieVotes, DownVotes }))
    } catch (err) {
      setError(`${err.message}. Could not record your vote. Sorry!`)
    }
  }

  useEffect(() => {
    if (voteError !== '') {
      alert(voteError)
      setError('')
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
              {movie?.genres.map((genre) => genre.name).join(', ')} ●{' '}
              {formatRuntime(movie?.runtime)}
            </MovieText>
          </MovieTitle>
          <Ratings
            upVotes={movieVotes?.UpVotes}
            downVotes={movieVotes?.DownVotes}
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
  const { movieId } = context.params
  let votes: Votes = {
    UpVotes: 0,
    DownVotes: 0,
  }
  let errors = {
    tmdb: null,
    ratings: null,
  }
  let movieData: Movie

  try {
    const res = await fetch(`http://localhost:8080/api/movies/${movieId}`)
    const data = await res.json()
    movieData = data
  } catch (err) {
    errors.tmdb = err.message
  }

  try {
    const res2 = await fetch(`http://localhost:8081/v1/ratings/${movieId}`)
    const { UpVotes, DownVotes } = await res2.json()
    votes = { UpVotes, DownVotes }
  } catch (err) {
    errors.ratings = err.message
  }

  return {
    props: {
      movie: movieData,
      error: errors,
      votes,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})
