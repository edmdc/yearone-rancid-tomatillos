import { iconColors, iconSize } from "@/styles/icons"

const ProfileIcon = () => (
  <svg
    css={[iconSize.lg]}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path css={iconColors.primary} d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
    <path
      css={iconColors.dark}
      d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"
    />
  </svg>
)

export default ProfileIcon
