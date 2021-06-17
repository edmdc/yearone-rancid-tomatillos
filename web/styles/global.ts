import { css } from '@emotion/react'
import colors from './colors'

export default css`
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');
  :root {
    font-size: 62.5%;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Manrope', sans-serif;
    background-color: ${colors.gray['100']};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  span,
  p {
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 400;
  }
`
