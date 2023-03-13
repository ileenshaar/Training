import React, { useState, useEffect } from 'react'
import { fetchMovies, movieData } from './List'
import { MovieData } from './types'
import { MovieList } from './MovieList'
import './App.css'

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [watchedIds, setWatchedIds] = useState<number[]>([])
  const [data, setData] = useState<MovieData[]>(movieData)

  const moveToWatched = (id: number) => {
    setWatchedIds([...watchedIds, id])
  }

  const removeFromWatched = (id: number) => {
    setWatchedIds(watchedIds.filter(item => item !== id))
  }

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await fetchMovies()
      setData(jsonData)
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className="header">
        <input
          placeholder="search"
          className="input"
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <MovieList
        listTitle={'To Watch List:'}
        list={data.filter(item => !watchedIds.includes(item.id))}
        addRemoveButton={'Watched'}
        moveToWatched={moveToWatched}
        searchQuery={searchQuery}
      />

      <div className="right-bar">
        <MovieList
          listTitle={'Watched List:'}
          list={data.filter(item => watchedIds.includes(item.id))}
          addRemoveButton={'Remove'}
          moveToWatched={removeFromWatched}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  )
}

export default App
