import { Global } from '@emotion/react'
import { AppProps } from 'next/app'
import globalStyles from '../styles/global'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
