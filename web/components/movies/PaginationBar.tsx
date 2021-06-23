import Link from "next/link"
import styled from "@emotion/styled"
import { useRouter } from "next/router"

const PagesBar = styled.nav`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.gray["600"]};
  height: 3.6rem;
  font-size: 2.4rem;
  align-self: flex-end;
  border-radius: 0.5rem;
`

interface PageCellProps extends React.HTMLAttributes<HTMLAnchorElement> {
  selected?: boolean
}

const PageCell = styled.a<PageCellProps>`
  width: 3.6rem;
  border: solid ${(props) => props.theme.colors.gray["600"]};
  border-width: 0 1px;
  text-align: center;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.gray["200"] : "transparent"};
  box-shadow: ${(props) =>
    props.selected
      ? "inset 0.25rem -0.25rem 0.5rem 0.5rem rgba(0,0,0,.15)"
      : "initial"};

  :first-of-type {
    border-width: 0 1px 0 0;
  }
  :last-of-type {
    border-width: 0 0 0 1px;
  }
`

interface PaginationProps {
  currentPage: number
  totalPages: number
}

const range = (from: number, to: number) => {
  let i = from
  const pages = []

  while (i <= to) {
    pages.push(i)
    i += 1
  }

  return pages
}

const LEFT_PAGE = "LEFT"
const RIGHT_PAGE = "RIGHT"

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter()
  const { query } = router.query

  const pageNumbers = () => {
    const pageNeighbours = 2
    const totalNumbers = pageNeighbours * 2 + 3
    const totalBlocks = totalNumbers + 2

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours)
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
      let pages = range(startPage, endPage)
      const hasLeftSpill = startPage > 2
      const hasRightSpill = totalPages - endPage > 1
      const spillOffset = totalNumbers - (pages.length + 1)
      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1)
          pages = [LEFT_PAGE, ...extraPages, ...pages]
          break
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset)
          pages = [...pages, ...extraPages, RIGHT_PAGE]
          break
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
          break
        }
      }

      return [1, ...pages, totalPages]
    }

    return range(1, totalPages)
  }

  if (totalPages === 1) {
    return null
  }

  return (
    <PagesBar>
      {pageNumbers().map((page) => {
        if (page === LEFT_PAGE)
          return (
            <>
              <Link href={`/search/${query}/${currentPage - 3}`}>
                <PageCell>&laquo;</PageCell>
              </Link>
              <Link href={`/search/${query}/${currentPage - 1}`}>
                <PageCell>&lt;</PageCell>
              </Link>
            </>
          )
        if (page === RIGHT_PAGE)
          return (
            <>
              <Link href={`/search/${query}/${currentPage + 1}`}>
                <PageCell>&gt;</PageCell>
              </Link>
              <Link href={`/search/${query}/${currentPage + 3}`}>
                <PageCell>&raquo;</PageCell>
              </Link>
            </>
          )
        return (
          <Link href={`/search/${query}/${page}`}>
            <PageCell selected={currentPage === page}>{page}</PageCell>
          </Link>
        )
      })}
    </PagesBar>
  )
}
