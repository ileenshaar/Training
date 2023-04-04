import React, { useState, useEffect } from 'react'
import './style.css'
import axios from 'axios'

const Sudoku = () => {
  const [board, setBoard] = useState(
    Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => '.'))
  )

  const [solution, setSolution] = useState('')

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

  const handleSubmit = () => {
    const puzzle = board.map(row => row.join('')).join('')

    axios
      .post('http://127.0.0.1:5000', {
        sudoku: [puzzle]
      })
      .then(response => {
        setSolution(response.data.data[0].solution)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const generatePuzzle = () => {
    const generatedPuzzle = Array(81).fill(null)
    for (let i = 0; i < 9; i += 3) {
      const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]
      shuffleArray(values)
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          const index = (i + j) * 9 + (i + k)
          generatedPuzzle[index] = values[j * 3 + k]
        }
      }
    }

    for (let i = 0; i < generatedPuzzle.length; i++) {
      if (generatedPuzzle[i] === null) {
        let randomNumber = Math.floor(Math.random() * 9) + 1
        while (!checkBox(i, randomNumber)) {
          randomNumber = Math.floor(Math.random() * 9) + 1
        }
        checkColumn(i, randomNumber)
          ? checkRow(i, randomNumber)
            ? (generatedPuzzle[i] = randomNumber)
            : null
          : null
      }
    }

    const K = 20
    removeElements(generatedPuzzle, K)

    function removeElements(generatedPuzzle: number[], K: number): void {
      const row = Math.floor(Math.random() * 81) + 1

      if (generatedPuzzle[row] !== 0) {
        K--
        generatedPuzzle[row] = 0
      }
      K > 0 ? removeElements(generatedPuzzle, K) : null
    }

    function checkRow(index: number, randomNumber: number) {
      const row = Math.floor(index / 9)

      for (let i = 0; i < 9; i++) {
        if (randomNumber == generatedPuzzle[row * 9 + i]) {
          return false
        }
      }
      return true
    }

    function checkColumn(index: number, randomNumber: number) {
      const column = index % 9
      for (let i = 0; i < 9; i++) {
        const cellIndex = column + i * 9
        if (randomNumber === generatedPuzzle[cellIndex]) {
          return false
        }
      }
      return true
    }

    function checkBox(index: number, randomNumber: number) {
      const rowStart = Math.floor(Math.floor(index / 9) / 3) * 3
      const columnStart = Math.floor((index % 9) / 3) * 3
      for (let row = rowStart; row < rowStart + 3; row++) {
        for (let column = columnStart; column < columnStart + 3; column++) {
          const cellIndex = row * 9 + column
          if (randomNumber === generatedPuzzle[cellIndex]) {
            return false
          }
        }
      }
      return true
    }

    function shuffleArray(arr: number[]) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
    }

    return generatedPuzzle
  }

  useEffect(() => {
    const generatedPuzzle = generatePuzzle()

    const newBoard = board.map((row, rowIndex) => {
      return row.map((_, cellIndex) => {
        const index = rowIndex * 9 + cellIndex
        return generatedPuzzle[index] || '.'
      })
    })
    setBoard(newBoard)
  }, [])

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
    </div>
  )
}

export default Sudoku
