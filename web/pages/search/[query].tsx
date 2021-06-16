import TmdbClient, { Movie } from "@/lib/api/tmdbClient"
import styled from "@emotion/styled"
import Grid from "@/components/layout/Grid"
import SearchResult from "@/components/movies/SearchResult"
import Layout from "@/components/layout"
import { GetStaticPaths, GetStaticProps } from "next"

const Results = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 6rem auto;
  display: flex;
  flex-flow: column;
`

const ClearButton = styled.button`
  font-size: 1.8rem;
  width: 18rem;
  height: 5rem;
  align-self: flex-end;
  color: ${(props) => props.theme.colors.red["50"]};
  background-color: ${(props) => props.theme.colors.red["500"]};
  border: 0;
  border-radius: 0.8rem;
  padding: 1rem 2rem;
`

export default function Search({ movies }: { movies: Movie[] }) {
  return (
    <Layout>
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

// <ClearButton type="button" onClick={clearResults}>
//   Clear Search
// </ClearButton>

export const getStaticProps: GetStaticProps = async (context) => {
  const tmdbClient = new TmdbClient()
  const { query } = context.params
  const data = await tmdbClient.searchMovies(String(query))
  if (!data.results) {
    return {
      props: {
        movies: [],
        error: data.message,
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
