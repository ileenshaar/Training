import React, { useState } from 'react'
import Colors from './Colors.'
import './index.css'

export const ColorGuessing = () => {
  const [state, setState] = useState({
    currentColor: Colors[0],
    buttonColors: getButtonColors(Colors, Colors[0]),
    guessesCount: 0,
    wrongGuessesindex: -1,
    wrongGuesses: [] as string[]
  })

  const {
    currentColor,
    buttonColors,
    guessesCount,
    wrongGuessesindex,
    wrongGuesses
  } = state

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
    setState(prevState => ({
      ...prevState,
      currentColor: newColor,
      buttonColors: getButtonColors(Colors, newColor),
      guessesCount: 0,
      wrongGuesses: [],
      wrongGuessesindex: -1
    }))
  }

  const handleWrongGuesses = (index: number) => {
    console.log(wrongGuesses.length)
    console.log(wrongGuesses)

    const newColorset = Colors.filter(
      color => color.hex === wrongGuesses[index]
    )
    setState(prevState => ({
      ...prevState,
      currentColor: newColorset[0],
      buttonColors: getButtonColors(Colors, newColorset[0])
    }))
  }

  const handleButtonClick = (color: string) => {
    setState(prevState => ({
      ...prevState,

      guessesCount: prevState.guessesCount + 1
    }))
    if (color === currentColor.hex) {
      alert('You guessed correctly!')
    } else {
      setState(prevState => ({
        ...prevState,
        wrongGuesses: [...prevState.wrongGuesses, currentColor.hex]
      }))

      alert('Sorry, that is incorrect.')
    }
    if (guessesCount < 4) {
      const newColorset = Colors.filter(color => color.hex !== currentColor.hex)
      const newColor =
        newColorset[Math.floor(Math.random() * newColorset.length)]
      setState(prevState => ({
        ...prevState,
        currentColor: newColor,
        buttonColors: getButtonColors(Colors, newColor)
      }))
    } else {
      setState(prevState => ({
        ...prevState,

        wrongGuessesindex: prevState.wrongGuessesindex + 1
      }))
      wrongGuessesindex < wrongGuesses.length - 1
        ? handleWrongGuesses(wrongGuessesindex + 1)
        : setState(prevState => ({
            ...prevState,
            wrongGuesses: []
          }))
    }
  }

  return (
    <div>
      <div
        className={`${
          guessesCount >= 5 && wrongGuesses.length == 0
            ? 'disappear'
            : 'color-box'
        }`}
        style={{ backgroundColor: currentColor.hex }}
      ></div>
      <div className="button-container">
        {buttonColors.map(color => (
          <button
            key={color.hex}
            className={`${
              guessesCount >= 5 && wrongGuesses.length == 0
                ? 'disappear'
                : 'color-button'
            }`}
            onClick={() => handleButtonClick(color.hex)}
          >
            {color.hex}
          </button>
        ))}
      </div>
      <div
        className={`${
          guessesCount >= 5 && wrongGuesses.length == 0 ? '' : 'disappear'
        }`}
      >
        All guesses are correct
      </div>
      <div className="reset-container">
        <button
          className={`${
            guessesCount >= 5 && wrongGuesses.length == 0 ? 'show' : 'disappear'
          }`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div
        className={`${
          guessesCount > 5 && wrongGuesses.length != 0 ? ' ' : 'disappear'
        }`}
      >
        Try guessing again{' '}
      </div>
    </div>
  )
}
export default ColorGuessing
