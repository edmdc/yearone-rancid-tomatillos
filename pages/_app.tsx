import { Global, ThemeProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import globalStyles from '../styles/global'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
