import { css } from '@emotion/react'
import theme from '../../styles/theme'

const RightChevron = () => (
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

export default RightChevron
