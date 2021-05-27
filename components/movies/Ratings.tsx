import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { slideUp, slideDown } from '../../styles/keyframes'
import { ThumbsDown, ThumbsUp } from '../icons'

const RateButton = styled.button`
  width: 12rem;
  height: 4.2rem;
  border-radius: 8rem;
  margin-right: 2rem;
  background-color: ${(props) => props.theme.colors.gray['50']};
  display: flex;
  justify-content: space-between;

  svg {
    align-self: center;
  }

  span {
    align-self: center;
    justify-self: baseline;
    font-size: 1.8rem;
    line-height: 2.7rem;
    font-weight: 700;
    opacity: 0;
    margin-right: 0.5rem;
  }
`

const Ratings = () => {
  const [feedback, showFeedback] = useState<{ [feedback: string]: boolean }>({})

  useEffect(() => {
    const timeout = setTimeout(() => showFeedback(() => ({})), 2000)
    return () => clearTimeout(timeout)
  }, [feedback])

  return (
    <div
      css={css`
        display: flex;
        margin: 2rem 0;
      `}
    >
      <RateButton
        onClick={() => showFeedback({ liked: true })}
        disabled={feedback.liked}
      >
        <ThumbsUp />
        {feedback.liked && (
          <span
            css={css`
              transform: translateY(3rem);
              animation: ${slideUp} 1.8s ease-out;
            `}
          >
            Liked!
          </span>
        )}
      </RateButton>
      <RateButton
        onClick={() => showFeedback({ mehd: true })}
        disabled={feedback.liked}
      >
        <ThumbsDown />
        {feedback.mehd && (
          <span
            css={css`
              transform: translateY(-3rem);
              animation: ${slideDown} 1.8s ease-in;
            `}
          >
            Meh&#39;d
          </span>
        )}
      </RateButton>
    </div>
  )
}

export default Ratings
