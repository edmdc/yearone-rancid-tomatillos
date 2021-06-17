import Image from "next/image"
import imgPath from "@/lib/utils/imgPath"
import styled from "@emotion/styled"
import { css, useTheme } from "@emotion/react"
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

interface ProfileRowProps {
  profileImgPath: string
  name: string
  role: string
  oddHighlight?: boolean
}

const ProfileRow = ({
  profileImgPath,
  name,
  role,
  oddHighlight,
}: ProfileRowProps): JSX.Element => {
  const imgRootPath = imgPath("profile", 1)
  const theme = useTheme()
  return (
    <TableRow odd={oddHighlight}>
      {profileImgPath ? (
        <Image
          src={imgRootPath + profileImgPath}
          alt={`${name}`}
          width={45}
          height={70}
          css={css`
            border-radius: 0.5rem;
          `}
        />
      ) : (
        <div
          css={css`
            height: 7rem;
            width: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: ${theme.colors.gray["200"]};
            border-radius: 0.5rem;
          `}
        >
          <ProfileIcon />
        </div>
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

export default ProfileRow
