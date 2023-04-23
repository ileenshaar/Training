import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, set } from './actions'
import { useActions } from './use-actions'

export const useCounter = () => {
  const count = useSelector(state => state.count)
  const actions = useActions({ increment, set, decrement })

  return { count, ...actions }
}
