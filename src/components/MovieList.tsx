import { MovieData } from '../types'
import React, { useState, useEffect, useRef } from 'react'

interface MovieListProps {
  listTitle: string
  list: MovieData[]
  addRemoveButton: string
  moveToWatched: (id: number) => void
  searchQuery: string
}

export const MovieList: React.FC<MovieListProps> = ({
  listTitle,
  list,
  addRemoveButton,
  moveToWatched,
  searchQuery
}) => {
  const [filteredList, setFilteredList] = useState(list.slice(0, 10))
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const container = containerRef.current
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollTop + clientHeight >= scrollHeight) {
        const nextItems = list.slice(
          filteredList.length,
          filteredList.length + 10
        )
        setFilteredList([...filteredList, ...nextItems])
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [containerRef])

  useEffect(() => {
    const filteredList = list.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredList(filteredList.slice(0, 10))
  }, [searchQuery, list])

  return (
    <div ref={containerRef} className="Scroll">
      <p className="listTitle">{listTitle}</p>

      {filteredList && filteredList.length > 0 ? (
        <ul>
          {filteredList.map(item => (
            <li className="li" key={item.id}>
              <div className="square">
                <img className="avatar" src={item.poster} alt="MovieImage" />
                <div className="overlay">
                  <div className="description">
                    Overview: <br /> {item.overview}
                  </div>
                  <div className="description">
                    Genres: <br /> {item.genres.join(',')}
                  </div>
                  <div className="description">
                    Release_date: <br /> {item.release_date}
                  </div>
                </div>
                <div className="title">{item.title} </div>
                <button
                  onClick={() => moveToWatched(item.id)}
                  className="moveButton"
                >
                  {addRemoveButton}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
