import { createContext } from 'react'
import createActions from './createActions'
import useAsyncReducer from '../../hooks/useAsyncReducer'
import reducer, { initialState } from './reducer'

export const MovieRatingContext = createContext({})

export const CounterProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
  const [state, dispatch] = useAsyncReducer(reducer, initialState)
  const actions = createActions(dispatch)

  return (
    <MovieRatingContext.Provider value={[state, actions]}>
      {children}
    </MovieRatingContext.Provider>
  )
}
