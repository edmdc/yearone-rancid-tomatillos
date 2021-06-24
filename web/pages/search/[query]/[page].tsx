import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import Head from "next/head"
import styled from "@emotion/styled"
import TmdbClient, { Movie, TmdbResponse } from "@/lib/api/tmdbClient"
import { H4 } from "@/styles/typography"
import Grid from "@/components/layout/Grid"
import SearchBox from "@/components/movies/SearchBox"
import SearchResult from "@/components/movies/SearchResult"
import PaginationBar from "@/components/movies/PaginationBar"
import Layout from "@/components/layout"

const Results = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 1rem auto;
  display: flex;
  flex-flow: column;
`

const HomeLink = styled.a`
  font-size: 2.4rem;
  color: ${(props) => props.theme.colors.red["400"]};
  cursor: pointer;
`

export default function Search({
  movieData,
  error,
}: {
  movieData: TmdbResponse
  error: string
}) {
  return (
    <Layout>
      <Head>
        <title>Rancid Tomatillos - Search Results</title>
      </Head>
      <SearchBox short />
      <Results>
        {!movieData && !error && <span>Loading</span>}
        {movieData?.results && (
          <>
            <PaginationBar
              currentPage={movieData?.page}
              totalPages={movieData?.total_pages}
            />
            <Grid columns={2} columnGap={1.8} rowGap={1.8}>
              {movieData?.results.map((movie: Movie) => (
                <SearchResult movie={movie} key={movie.id} />
              ))}
            </Grid>
            <PaginationBar
              currentPage={movieData?.page}
              totalPages={movieData?.total_pages}
            />
            )
          </>
        )}
        {error && (
          <>
            <H4>{error}</H4>
            <Link href="/">
              <HomeLink>Take me Home ☞</HomeLink>
            </Link>
          </>
        )}
      </Results>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tmdbClient = new TmdbClient()
  const { query, page } = context.params
  const data = await tmdbClient.searchMovies(
    String(query),
    Number.parseInt(String(page), 10),
  )
  if (!data) {
    return {
      props: {
        movieData: {},
        error: "Opps, something went wrong. Could not load results",
      },
    }
  }
  return {
    props: {
      movieData: data,
      error: "",
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})
