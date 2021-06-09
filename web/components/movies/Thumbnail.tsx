import Image from 'next/image'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Movie } from '@/lib/api/tmdbClient'
import ImgFallback from './ImgFallback'
import { RightChevron } from '../icons'

export const Thumbnail = styled.article`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  height: 27rem;
  min-width: 18rem;
  border-radius: 1.8rem;
  background: #e0e0e0;
  box-shadow: 8px 8px 16px #9c9c9c, -8px -8px 16px #fcfcfc;
`

const Caption = styled.div`
  position: absolute;
  background-color: rgba(247, 247, 247, 0.6);
  bottom: 0;
  z-index: 12;
  backdrop-filter: blur(3px);
  width: 100%;
  height: 8rem;
  border-radius: 0 0 1rem 1rem;
`

const Title = styled.p`
  font-size: 1.8rem;
  line-height: 2.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.gray['900']};
  text-align: left;
  width: 80%;
  margin: 0.5rem auto 0.3rem;
  padding: 0 0.5rem;
`

interface ThumbnailProps {
  movie: Movie
}

const MovieThumbnail = ({ movie }: ThumbnailProps): JSX.Element => {
  const router = useRouter()
  const rootImgSrc = 'https://image.tmdb.org/t/p/w185'

  const formatTitle = (title: string): string =>
    title.length > 28 ? title.slice(0, 24).concat('...') : title

  const showDetails = (movieId: number) => {
    router.push(`/movies/${movieId}`)
  }

  return (
    <Thumbnail onClick={() => showDetails(movie.id)} id={String(movie.id)}>
      {movie?.poster_path ? (
        <Image
          src={rootImgSrc + movie.poster_path}
          alt={`Poster for ${movie.title}`}
          layout="fill"
          objectFit="scale-down"
          objectPosition="top"
          css={css`
            position: absolute;
            z-index: 2;
            border-radius: 1rem;
          `}
        />
      ) : (
        <ImgFallback />
      )}
      <Caption>
        <Title>{formatTitle(movie.title)}</Title>
        <RightChevron />
      </Caption>
    </Thumbnail>
  )
}

export default MovieThumbnail
