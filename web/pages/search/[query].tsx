import TmdbClient, { Movie } from "@/lib/api/tmdbClient"
import styled from "@emotion/styled"
import Grid from "@/components/layout/Grid"
import SearchBox from "@/components/movies/SearchBox"
import SearchResult from "@/components/movies/SearchResult"
import Layout from "@/components/layout"
import { GetStaticPaths, GetStaticProps } from "next"

const Results = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 1rem auto;
  display: flex;
  flex-flow: column;
`

export default function Search({ movies }: { movies: Movie[] }) {
  return (
    <Layout>
      <SearchBox short />
      <Results>
        <Grid columns={2} columnGap={1.8} rowGap={1.8}>
          {movies?.map((movie) => (
            <SearchResult movie={movie} key={movie.id} />
          ))}
        </Grid>
      </Results>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tmdbClient = new TmdbClient()
  const { query } = context.params
  const data = await tmdbClient.searchMovies(String(query))
  if (!data.results) {
    return {
      props: {
        movies: [],
        error: "Something went wrong searching movies.",
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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
})
