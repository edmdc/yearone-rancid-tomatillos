import useSearchInput from "@/lib/hooks/useSearchInput"
import styled from "@emotion/styled"

const Container = styled.div<SearchBoxProps>`
  background: url("/drivein-theatre.jpeg") no-repeat center;
  height: ${(props) => (props.short ? "14rem" : "36rem")};
  width: 88%;
  background-size: cover;
  margin: 4rem auto;
  position: relative;
  border-radius: 1rem;
  box-shadow: 8px 8px 12px #9c9c9c, -8px -8px 12px #fcfcfc;
`

const SearchWrapper = styled.div<SearchBoxProps>`
  width: 65%;
  position: absolute;
  top: ${(props) => (props.short ? "50%" : "65%")};
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.75rem;
  display: flex;
`

const Input = styled.input`
  border-radius: 0.75rem;
  height: 4.2rem;
  width: 100%;
  margin: 0 2rem;
  padding: 0.2rem 0.75rem;
  font-size: 2.1rem;
`

const SearchButton = styled.button`
  border-radius: 0.75rem;
  width: 16rem;
  height: 4.2rem;
  background-color: ${(props) => props.theme.colors.red["500"]};
  color: ${(props) => props.theme.colors.red["50"]};
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.8rem;
  border: 0;

  :disabled {
    background-color: ${(props) => props.theme.colors.gray["700"]};
    color: ${(props) => props.theme.colors.gray["100"]};

    :hover {
      transform: none;
    }
  }

  :hover {
    transform: scale(1.05) translateY(-2px);
  }

  :active {
    transform: scale(0.95) translateY(1px);
    background-color: ${(props) => props.theme.colors.red["700"]};
    color: ${(props) => props.theme.colors.red["100"]};
  }
`

interface SearchBoxProps extends React.HTMLProps<HTMLDivElement> {
  short?: boolean
}

export default function SearchBox({ short }: SearchBoxProps): JSX.Element {
  const { searchMovie, searchQuery, setSearchQuery } = useSearchInput()
  const searchOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      searchMovie()
    }
  }
  return (
    <Container short={short}>
      <SearchWrapper short={short}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.currentTarget?.value)}
          onKeyPress={searchOnEnter}
          placeholder="Search Movie titles..."
        />
        <SearchButton disabled={!searchQuery} onClick={searchMovie}>
          Search
        </SearchButton>
      </SearchWrapper>
    </Container>
  )
}
