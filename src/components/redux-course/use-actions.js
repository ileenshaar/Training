import { useDispatch } from 'react-redux'
import { bindActionCreators, useMemo } from 'react'

export const useActions = actions => {
  const dispatch = useDispatch()
  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  )
}
