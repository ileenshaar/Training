import React from 'react'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, set } from './actions'
import { SetCounter } from './SetCounter'
import { useActions } from './use-actions'
import { useCounter } from './use-counter'

export const Counter = () => {
  const incident = 'Incident'
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()

  return (
    <main className="Counter">
      <h1>Days Since Last {incident}</h1>
      <p className="count">{count}</p>
      <section className="controls">
        <button
          onClick={() => {
            dispatch(increment())
          }}
        >
          Increment
        </button>
        <button
          onClick={() => {
            dispatch(set(0))
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            dispatch(decrement())
          }}
        >
          Decrement
        </button>
      </section>
      <SetCounter />
    </main>
  )
}

export default Counter

//another way:
//  const actions = bindActionCreators({ increment, decrement, set }, dispatch)
{
  /* <button
onClick={() => {
  actions.decrement()
}}
>
Decrement
</button> */
}

//or:
//const incident = 'Incident'
//  const count = useSelector(state => state.count)
//   const actions = useActions({ increment, set, decrement }, dispatch)
{
  /* <button
onClick={() => {
  actions.decrement()
}}
>
Decrement
</button> */
}

//or:
// const incident = 'Incident'
// const { count, increment, decrement, set } = useCounter()
{
  /* <button
onClick={() => {
  decrement()
}}
>
Decrement
</button> */
}
