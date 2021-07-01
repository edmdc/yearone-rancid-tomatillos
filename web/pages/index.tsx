import { css } from "@emotion/react"
import { GetStaticProps } from "next"
import Head from "next/head"
import TmdbClient, { Movie, TmdbResponse } from "@/lib/api/tmdbClient"
import Layout from "@/components/layout"
import Row from "@/components/layout/Row"
import SearchBox from "@/components/movies/SearchBox"
import MovieThumbnail from "@/components/movies/Thumbnail"
import { H4, H5 } from "@/styles/typography"
import fetcher from "@/lib/utils/fetcher"
import useSWR from "swr"

export default function Home({
  movies,
  error = "",
}: {
  movies: TmdbResponse
  error?: string
}): JSX.Element {
  const { data } = useSWR(
    () => (error !== "" ? "/api/trending" : null),
    fetcher,
    { initialData: movies },
  )

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
            {data?.results.map((movie: Movie) => (
              <MovieThumbnail movie={movie} key={movie.id} />
            ))}
          </Row>
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/trending`)
    const data = await res.json()
    return {
      props: {
        movies: data,
        error: "",
      },
    }
  } catch (error) {
    return {
      props: {
        movies: {},
        error: "Something went wrong. Could not load resources.",
      },
    }
  }
}
