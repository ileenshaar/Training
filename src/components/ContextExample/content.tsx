import React, { useContext } from 'react'
import { TranslationsContext } from './languages'

const Content = () => {
  const { greeting, welcome } = useContext(TranslationsContext)

  return (
    <>
      <div>{greeting}</div>
      <div>{welcome}</div>
    </>
  )
}

export default Content
