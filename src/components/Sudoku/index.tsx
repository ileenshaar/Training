import React from 'react'
import './index.css'

const Sudoku = () => {
  return (
    <div className="sudoku-grid">
      {[...Array(81)].map((_, i) => (
        <input key={i} type="text" maxLength={1} />
      ))}
    </div>
  )
}

export default Sudoku
