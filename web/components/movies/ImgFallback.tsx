import styled from "@emotion/styled"
import Image from "next/image"

const Wrapper = styled.div`
  width: 19rem;
  height: 28rem;
  display: flex;
  flex-flow: column;
  text-align: center;
  justify-content: start;
  background-color: white;
  padding-top: 3rem;
  border-radius: 2.5rem;
`
const Message = styled.p`
  font-size: 2.4rem;
  line-height: 3.6rem;
  font-weight: 800;
  width: 80%;
  margin: 1rem auto;
  text-transform: uppercase;
  background: linear-gradient(to right, #90cea1 0%, #3cbec9 56%, #0db5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const ImgFallback = () => (
  <Wrapper>
    <Image src="/icons/tmdb/MainLogo.svg" width={60} height={80} />
    <Message>
      No Image
      <br /> Found
    </Message>
  </Wrapper>
)

export default ImgFallback
