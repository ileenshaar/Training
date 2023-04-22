import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators
} from 'redux'

const reducer = (state = { count: 1 }) => state

const monitorEnhancer = createStore => (reducer, initialState, enhancer) => {
  const monitorReducer = (state, action) => {
    const start = performance.now()
    const newState = reducer(state, action)
    const end = performance.now()
    const diff = end - start
    console.log(diff)

    return newState
  }

  return createStore(monitorReducer, initialState, enhancer)
}

const logMiddleWare = store => next => action => {
  console.log('old state', store.getState(), action)
  next(action)
  console.log('new state', store.getState(), action)
}

const logEnhancer = createStore => (reducer, initialState, enhancer) => {
  const logReducer = (state, action) => {
    console.log('old state', state)
    const newState = reducer(state, action)
    console.log('new state', newState, action)

    return newState
  }

  return createStore(logReducer, initialState, enhancer)
}

const monitorMiddleware = (store = next => action => {
  const monitorReducer = (state, action) => {
    const start = performance.now()
    next(action)
    const end = performance.now()
    const diff = end - start
    console.log(diff)
  }
})

let store = createStore(
  reducer,
  applyMiddleware(logMiddleWare, monitorMiddleware)
)

store.dispatch({ type: 'hello' })
