import React, { useContext, useReducer } from 'react'

import Grudges from './Grudges'
import NewGrudge from './NewGrudge'

import './styles.css'
import { GrudgeContext } from './GrudgeContext'
import initialState from './initialState'

const Application = () => {
  const { undo, isPast, redo, isFuture } = useContext(GrudgeContext)

  return (
    <div className="Application">
      <NewGrudge />
      <section>
        <button disabled={!isPast} onClick={undo}>
          Undo
        </button>
        <button disabled={!isFuture} onClick={redo}>
          Redo
        </button>
      </section>
      <Grudges />
    </div>
  )
}

export default Application
