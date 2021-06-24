import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <>
      <Head>
        <meta name="author" content="Edwin Montealvo" />
        <meta
          name="keywords"
          content="YearOne, movies, front-end developer, full-stack developer, nextjs, JS, javascript, HTML, CSS, emotion, styled-components"
        />
        <meta
          name="description"
          content="A movie search and rating application."
        />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}
