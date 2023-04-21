import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from 'redux'

const initialSatate = { value: 0 }

const INCREMENT = 'INCREMENT'
const ADD = 'ADD'

const incrementAction = { type: INCREMENT }

const increment = () => ({ type: INCREMENT })
const add = amount => ({ type: ADD, payload: amount })

const reducer = (state = initialSatate, action) => {
  //no matter what happens nothing changes
  //   return state
  if (action.type === INCREMENT) {
    return { value: state.value + 1 }
  }

  if (action.type === ADD) {
    return { value: state.value + action.payload }
  }

  return state
}

const store = createStore(reducer)

// call this func everytime the state changes
const subscriber = () => console.log('SUBSCRIBER', store.getState())

store.subscribe(subscriber)

store.dispatch(increment())
store.dispatch(increment())
store.dispatch(add(1000))
