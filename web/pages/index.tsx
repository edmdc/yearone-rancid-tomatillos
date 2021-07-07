import { css } from "@emotion/react"
import Head from "next/head"
import { Movie } from "@/lib/api/tmdbClient"
import Layout from "@/components/layout"
import Row from "@/components/layout/Row"
import SearchBox from "@/components/movies/SearchBox"
import MovieThumbnail from "@/components/movies/Thumbnail"
import { H4, H5 } from "@/styles/typography"
import fetcher from "@/lib/utils/fetcher"
import useSWR from "swr"

export default function Home(): JSX.Element {
  const { data, error } = useSWR("/api/trending", fetcher)

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
          <H5>Oops, looks like something went. Status code: {error.status}</H5>
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
