import { iconColors, thumbIconStyles } from '@/styles/icons'

const ThumbsUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    css={thumbIconStyles}
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

export default ThumbsUp
