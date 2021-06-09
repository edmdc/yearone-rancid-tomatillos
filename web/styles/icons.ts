import { css } from '@emotion/react'
import theme from './theme'

export const iconBaseStyles = css`
  margin: 0;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 5rem;
  background-color: ${theme.colors.gray['600']};
  padding: 0.4rem;
`

export const iconColors = {
  primary: css`
    fill: ${theme.colors.gray['50']};
  `,
  secondary: css`
    fill: ${theme.colors.gray['200']};
  `,
}
