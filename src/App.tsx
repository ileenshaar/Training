import React, { useState, useEffect } from 'react'
import { fetchMovies, movieData } from './api'
import { MovieData } from './types'
import { MovieList } from './components/MovieList'
import './App.css'
import Application from './components/redux-course/tip-calculator/components/Application'
import store from './components/redux-course/tip-calculator/store'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Theme } from '@twilio-paste/core/theme'

export const App = () => {
  // const [searchQuery, setSearchQuery] = useState('')
  // const [watchedIds, setWatchedIds] = useState<number[]>([])
  // const [data, setData] = useState<MovieData[]>(movieData)

  // const moveToWatched = (id: number) => {
  //   setWatchedIds([...watchedIds, id])
  // }

  // const removeFromWatched = (id: number) => {
  //   setWatchedIds(watchedIds.filter(item => item !== id))
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const jsonData = await fetchMovies()
  //     setData(jsonData)
  //   }

  //   fetchData()
  // }, [])

  return (
    <div>
      <Provider store={store}>
        <Application />
      </Provider>
    </div>
  )
}

export default App
