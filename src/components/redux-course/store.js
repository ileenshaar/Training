import React from 'react'
import { reducer } from './reducer'
import { createStore } from 'redux'

const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(reducer, enhancer)
