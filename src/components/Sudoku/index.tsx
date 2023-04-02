import React, { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sudokoLibrary = require('sudoku')

const Sudoku = () => {
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '.'))
  )

  const [solution, setSolution] = useState('')

  useEffect(() => {
    const puzzle = sudokoLibrary.makepuzzle()

    const newBoard = board.map((row, rowIndex) => {
      return row.map((_, cellIndex) => {
        const index = rowIndex * 9 + cellIndex
        return puzzle[index] || '.'
      })
    })
    setBoard(newBoard)
  }, [])

  const handleOnChange = (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    setBoard(prevBoard => {
      const newBoard = prevBoard.map((row, rIndex) => {
        if (rIndex === rowIndex) {
          return row.map((cell, cIndex) => {
            if (cIndex === cellIndex) {
              return value
            }
            return cell
          })
        }
        return row
      })
      return newBoard
    })
  }

  const handleSubmit = () => {
    const puzzle = board.map(row => row.join('')).join('')
    axios
      .post('http://127.0.0.1:5000/', {
        sudoku: [puzzle]
      })
      .then(response => {
        setSolution(response.data.solution)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <div
        className="sudoku-grid"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="adjacent" style={{ display: 'flex' }}>
            {row.map((cell, cellIndex) => (
              <input
                key={cellIndex}
                type="text"
                maxLength={1}
                value={cell === '.' ? '' : cell}
                onChange={e =>
                  handleOnChange(rowIndex, cellIndex, e.target.value)
                }
              />
            ))}
          </div>
        ))}
      </div>

      <button onClick={() => handleSubmit()} className="submitButton">
        submit
      </button>
    </div>
  )
}

export default Sudoku
