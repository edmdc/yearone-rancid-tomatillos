import { ChangeEventHandler, useState } from "react"
import { css } from "@emotion/react"
import { GetStaticProps } from "next"
import TmdbClient, { Movie } from "@/lib/api/tmdbClient"
import Layout from "@/components/layout"
import Row from "@/components/layout/Row"
import SearchBox from "@/components/movies/SearchBox"
import MovieThumbnail from "@/components/movies/Thumbnail"
import { H4 } from "@/styles/typography"
import { useRouter } from "next/router"

export default function Home({
  movies,
  error = "",
}: {
  movies: Movie[]
  error?: string
}): JSX.Element {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    setSearchQuery(event.currentTarget.value)
  }

  const searchMovie = async () => {
    router.push(`/search/${searchQuery}`)
  }

  if (error)
    return (
      <Layout>
        <h2>{error}</h2>
      </Layout>
    )
  return (
    <Layout>
      <SearchBox
        handleInputChange={handleInputChange}
        searchQuery={searchQuery}
        searchMovie={searchMovie}
      />
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
        <Row>
          {movies.map((movie) => (
            <MovieThumbnail movie={movie} key={movie.id} />
          ))}
        </Row>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const tmdbClient = new TmdbClient()
  const data = await tmdbClient.getTrendingMovies()
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
