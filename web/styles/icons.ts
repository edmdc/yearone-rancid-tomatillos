import { css } from "@emotion/react"
import theme from "./theme"

export const thumbIconStyles = css`
  margin: 0;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 5rem;
  background-color: ${theme.colors.gray["600"]};
  padding: 0.4rem;
`

export const iconSize = {
  sm: css`
    height: 2.7rem;
    width: 2.7rem;
  `,
  md: css`
    height: 3.3rem;
    width: 3.3rem;
  `,
}

export const iconColors = {
  primary: css`
    fill: ${theme.colors.gray["50"]};
  `,
  secondary: css`
    fill: ${theme.colors.gray["200"]};
  `,
  social: css`
    fill: ${theme.colors.red["50"]};
  `,
  red1: css`
    fill: ${theme.colors.red["100"]};
  `,
  red2: css`
    fill: ${theme.colors.red["300"]};
  `,
}
