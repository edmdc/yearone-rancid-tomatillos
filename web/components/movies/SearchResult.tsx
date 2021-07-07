import Image from "next/image"
import { useRouter } from "next/router"
import { format } from "date-fns"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Movie } from "@/lib/api/tmdbClient"
import { H5 } from "@/styles/typography"
import { NoImageIcon } from "../icons"

const ResultWrapper = styled.div`
  position: relative;
  display: flex;
  height: 24rem;
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
  if (description.length > 30) {
    description = description.slice(0, 30)
    return `${description.join(" ")} ...`
  }
  return description.join(" ")
}

const rootImgSrc = "https://image.tmdb.org/t/p/w185"

const SearchResult = ({ movie }: { movie: Movie }) => {
  const router = useRouter()
  return (
    <ResultWrapper onClick={() => router.push(`/movie/${movie.id}`)}>
      {movie?.poster_path ? (
        <div
          css={css`
            position: relative;
            width: 30%;
          `}
        >
          <Image
            src={rootImgSrc + movie.poster_path}
            alt={`Poster for ${movie.title}`}
            layout="fill"
            objectFit="contain"
            css={css`
              position: absolute;
              z-index: 2;
              border-radius: 0.8rem 0 0 0.8rem;
            `}
          />
        </div>
      ) : (
        <NoImageIcon movieTitle={movie.title} />
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
