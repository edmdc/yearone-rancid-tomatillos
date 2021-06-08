import { ChangeEventHandler, useState } from 'react'
import { css } from '@emotion/react'
import { GetStaticProps } from 'next'
import { Movie, TmdbResponse } from '@/lib/api/tmdbClient'
import Grid from '@/components/layout/Grid'
import Header from '@/components/layout/Header'
import Row from '@/components/layout/Row'
import SearchBox from '@/components/movies/SearchBox'
import MovieThumbnail from '@/components/movies/Thumbnail'
import { H4 } from '@/styles/typography'

export default function Home({
  movies,
  error = '',
}: {
  movies: Movie[]
  error?: string
}): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('')
  const [tmdbResults, setResults] = useState<TmdbResponse>({})
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault()
    setSearchQuery(event.currentTarget.value)
  }

  const searchMovie = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/search/${searchQuery}`)
      const data = await res.json()
      console.log(data)
      setResults(data)
    } catch (err) {
      console.log(err)
    }
  }

  if (error)
    return (
      <>
        <Header />
        <h2>{error}</h2>
      </>
    )
  return (
    <>
      <Header />
      <SearchBox
        handleInputChange={handleInputChange}
        searchQuery={searchQuery}
        searchMovie={searchMovie}
      />
      {tmdbResults?.results ? (
        <Grid columns={6}>
          {tmdbResults.results.map((movie) => (
            <MovieThumbnail movie={movie} key={movie.id} />
          ))}
        </Grid>
      ) : (
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
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:8080/api/movies')
  const data = await res.json()
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
      error: '',
    },
  }
}
