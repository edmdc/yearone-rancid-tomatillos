import styled from '@emotion/styled'
import Image from 'next/image'
import { GithubIcon, LinkedInIcon } from '../icons'

const FooterWrapper = styled.footer`
  background-color: ${(props) => props.theme.colors.red['600']};
  max-width: ${(props) => props.theme.maxWidth};
  padding: 1rem;
  margin: 10rem auto 0;
  height: 18rem;
  display: flex;
  justify-content: space-between;
`

const AttrText = styled.span`
  color: ${(props) => props.theme.colors.red['50']};
  font-weight: 500;
  font-size: 1.6rem;
`

const AttrLink = styled.a`
  color: ${(props) => props.theme.colors.red['50']};
  font-weight: 600;
  font-size: 1.6rem;
  margin: 1rem 0;
  text-decoration: underline;
`

const SocialLinks = styled.div`
  display: flex;
  width: content;
  margin: 0.2rem auto;
`

const TmdbAttribution = styled.div`
  width: 60%;
  display: flex;
  flex-flow: column;
  height: 14rem;
  margin: 2rem;
  align-items: flex-start;

  a {
    height: 6rem;
    width: 30rem;
    position: relative;
  }
`

const AuthorAttribution = styled.div`
  display: flex;
  flex-flow: column;
  margin: 2rem;
  text-align: center;
`

const Footer = () => (
  <FooterWrapper>
    <TmdbAttribution>
      <AttrText>Movie data provided by:</AttrText>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
        <Image
          src="/icons/tmdb/LongLogo.svg"
          alt="The movie database logo"
          layout="fill"
        />
      </a>
      <AttrLink
        href="https://fontawesome.com/license"
        target="_blank"
        rel="noreferrer"
      >
        FontAwesome Icon License
      </AttrLink>
    </TmdbAttribution>
    <AuthorAttribution>
      <AttrText>Created by: Edwin Montealvo</AttrText>
      <SocialLinks>
        <GithubIcon />
        <LinkedInIcon />
      </SocialLinks>
      <AttrLink
        href="https://github.com/edmdc/yearone-rancid-tomatillos"
        target="_blank"
        rel="noreferrer"
      >
        Source Code
      </AttrLink>
    </AuthorAttribution>
  </FooterWrapper>
)

export default Footer
