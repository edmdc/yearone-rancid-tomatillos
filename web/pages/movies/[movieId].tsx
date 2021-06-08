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

interface SingleMovieProps {
  movie: Movie
  upVotes: number
  downVotes: number
  error?: string
}

export default function SingleMovieModal({
  movie,
  upVotes,
  downVotes,
  error,
}: SingleMovieProps) {
  const rootImgSrc = 'https://image.tmdb.org/t/p/w500'
  const formatRuntime = (runtime: number): string => {
    const hrs = Math.floor(runtime / 60)
    const min = runtime % 60
    return hrs ? `${hrs}h ${min}m` : `${min}m`
  }

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
          <Ratings upVotes={upVotes} downVotes={downVotes} />
          <Tagline>{movie?.tagline}</Tagline>
          <H4>Overview</H4>
          <MovieText>{movie?.overview}</MovieText>
        </MovieInfo>
      </MovieContainer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { movieId } = context.params
  const res = await fetch(`http://localhost:8080/api/movies/${movieId}`)
  const res2 = await fetch(`http://localhost:8081/v1/ratings/${movieId}`)
  let upVotes: number
  let downVotes: number

  if (!res2.ok) {
    upVotes = 0
    downVotes = 0
  }

  if (!res.ok) {
    const error = await res.json()
    return {
      props: {
        movie: {},
        error,
        upVotes,
        downVotes,
      },
    }
  }

  const data = await res.json()

  return {
    props: {
      movie: data,
      error: '',
      upVotes,
      downVotes,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})
