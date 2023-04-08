import React, { useState, useEffect } from 'react'
//import ReactDOM from 'react-dom/client';

//import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList'
import isFunction from 'lodash/isFunction'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import dummyData from './dummy-data'

import CharacterView from './CharacterView'

import './styles.scss'
import endpoint from './endpoint'

const initialState = {
  characters: [],
  loading: true,
  error: null
}

const useThunkReducer = (reducer, initialState) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const enhancedDispatch = action => {
    console.log(action)
    // if this action is a function, pass it a copy of dispach and call it

    if (isFunction(action)) {
      //call it like a function and pass it a copy of dispach
      action(dispatch)
    } else {
      //do the normal thing if it is a function
      dispatch(action)
    }
  }

  return [state, enhancedDispatch]
}

const reducer = (state, action) => {
  if (action.type === 'LOADING') {
    return {
      characters: [],
      loading: true,
      error: null
    }
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      characters: action.payload.characters,
      loading: false,
      error: null
    }
  }

  if (action.type === 'ERROR') {
    return {
      characters: [],
      loading: false,
      error: action.payload.error
    }
  }
  return state
}
const fetchCharacters = dispatch => {
  dispatch({ type: 'LOADING' })
  fetch(endpoint + '/characters')
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: 'RESPONSE_COMPLETE',
        payload: {
          characters: response.characters
        }
      })
    })
    .catch(error => dispatch({ type: 'ERROR', payload: { error } }))
}

const Application = () => {
  const [state, dispatch] = useThunkReducer(reducer, initialState)
  const { characters } = state

  useEffect(() => {
    //dispatch a function
    dispatch(dispatch => {
      //
    })
  }, [])

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button
            onClick={() => {
              dispatch(fetchCharacters)
            }}
          >
            Fetch characters
          </button>
          <CharacterList characters={characters} />
        </section>
        <Router>
          <section className="CharacterView">
            <Route
              path="/characters/:id"
              component={props => {
                console.log(props.match.params.id)
                return <CharacterView {...props} />
              }}
            />
          </section>
        </Router>
      </main>
    </div>
  )
}

export default Application
