import styled from '@emotion/styled'
import { ChangeEventHandler } from 'react'

const Container = styled.div`
  background: url('/drivein-theatre.jpeg') no-repeat center;
  height: 36rem;
  width: 88%;
  background-size: cover;
  margin: 4rem auto;
  position: relative;
`

const SearchWrapper = styled.div`
  width: 65%;
  position: absolute;
  top: 65%;
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
  background-color: ${(props) => props.theme.colors.red['500']};
  color: ${(props) => props.theme.colors.red['50']};
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.8rem;
  border: 0;

  :disabled {
    background-color: ${(props) => props.theme.colors.gray['700']};
    color: ${(props) => props.theme.colors.gray['100']};
  }

  :hover {
    transform: scale(1.05) translateY(-2px);
  }

  :active {
    transform: scale(0.95) translateY(1px);
    background-color: ${(props) => props.theme.colors.red['700']};
    color: ${(props) => props.theme.colors.red['100']};
  }
`

interface SearchBoxProps {
  searchQuery: string
  handleInputChange: ChangeEventHandler<HTMLInputElement>
  searchMovie: () => void
}

export default function SearchBox({
  searchQuery,
  handleInputChange,
  searchMovie,
}: SearchBoxProps): JSX.Element {
  return (
    <Container>
      <SearchWrapper>
        <Input
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search Movie titles..."
        />
        <SearchButton disabled={!searchQuery} onClick={searchMovie}>
          Search
        </SearchButton>
      </SearchWrapper>
    </Container>
  )
}
