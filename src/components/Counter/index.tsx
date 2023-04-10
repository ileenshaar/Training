import React from 'react'
import Counter from './Counter'

import './styles.scss'

const Application = () => {
  return (
    <main className="Application">
      <section className="Counters">
        <Counter max={15} step={5} />
      </section>
    </main>
  )
}

export default Application
