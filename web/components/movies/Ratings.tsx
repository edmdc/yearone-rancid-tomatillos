import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { slideUp, slideDown, rightSlide } from '../../styles/keyframes'
import { ThumbsDown, ThumbsUp } from '../icons'

const RateButton = styled.button`
  width: 8rem;
  height: 4.2rem;
  border-radius: 8rem;
  margin-right: 2rem;
  background-color: ${(props) => props.theme.colors.gray['50']};
  display: flex;
  justify-content: space-between;

  svg {
    align-self: center;
    min-width: 3rem;
  }

  span {
    align-self: center;
    justify-self: baseline;
    font-size: 1.8rem;
    line-height: 2.7rem;
    font-weight: 700;
    margin-right: 1rem;
  }
`

type FeedbackProps = {
  slide: 'up' | 'down'
}

const Feedback = styled.span<FeedbackProps>`
  transform: ${(props) =>
    props.slide === 'up' ? 'translateY(3rem)' : 'translateY(-3rem)'};
  opacity: 0;
  animation: ${(props) => (props.slide === 'up' ? slideUp : slideDown)} 1.5s
    ${(props) => (props.slide === 'up' ? 'ease-out' : 'ease-in')};
  animation-delay: 100ms;
  margin-right: 0.5rem;
`

interface RatingProps {
  upVotes: number
  downVotes: number
  upVoteMovie: () => void
  downVoteMovie: () => void
}

const Ratings = ({
  upVotes,
  downVotes,
  upVoteMovie,
  downVoteMovie,
}: RatingProps): JSX.Element => {
  const [feedback, showFeedback] = useState<{ [feedback: string]: boolean }>({})

  useEffect(() => {
    const timeout = setTimeout(() => showFeedback(() => ({})), 2000)
    return () => clearTimeout(timeout)
  }, [feedback])

  const handleUpvote = async (e: React.MouseEvent) => {
    e.preventDefault()
    showFeedback({ liked: true })
    upVoteMovie()
  }

  const handleDownvote = async (e: React.MouseEvent) => {
    e.preventDefault()
    showFeedback({ mehd: true })
    downVoteMovie()
  }

  return (
    <div
      css={css`
        display: flex;
        margin: 2rem 0;
      `}
    >
      <RateButton
        onClick={handleUpvote}
        disabled={feedback.liked}
        css={
          feedback.liked &&
          css`
            animation: ${rightSlide} 1.5s ease-in-out;
          `
        }
      >
        <ThumbsUp />
        {feedback.liked ? (
          <Feedback slide="up">Liked!</Feedback>
        ) : (
          <span>{upVotes}</span>
        )}
      </RateButton>
      <RateButton
        onClick={handleDownvote}
        disabled={feedback.mehd}
        css={
          feedback.mehd &&
          css`
            animation: ${rightSlide} 2100ms ease-in-out;
          `
        }
      >
        <ThumbsDown />
        {feedback.mehd ? (
          <Feedback slide="down">Meh&#39;d</Feedback>
        ) : (
          <span>{downVotes}</span>
        )}
      </RateButton>
    </div>
  )
}

export default Ratings
