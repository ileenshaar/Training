import React, { useState } from 'react'
import './style.css'
import axios from 'axios'

const Sudoku = () => {
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '.'))
  )

  const [nullResponse, setNullResponse] = useState(false)

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
              return isNaN(Number(value)) ? '' : String(Number(value))
            }
            return cell
          })
        }
        return row
      })
      return newBoard
    })
  }

  const handleResponse = (solution: string) => {
    const newBoard = board.map((row, rowIndex) => {
      return row.map((_, cellIndex) => {
        const index = rowIndex * 9 + cellIndex
        return solution[index]
      })
    })
    setBoard(newBoard)
  }

  const handleSubmit = () => {
    const puzzle = board.map(row => row.join('')).join('')

    axios
      .post('http://127.0.0.1:5000', {
        sudoku: [puzzle]
      })
      .then(response => {
        const solution = response.data.data[0].solution
        solution !== null ? handleResponse(solution) : setNullResponse(true)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <div className="sudoku-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="adjacent">
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

      {nullResponse ? (
        <div className="sentence">
          The numbers do not follow the rules of sudoku{' '}
        </div>
      ) : null}
    </div>
  )
}

export default Sudoku
