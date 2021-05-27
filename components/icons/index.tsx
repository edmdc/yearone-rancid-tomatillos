import { css, useTheme } from '@emotion/react'
import theme from '../../styles/theme'

export const RightChevron = () => {
  const theme = useTheme()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      css={css`
        height: 2.8rem;
        width: 2.8rem;
        position: absolute;
        z-index: 20;
        right: 1rem;
        bottom: 0.75rem;
      `}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        css={css`
          fill: ${theme.colors.blue['500']};
          opacity: 0.8;
          backdrop-filter: blur(2px);
        `}
      />
      <path
        css={css`
          fill: ${theme.colors.blue['100']};
        `}
        d="M10.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"
      />
    </svg>
  )
}

const iconBaseStyles = css`
  margin: 0;
  width: 2.8rem;
  height: 2.8rem;
`

const iconColors = {
  primary: css`
    fill: ${theme.colors.gray['200']};
  `,
  secondary: css`
    fill: ${theme.colors.gray['400']};
  `,
}

export const ThumbsUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    css={iconBaseStyles}
  >
    <path
      css={iconColors.primary}
      d="M13 4.8l2.92 6.8a1 1 0 0 1 .08.4v8a2 2 0 0 1-2 2H8a4.28 4.28 0 0 1-3.7-2.45L2.07 14.4A1 1 0 0 1 2 14v-2a3 3 0 0 1 3-3h4V5a3 3 0 0 1 3-3 1 1 0 0 1 1 1v1.8z"
    />
    <rect
      css={iconColors.secondary}
      width="4"
      height="11"
      x="18"
      y="11"
      rx="1"
    />
  </svg>
)

export const ThumbsDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    css={iconBaseStyles}
  >
    <path
      css={iconColors.primary}
      d="M11 19.2l-2.92-6.8A1 1 0 0 1 8 12V4c0-1.1.9-2 2-2h6c1.5 0 3.11 1.06 3.7 2.45l2.22 5.16A1 1 0 0 1 22 10v2a3 3 0 0 1-3 3h-4v4a3 3 0 0 1-3 3 1 1 0 0 1-1-1v-1.8z"
    />
    <rect
      css={iconColors.secondary}
      width="4"
      height="11"
      x="2"
      y="2"
      rx="1"
      transform="rotate(180 4 7.5)"
    />
  </svg>
)
