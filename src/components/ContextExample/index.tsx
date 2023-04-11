import React, { useState } from 'react'
import { TranslationsProvider } from './languages'
import LanguagesSelector from './languagesSelector'
import Content from './content'
import './style.css'

const Application = () => {
  const [language, setLanguage] = useState<'en' | 'fr'>('en')

  return (
    <div className="App">
      <TranslationsProvider language={language}>
        <LanguagesSelector setLanguage={setLanguage}></LanguagesSelector>
        <Content />
      </TranslationsProvider>
    </div>
  )
}

export default Application
