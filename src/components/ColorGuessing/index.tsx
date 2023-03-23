import React, { useState } from 'react'
import Colors from './Colors.'
import './index.css'

export const ColorGuessing = () => {
  const [currentColor, setCurrentColor] = useState(Colors[0])
  const [buttonColors, setButtonColors] = useState(
    getButtonColors(Colors, currentColor)
  )
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(-1)
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([])

  function getButtonColors(
    Colors: { name: string; hex: string }[],
    currentColor: { name: string; hex: string }
  ) {
    const otherColors = Colors.filter(color => color.hex !== currentColor.hex)

    const shuffledColors = otherColors.sort(() => 0.5 - Math.random())

    const buttonColors = shuffledColors.slice(0, 2)

    const allButtonColors = [currentColor, ...buttonColors].sort(
      () => 0.5 - Math.random()
    )

    return allButtonColors
  }

  const handleReset = () => {
    const newColor = Colors[Math.floor(Math.random() * Colors.length)]
    setCurrentColor(newColor)
    setButtonColors(getButtonColors(Colors, newColor))
    setCount(0)
    setWrongGuesses([])
  }

  const handleWrongGuesses = (index: number) => {
    console.log(wrongGuesses.length)
    console.log(wrongGuesses)

    const newColorset = Colors.filter(
      color => color.hex === wrongGuesses[index]
    )
    setCurrentColor(newColorset[0])
    setButtonColors(getButtonColors(Colors, newColorset[0]))
  }

  const handleButtonClick = (color: string) => {
    setCount(count + 1)
    if (color === currentColor.hex) {
      alert('You guessed correctly!')
    } else {
      setWrongGuesses([...wrongGuesses, currentColor.hex])
      alert('Sorry, that is incorrect.')
    }
    if (count < 5) {
      const newColorset = Colors.filter(color => color.hex !== currentColor.hex)
      const newColor =
        newColorset[Math.floor(Math.random() * newColorset.length)]
      setCurrentColor(newColor)
      setButtonColors(getButtonColors(Colors, newColor))
    } else {
      setCount2(count2 + 1)
      count2 < wrongGuesses.length - 1
        ? handleWrongGuesses(count2 + 1)
        : setWrongGuesses([])
    }
  }

  return (
    <div>
      <div
        className={`${
          count >= 5 && wrongGuesses.length == 0 ? 'disappear' : 'color-box'
        }`}
        style={{ backgroundColor: currentColor.hex }}
      ></div>
      <div className="button-container">
        {buttonColors.map(color => (
          <button
            key={color.hex}
            className={`${
              count >= 5 && wrongGuesses.length == 0
                ? 'disappear'
                : 'color-button'
            }`}
            onClick={() => handleButtonClick(color.hex)}
          >
            {color.hex}
          </button>
        ))}
      </div>
      <div className="reset-container">
        <button
          className={`${
            count >= 5 && wrongGuesses.length == 0 ? 'show' : 'disappear'
          }`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div
        className={`${
          count > 5 && wrongGuesses.length != 0 ? ' ' : 'disappear'
        }`}
      >
        Try guessing again{' '}
      </div>
    </div>
  )
}
export default ColorGuessing
