import Image from "next/image"
import imgPath from "@/lib/utils/imgPath"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { ProfileIcon } from "@/components/icons"

interface RowProps extends React.HTMLProps<HTMLDivElement> {
  odd?: boolean
}

const ImageWrapper = styled.div`
  height: 8rem;
  width: 6rem;
  position: relative;
`

const ImgFallbackWrapper = styled.div`
  height: 8rem;
  width: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.gray["300"]};
  border-radius: 0.5rem;
`

const RowWrapper = styled.div<RowProps>`
  display: grid;
  grid-template-columns: 0.5fr 2fr 2fr;
  background-color: ${(props) => props.theme.colors.gray["50"]};
  margin: 1rem 0;
  border-radius: 0.5rem;
  box-shadow: ${(props) => props.theme.shadow.xs};

  :nth-of-type(${(props) => (props.odd ? "odd" : "even")}) {
    background-color: ${(props) => props.theme.colors.gray["200"]};
  }

  ${ImageWrapper},
  ${ImgFallbackWrapper},
  span {
    display: flex;
    align-items: center;
  }
`

interface CreditRowProps {
  profileImgPath: string
  name: string
  role: string
  oddHighlight?: boolean
}

const CreditRow = ({
  profileImgPath,
  name,
  role,
  oddHighlight,
}: CreditRowProps): JSX.Element => {
  const imgRootPath = imgPath("profile", 1)

  return (
    <RowWrapper odd={oddHighlight}>
      {profileImgPath ? (
        <ImageWrapper>
          <Image
            src={imgRootPath + profileImgPath}
            alt={`${name}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            css={css`
              border-radius: 0.5rem;
            `}
          />
        </ImageWrapper>
      ) : (
        <ImgFallbackWrapper>
          <ProfileIcon />
        </ImgFallbackWrapper>
      )}
      <span
        css={css`
          margin-left: 1rem;
        `}
      >
        {name}
      </span>
      <span>{role}</span>
    </RowWrapper>
  )
}

export default CreditRow
