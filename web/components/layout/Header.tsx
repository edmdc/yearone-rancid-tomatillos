import styled from '@emotion/styled'

export default styled.header`
  background-color: ${(props) => props.theme.colors.red['600']};
  max-width: ${(props) => props.theme.maxWidth};
  color: ${(props) => props.theme.colors.red['50']};
  padding: 1rem;
  margin: 0 auto;
  font-weight: 900;
  font-size: 2.4rem;
`