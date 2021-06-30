import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Layout from "@/components/layout"
import {
  MovieContainer,
  MovieInfo,
  MoviePoster,
  MovieText,
  MovieTitle,
  Tagline,
} from "@/components/movies/MovieDetails"
import Ratings from "@/components/movies/Ratings"
import Credits from "@/components/movies/Credits"
import { H2, H4 } from "@/styles/typography"
import TmdbClient, { Movie } from "@/lib/api/tmdbClient"
import { useRouter } from "next/router"
import useVotes from "@/lib/hooks/useVotes"

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

export default function SingleMovieModal({ movie, errors }: SingleMovieProps) {
  const router = useRouter()
  const { movieId } = router.query
  const { votes, upVote, downVote } = useVotes(String(movieId))

  return (
    <Layout>
      <Head>
        <title>Rancid Tomatillos - Single Movie Details</title>
      </Head>
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
            upVotes={votes?.upVotes}
            downVotes={votes?.downVotes}
            upVoteMovie={upVote}
            downVoteMovie={downVote}
          />
          {errors?.ratings && <span>{errors.ratings}</span>}
          <Tagline>{movie?.tagline}</Tagline>
          <H4>Overview</H4>
          <MovieText>{movie?.overview}</MovieText>
        </MovieInfo>
      </MovieContainer>
      <Credits movieId={String(movieId)} />
    </Layout>
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
    console.log(err)
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
