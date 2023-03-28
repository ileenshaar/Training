import React, { useState, useEffect } from 'react'
import Colors from './Colors.'
import './index.css'

export const ColorGuessing = () => {
  const [state, setState] = useState({
    currentColor: Colors[0],
    buttonColors: getButtonColors(Colors, Colors[0]),
    guessesCount: 1,
    wrongGuessesIndex: -1,
    wrongGuesses: [] as string[]
  })
  const {
    currentColor,
    buttonColors,
    guessesCount,
    wrongGuessesIndex,
    wrongGuesses
  } = state

  function getButtonColors(
    Colors: { name: string; hex: string }[],
    currentColor: { name: string; hex: string }
  ) {
    console.log(currentColor)

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
      guessesCount: 1,
      wrongGuesses: [],
      wrongGuessesIndex: -1
    }))
  }

  const handleWrongGuesses = (index: number) => {
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
  }

  useEffect(() => {
    const boxColor = document.getElementById('colorBox')
    boxColor ? (boxColor.style.backgroundColor = currentColor.hex) : null
    if (guessesCount <= 5 && guessesCount > 1) {
      const newColorset = Colors.filter(color => color.hex !== currentColor.hex)
      const newColor =
        newColorset[Math.floor(Math.random() * newColorset.length)]

      setState(prevState => ({
        ...prevState,
        currentColor: newColor,
        buttonColors: getButtonColors(Colors, newColor)
      }))
    }
    if (guessesCount > 5) {
      setState(prevState => ({
        ...prevState,
        wrongGuessesIndex: prevState.wrongGuessesIndex + 1
      }))

      wrongGuessesIndex < wrongGuesses.length - 1
        ? handleWrongGuesses(wrongGuessesIndex + 1)
        : setState(prevState => ({
            ...prevState,
            wrongGuesses: []
          }))
    }
  }, [guessesCount, currentColor])

  return (
    <div className="background">
      <p>{currentColor.hex}</p>
      {guessesCount > 5 && wrongGuesses.length == 0 ? null : (
        <>
          <div id="colorBox" className="color-box" />
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
        </>
      )}
      {guessesCount > 5 && wrongGuesses.length == 0 ? (
        <>
          <div id="allCorrect" className="sentence">
            All guesses are correct!
          </div>
          <div className="reset-container">
            <button id="reset" onClick={handleReset} className="show">
              Reset
            </button>
          </div>
        </>
      ) : null}

      {guessesCount > 5 && wrongGuesses.length != 0 ? (
        <div id="tryAgain">Try guessing again </div>
      ) : null}
    </div>
  )
}
export default ColorGuessing
