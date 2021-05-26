import { GetStaticProps } from 'next'
import Header from '../components/layout/Header'
import MoviesGrid from '../components/movies'
import { Movie } from '../utils/tmdbClient'

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch('http://localhost:8080/api/movies')
  const data = await res.json()
  if (!data.results) {
    return {
      props: {
        movies: [],
        error: data.errorMessage,
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

export default function Home({
  movies,
  error = '',
}: {
  movies: Movie[]
  error?: string
}): JSX.Element {
  if (error)
    return (
      <>
        <Header>Rancid Tomatillos</Header>
        <h2>{error}</h2>
      </>
    )
  return (
    <>
      <Header>Rancid Tomatillos</Header>
      <MoviesGrid movies={movies} />
    </>
  )
}
