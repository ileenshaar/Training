import React, { useContext } from 'react'
import { TranslationsContext } from './languages'
import './style.css'

interface Props {
  setLanguage: React.Dispatch<React.SetStateAction<'en' | 'fr'>>
}

const LanguagesSelector = ({ setLanguage }: Props) => {
  const { english, french } = useContext(TranslationsContext)

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as 'en' | 'fr')
  }

  return (
    <select className="selector" onChange={handleLanguageChange}>
      <option value="en">{english}</option>
      <option value="fr">{french}</option>
    </select>
  )
}

export default LanguagesSelector
