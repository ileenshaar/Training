import { MovieData } from '../types'
import React, { useState, useEffect } from 'react'

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
  const [filteredList, setFilteredList] = useState(list)

  useEffect(() => {
    const filteredList = list.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredList(filteredList)
  }, [searchQuery, list])

  return (
    <div>
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
