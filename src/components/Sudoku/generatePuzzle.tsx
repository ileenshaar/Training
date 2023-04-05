const generatePuzzle = () => {
  const generatedPuzzle = Array(81).fill(null)

  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  for (let i = 0; i < 9; i += 3) {
    shuffleArray(values)

    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        const index = (i + j) * 9 + (i + k)
        generatedPuzzle[index] = values[j * 3 + k]
      }
    }
  }

  const fillPuzzle = (index: number): boolean => {
    if (index >= 81) {
      return true
    }

    if (generatedPuzzle[index] !== null) {
      return fillPuzzle(index + 1)
    }

    shuffleArray(values)
    for (const value of values) {
      if (
        checkRow(index, value) &&
        checkColumn(index, value) &&
        checkBox(index, value)
      ) {
        generatedPuzzle[index] = value

        if (fillPuzzle(index + 1)) {
          return true
        }
      }
    }

    generatedPuzzle[index] = null
    return false
  }

  fillPuzzle(0)

  const removedElementsCount = 55
  removeElements(generatedPuzzle, removedElementsCount)

  function removeElements(
    generatedPuzzle: number[],
    removedElementsCount: number
  ): void {
    const cell = Math.floor(Math.random() * 81) + 1

    if (generatedPuzzle[cell] !== 0) {
      removedElementsCount--
      generatedPuzzle[cell] = 0
    }
    removedElementsCount > 0
      ? removeElements(generatedPuzzle, removedElementsCount)
      : null
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

export default generatePuzzle
