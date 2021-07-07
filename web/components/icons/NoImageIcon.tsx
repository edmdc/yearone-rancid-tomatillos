import { iconColors } from "@/styles/icons"
import { css, useTheme } from "@emotion/react"

const NoImageIcon = ({ movieTitle }: { movieTitle: string }) => {
  const theme = useTheme()
  return (
    <div
      role="img"
      aria-label={`No poster found for ${movieTitle}`}
      css={css`
        height: 100%;
        width: 15rem;
        position: relative;
        border-radius: 0.5rem;
        background-color: ${theme.colors.gray["50"]};
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon-close"
        css={css`
          position: absolute;
          top: 32%;
          left: 81%;
          transform: translate(-50%, -50%);
          height: 12rem;
          width: 12rem;
          z-index: 5;
        `}
      >
        <path
          css={[
            iconColors.dark,
            css`
              opacity: 0.6;
            `,
          ]}
          fillRule="evenodd"
          d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="icon-photo"
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          height: 12rem;
          width: 12rem;
          transform: translate(-50%, -50%);
          z-index: 2;
        `}
      >
        <path
          css={iconColors.secondary}
          d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2zm9 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        />
        <path
          css={iconColors.dark}
          d="M15.3 12.3a1 1 0 0 1 1.4 0l2 2a1 1 0 0 1 .3.7v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3a1 1 0 0 1 .3-.7l4-4a1 1 0 0 1 1.4 0l3.3 3.29 1.3-1.3z"
        />
      </svg>
    </div>
  )
}

export default NoImageIcon
