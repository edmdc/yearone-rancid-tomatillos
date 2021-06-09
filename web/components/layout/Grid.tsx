import styled from '@emotion/styled'

interface GridProps {
  columns: number
}

const Grid = styled.section<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  width: 100%;
  row-gap: ${(props) => props.theme.gap.xlg};
  margin: 4rem auto;
  justify-items: center;
`

export default Grid
