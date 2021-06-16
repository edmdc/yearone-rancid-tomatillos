import '@emotion/react'

interface ColorLevels {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      green: ColorLevels
      blue: ColorLevels
      gray: ColorLevels
      red: ColorLevels
      teal: ColorLevels
    }
    gap: {
      xxxs: string
      xxs: string
      xs: string
      s: string
      m: string
      lg: string
      xlg: string
      xxlg: string
      xxxlg: string
    }
    maxWidth: string
    shadow: {
      sm: string
      md: string
    }
  }
}
