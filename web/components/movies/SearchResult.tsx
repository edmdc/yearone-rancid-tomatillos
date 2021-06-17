import Image from "next/image"
import { useRouter } from "next/router"
import { format } from "date-fns"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Movie } from "@/lib/api/tmdbClient"
import { H5 } from "@/styles/typography"
import ImgFallback from "./ImgFallback"

const ResultWrapper = styled.div`
  position: relative;
  display: flex;
  height: 21rem;
  width: 100%;
  border: 0.2rem solid ${(props) => props.theme.colors.gray["300"]};
  border-radius: 1rem;
  box-shadow: ${(props) => props.theme.shadow.sm};
  background-color: ${(props) => props.theme.colors.gray["50"]};
  cursor: pointer;
`

const ResultContent = styled.div`
  margin: 1.2rem;
  width: 80%;

  span {
    color: ${(props) => props.theme.colors.gray["500"]};
  }
`

const Description = styled.p`
  margin-top: 2rem;
  overflow: hidden;
  text-overflow: clip;
  height: 9.6rem;
  position: relative;
`

const formatDescription = (str: string) => {
  let description = str.split(" ")
  if (description.length > 33) {
    description = description.slice(0, 33)
    return `${description.join(" ")} ...`
  }
  return description.join(" ")
}

const SearchResult = ({ movie }: { movie: Movie }) => {
  const router = useRouter()
  const rootImgSrc = "https://image.tmdb.org/t/p/w185"
  return (
    <ResultWrapper onClick={() => router.push(`/movies/${movie.id}`)}>
      {movie?.poster_path ? (
        <Image
          src={rootImgSrc + movie.poster_path}
          alt={`Poster for ${movie.title}`}
          width={150}
          height={180}
          css={css`
            position: absolute;
            z-index: 2;
            border-radius: 0.8rem 0 0 0.8rem;
          `}
        />
      ) : (
        <ImgFallback />
      )}
      <ResultContent>
        <H5>{movie.title}</H5>
        <span>
          {movie.release_date
            ? format(new Date(movie.release_date), "PPP")
            : "Unknow release date"}
        </span>
        <Description>
          {movie.overview
            ? formatDescription(movie.overview)
            : "No description available"}
        </Description>
      </ResultContent>
    </ResultWrapper>
  )
}

export default SearchResult
