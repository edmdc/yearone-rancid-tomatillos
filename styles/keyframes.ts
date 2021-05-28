import { keyframes } from '@emotion/react'
import theme from './theme'

export const slideUp = keyframes`
  from {
    transform: traslateY(2rem);
    opacity: 0;
    color: ${theme.colors.gray['500']};
  }

  50% {
    opacity: 1;
    color: ${theme.colors.gray['800']};
    transform: translate3d(0);
  }

  70% {
    transform: scale(1) translateY(0rem);
    opacity: 1;
    color: ${theme.colors.gray['800']};
  }

  85% {
    transform: scale(1.1) translateY(-2.4rem);
    opacity: 0.5;
    color: ${theme.colors.gray['300']};
  }

  to {
    transform: scale(1.2) translateY(-3.6rem);
    color: ${theme.colors.gray['300']};
    opacity: 0;
  }
`

export const slideDown = keyframes`
  from {
    transform: scale(1.2) traslateY(-3rem);
    opacity: 0;
    color: ${theme.colors.gray['600']};
  }

  35% {
    opacity: 1;
    color: ${theme.colors.gray['800']};
    transform: scale(1) translateY(0);
  }

  40%, 58%, 72% {
    transform: translateY(0rem);
    opacity: 1;
  }

  49% {
    transform: translateY(-1rem);
    opacity: 1;
  }

  65% {
    transform: translateY(-0.8rem);
    opacity: 1;
  }

  90% {
    transform: scale(0.98) translateY(2rem);
    opacity: 0.8;
    color: ${theme.colors.gray['800']};
  }

  95% {
    transform: scale(0.95) translateY(3rem);
    color: ${theme.colors.gray['300']};
  }

  to {
    transform: scale(0.9) translateY(3.6rem);
    color: ${theme.colors.gray['300']};
    opacity: 0;
  }
`

export const rightSlide = keyframes`
  from {
    width: 8rem;
  }

  10%, 90% {
    width: 12rem;
  }

  to {
    width: 8rem;
  }
`
