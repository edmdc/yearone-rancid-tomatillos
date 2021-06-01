import styled from '@emotion/styled'
import { Thumbnail } from '../movies/Thumbnail'

const Row = styled.section`
  display: flex;
  flex-flow: row no-wrap;
  overflow-x: scroll;

  ${Thumbnail} {
    margin-right: 2.5rem;
  }
`

export default Row
