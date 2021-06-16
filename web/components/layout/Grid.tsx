import styled from '@emotion/styled'

interface GridProps {
  columns: number
  rowGap: number
  columnGap: number
}

const Grid = styled.section<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  width: 100%;
  row-gap: ${(props) => props.rowGap}rem;
  column-gap: ${(props) => props.columnGap}rem;
  margin: 4rem auto;
  justify-items: center;
`

export default Grid
