import Link from "next/link"
import styled from "@emotion/styled"
import { FilmIcon } from "@/components/icons"

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.colors.red["600"]};
  max-width: ${(props) => props.theme.maxWidth};
  padding: 1.4rem;
  margin: 0 auto;
`

const Title = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: max-content;

  span {
    color: ${(props) => props.theme.colors.red["50"]};
    font-weight: 900;
    font-size: 2.4rem;
    margin-left: 0.7rem;
  }
`

const Header = () => (
  <HeaderWrapper>
    <Link href="/">
      <Title>
        <FilmIcon />
        <span>Rancid Tomatillos</span>
      </Title>
    </Link>
  </HeaderWrapper>
)

export default Header
