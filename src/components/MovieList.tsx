import { MovieData } from '../types'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import './styles.scss'

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

  const handleScroll = useCallback(() => {
    const container = containerRef.current

    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container
      if (scrollTop + clientHeight >= scrollHeight) {
        setFilteredList(prevList => {
          const nextItems = list.slice(prevList.length, prevList.length + 10)
          return [...prevList, ...nextItems]
        })
      }
    }
  }, [containerRef, list])

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
  }, [containerRef.current])

  useEffect(() => {
    const filteredList = list.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredList(filteredList.slice(0, 10))
  }, [searchQuery, list])

  return (
    <div className="list-contianer" ref={containerRef}>
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
