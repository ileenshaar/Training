import React, { useState } from 'react'
import Colors from './Colors.'
import './index.css'

export const ColorGuessing = () => {
  const [currentColor, setCurrentColor] = useState(Colors[0])
  const [buttonColors, setButtonColors] = useState(
    getButtonColors(Colors, currentColor)
  )
  const [count, setCount] = useState(0)

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

  function handleButtonClick(color: string) {
    setCount(count + 1)
    if (color === currentColor.hex) {
      alert('You guessed correctly!')
    } else {
      alert('Sorry, that is incorrect.')
    }
    // Change the current color and button colors
    if (count < 5) {
      const newColorset = Colors.filter(color => color.hex !== currentColor.hex)
      const newColor =
        newColorset[Math.floor(Math.random() * newColorset.length)]
      setCurrentColor(newColor)
      setButtonColors(getButtonColors(Colors, newColor))
    }
  }

  return (
    <div>
      <div
        className="color-box"
        style={{ backgroundColor: currentColor.hex }}
      ></div>
      <div className="button-container">
        {buttonColors.map(color => (
          <button
            key={color.hex}
            className="color-button"
            onClick={() => handleButtonClick(color.hex)}
          >
            {color.hex}
          </button>
        ))}
      </div>
    </div>
  )
}
export default ColorGuessing
