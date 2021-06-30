import { css } from "@emotion/react"
import { GetStaticProps } from "next"
import Head from "next/head"
import TmdbClient, { Movie } from "@/lib/api/tmdbClient"
import Layout from "@/components/layout"
import Row from "@/components/layout/Row"
import SearchBox from "@/components/movies/SearchBox"
import MovieThumbnail from "@/components/movies/Thumbnail"
import { H4, H5 } from "@/styles/typography"

export default function Home({
  movies,
  error = "",
}: {
  movies: Movie[]
  error?: string
}): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Rancid Tomatillos</title>
      </Head>
      <SearchBox />
      <div
        css={css`
          max-width: 88%;
          margin: 4rem auto;
          h4 {
            margin: 2rem 0;
          }
        `}
      >
        <H4>Trending</H4>
        {error ? (
          <H5>{error}</H5>
        ) : (
          <Row>
            {movies.map((movie) => (
              <MovieThumbnail movie={movie} key={movie.id} />
            ))}
          </Row>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const tmdbClient = new TmdbClient()
  const data = await tmdbClient.getTrendingMovies()
  if (!data) {
    return {
      props: {
        movies: [],
        error: "Something went wrong. Could not load resources.",
      },
    }
  }
  return {
    props: {
      movies: data.results,
      error: "",
    },
  }
}
