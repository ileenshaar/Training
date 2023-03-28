import React, { useState, useEffect } from 'react'
import Colors from './Colors.'
import './index.css'

export const ColorGuessing = () => {
  const [state, setState] = useState({
    currentColor: Colors[0],
    buttonColors: getButtonColors(Colors, Colors[0]),
    guessesCount: 1,
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
    const boxColor = document.getElementById('colorBox')
    boxColor ? (boxColor.style.backgroundColor = currentColor.hex) : null
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
      wrongGuessesindex: -1
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

    if (guessesCount < 5) {
      const newColorset = Colors.filter(color => color.hex !== currentColor.hex)
      const newColor =
        newColorset[Math.floor(Math.random() * newColorset.length)]

      setState(prevState => ({
        ...prevState,
        currentColor: newColor,
        buttonColors: getButtonColors(Colors, newColor)
      }))
    }
  }

  useEffect(() => {
    if (guessesCount > 5) {
      console.log(wrongGuesses)
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
  }, [guessesCount])

  useEffect(() => {
    const classNames = {
      boxColor: document.getElementById('colorBox'),
      buttonsColor: document.querySelectorAll('.color-button'),
      allCorrect: document.getElementById('allCorrect'),
      reset: document.getElementById('reset'),
      tryAgain: document.getElementById('tryAgain')
    }

    const { boxColor, buttonsColor, allCorrect, reset, tryAgain } = classNames

    if (guessesCount > 5 && wrongGuesses.length == 0) {
      if (boxColor && buttonsColor && allCorrect && reset) {
        boxColor.className = 'disappear'
        buttonsColor.forEach(button => button.classList.add('disappear'))
        allCorrect.className = 'sentence'
        reset.className = 'show'
      }
    } else if (boxColor && buttonsColor && allCorrect && reset) {
      boxColor.className = 'color-box'
      buttonsColor.forEach(button => button.classList.remove('disappear'))
      allCorrect.className = 'disappear'
      reset.className = 'disappear'
    }
    if (tryAgain) {
      if (guessesCount > 5 && wrongGuesses.length != 0) {
        tryAgain.classList.remove('disappear')
      } else {
        tryAgain.classList.add('disappear')
      }
    }
  }, [wrongGuesses, guessesCount])

  return (
    <div className="background">
      <div id="colorBox" />

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

      <div id="allCorrect">All guesses are correct!</div>

      <div className="reset-container">
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div id="tryAgain">Try guessing again </div>
    </div>
  )
}
export default ColorGuessing
