import styled from "@emotion/styled"
import { Thumbnail } from "../movies/Thumbnail"

const Row = styled.section`
  display: flex;
  flex-flow: row no-wrap;
  height: 36rem;
  overflow-x: hidden;
  padding: 3rem;

  :hover {
    overflow-x: scroll;
  }

  ${Thumbnail} {
    margin-right: 3.4rem;
  }
`

export default Row
