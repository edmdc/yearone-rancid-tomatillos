import Header from "./Header"
import Footer from "./Footer"

export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
