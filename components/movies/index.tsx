import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from '@emotion/styled'
import { css, useTheme } from '@emotion/react'
import { Movie } from '../../utils/tmdbClient'
import ImgFallback from './ImgFallback'
import { SetStateAction } from 'react'

const MoviesContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  max-width: ${(props) => props.theme.maxWidth};
  grid-gap: ${(props) => props.theme.gap.xs};
  margin: 4rem auto;
`

const MovieCard = styled.article`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  height: 28rem;
  max-width: 19rem;
  position: relative;
  margin: 2rem 0.5rem;
  border-radius: 2.5rem;
  background: #e0e0e0;
  box-shadow: 8px 8px 12px #cccccc, -8px -8px 12px #f4f4f4;
`

const Caption = styled.div`
  position: absolute;
  background-color: rgba(247, 247, 247, 0.6);
  bottom: 0;
  z-index: 12;
  backdrop-filter: blur(3px);
  width: 100%;
  height: 8rem;
  border-radius: 0 0 2.5rem 2.5rem;
`

const Title = styled.p`
  font-size: 1.8rem;
  line-height: 2.7rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.gray['900']};
  text-align: center;
  width: 95%;
  margin: 0.5rem auto;
  padding: 0 0.5rem;
`

const RightChevron = () => {
  const theme = useTheme()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      css={css`
        height: 2.8rem;
        width: 2.8rem;
        position: absolute;
        z-index: 20;
        right: 1rem;
        bottom: 0.75rem;
      `}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        css={css`
          fill: ${theme.colors.blue['500']};
          opacity: 0.8;
          backdrop-filter: blur(2px);
        `}
      />
      <path
        css={css`
          fill: ${theme.colors.blue['100']};
        `}
        d="M10.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"
      />
    </svg>
  )
}

interface MoviesGridProps {
  movies: Movie[]
}

const MoviesGrid = ({ movies }: MoviesGridProps): JSX.Element => {
  const router = useRouter()
  const rootImgSrc = 'https://image.tmdb.org/t/p/w185'
  const formatTitle = (title: string): string =>
    title.length > 28 ? title.slice(0, 24).concat('...') : title

  const showDetails = (movie: Movie) => {
    router.push(`/movies/${movie.id}`)
  }

  return (
    <MoviesContainer>
      {movies.map((movie) =>
        movie.poster_path ? (
          <MovieCard
            key={movie.id}
            onClick={() => showDetails(movie)}
            id={String(movie.id)}
          >
            <Image
              src={rootImgSrc + movie.poster_path}
              alt={`Poster for ${movie.title}`}
              layout="fill"
              objectFit="scale-down"
              objectPosition="top"
              css={css`
                position: absolute;
                z-index: 2;
                border-radius: 2.5rem;
              `}
            />
            <Caption>
              <Title>{formatTitle(movie.title)}</Title>
              <RightChevron />
            </Caption>
          </MovieCard>
        ) : (
          <MovieCard key={movie.id}>
            <ImgFallback />
            <Caption>
              <Title>{movie.title}</Title>
              <RightChevron />
            </Caption>
          </MovieCard>
        ),
      )}
    </MoviesContainer>
  )
}

export default MoviesGrid
