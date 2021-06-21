import Image from "next/image"
import imgPath from "@/lib/utils/imgPath"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { ProfileIcon } from "@/components/icons"

interface TableRowProps extends React.HTMLProps<HTMLTableRowElement> {
  odd?: boolean
}

const TableRow = styled.tr<TableRowProps>`
  display: grid;
  grid-template-columns: 0.5fr 2fr 2fr;
  background-color: ${(props) => props.theme.colors.gray["50"]};
  margin: 0.4rem 0;
  border-radius: 0.5rem;
  box-shadow: ${(props) => props.theme.shadow.xs};

  :nth-of-type(${(props) => (props.odd ? "odd" : "even")}) {
    background-color: ${(props) => props.theme.colors.gray["200"]};
  }

  td {
    display: flex;
    align-items: center;
  }
`

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
  background-color: ${(props) => props.theme.colors.gray["200"]};
  border-radius: 0.5rem;
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
    <TableRow odd={oddHighlight}>
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
      <td>
        <span
          css={css`
            margin-left: 1rem;
          `}
        >
          {name}
        </span>
      </td>
      <td>
        <span>{role}</span>
      </td>
    </TableRow>
  )
}

export default CreditRow
