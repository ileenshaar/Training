import React, { useState } from 'react'

import CharacterList from './CharacterList'

import dummyData from './dummy-data'

import './styles.scss'
import endpoint from './endpoint'

const Application = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState([])
  const [error, setError] = useState([])

  React.useEffect(() => {
    setLoading(true)
    setCharacters([])
    setError(null)

    fetch(endpoint)
      .then(response => response.json())
      .then(response => {
        setLoading(false)
        setCharacters(response.characters)
      })
      .catch(error => {
        setLoading(false)
        setError(error)
      })
  }, [])

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? <p>Loading</p> : <CharacterList characters={characters} />}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  )
}

//const rootElement = document.getElementById('root');

// ReactDOM.render(
//   <Router>
//     <Application />
//   </Router>,
//   rootElement,
// );

export default Application
