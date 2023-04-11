import React, { createContext, ReactNode } from 'react'

interface Props {
  children: ReactNode
  language: keyof typeof translations
}

export const translations = {
  en: {
    greeting: 'Hello',
    welcome: 'Welcome to my application',
    english: 'English',
    french: 'French'
  },
  fr: {
    greeting: 'Bonjour',
    welcome: 'Bienvenue sur mon application',
    english: 'Anglais',
    french: 'Français'
  }
}

export const TranslationsContext = createContext(translations.en)

export const TranslationsProvider = ({ children, language }: Props) => {
  const currentLanguage = translations[language] || translations.en

  return (
    <TranslationsContext.Provider value={currentLanguage}>
      {children}
    </TranslationsContext.Provider>
  )
}

export default TranslationsProvider
