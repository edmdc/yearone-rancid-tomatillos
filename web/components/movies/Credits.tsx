import { H4 } from "@/styles/typography"
import { Cast, Crew } from "@/lib/api/tmdbClient"
import useCredits from "@/lib/hooks/useCredits"
import CreditRow from "@/components/movies/CreditRow"
import styled from "@emotion/styled"

const CreditsWrapper = styled.section`
  display: flex;
  width: 88%;
  justify-content: space-between;
  margin: 2rem auto;
`

const Category = styled.article`
  display: flex;
  flex-flow: column;
  width: 48%;
`

const Table = styled.div`
  width: 100%;
`

const Credits = ({ movieId }: { movieId: string }) => {
  const { cast, crew } = useCredits(movieId)

  return (
    <CreditsWrapper>
      <Category>
        <H4>Cast</H4>
        <Table>
          {cast?.map((member: Cast) => (
            <CreditRow
              key={member.cast_id}
              profileImgPath={member.profile_path}
              name={member.name}
              role={member.character}
              oddHighlight
            />
          ))}
        </Table>
      </Category>
      <Category>
        <H4>Crew</H4>
        <Table>
          {crew?.map((member: Crew) => (
            <CreditRow
              key={member.credit_id}
              profileImgPath={member.profile_path}
              name={member.name}
              role={member.job}
            />
          ))}
        </Table>
      </Category>
    </CreditsWrapper>
  )
}

export default Credits
