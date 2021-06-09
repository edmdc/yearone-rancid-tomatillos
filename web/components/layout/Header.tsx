import Link from 'next/link'
import styled from '@emotion/styled'

const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.colors.red['600']};
  max-width: ${(props) => props.theme.maxWidth};
  padding: 1rem;
  margin: 0 auto;

  button {
    color: ${(props) => props.theme.colors.red['50']};
    background-color: transparent;
    font-weight: 900;
    font-size: 2.4rem;
    border: 0;
  }
`

const Header = () => (
  <HeaderWrapper>
    <Link href="/">
      <button type="button">Rancid Tomatillos</button>
    </Link>
  </HeaderWrapper>
)

export default Header
