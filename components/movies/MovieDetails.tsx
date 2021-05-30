import styled from '@emotion/styled'
import { H2 } from '../../styles/typography'

type MovieContainerProps = {
  backDropUrl: string
}
const rootBackdropPath = 'https://image.tmdb.org/t/p/w1280'

export const MovieContainer = styled.section<MovieContainerProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 88%;
  margin: 4rem auto;
  padding: 3rem 4rem;
  justify-content: space-between;
  box-shadow: 12px 12px 24px #cccccc, -12px -12px 24px #f4f4f4;
  border-radius: 2rem;
  backdrop-filter: blur(12px);
  color: white;
  background: linear-gradient(
      145deg,
      rgba(34, 34, 34, 0.95) 15%,
      rgba(34, 34, 34, 0.9) 30%,
      rgba(34, 34, 34, 0.85) 50%,
      rgba(98, 98, 98, 0.9)
    ),
    url(${(props) => rootBackdropPath + props.backDropUrl});
  background-size: cover;
  background-repeat: no-repeat;
`

export const MoviePoster = styled.div`
  position: relative;
  height: 65rem;
  border-radius: 1rem;
`

export const MovieInfo = styled.article`
  display: flex;
  flex-flow: column;
  justify-content: center;
`

export const MovieTitle = styled.div`
  display: flex;
  flex-flow: column;
  ${H2} {
    span {
      color: ${(props) => props.theme.colors.gray['400']};
      font-weight: 500;
      font-size: 3.6rem;
      margin-left: 1.6rem;
    }
  }

  p {
    margin: 0;
  }
`

export const MovieText = styled.p`
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray['100']};
`

export const Tagline = styled.p`
  font-size: 1.8rem;
  line-height: 2.7;
  font-style: italic;
  margin: 0;
  color: ${(props) => props.theme.colors.gray['300']};
`
