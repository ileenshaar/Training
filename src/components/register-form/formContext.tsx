import React, { createContext, useReducer, useContext } from 'react'
import formReducer, { initialState, FormState } from './formReducer'
import { useNavigate } from 'react-router-dom'

const formContext = createContext(initialState)

export interface FormContextState extends FormState {
  signUp: (
    fName: string,
    mName: string,
    lName: string,
    newEmail: string
  ) => void
  logIn: (newEmail: string) => void
}

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const navigate = useNavigate()

  const signUp = (
    fName: string,
    mName: string,
    lName: string,
    newEmail: string
  ) => {
    dispatch({
      type: 'SIGN-UP',
      payload: {
        firstName: fName,
        middleName: mName,
        lastName: lName,
        email: newEmail
      }
    })

    navigate('./Profile')
  }

  const logIn = (newEmail: string) => {
    dispatch({
      type: 'LOG-IN',
      payload: {
        email: newEmail
      }
    })

    navigate('./Profile')
  }

  const formContextState: FormContextState = {
    ...state,
    signUp,
    logIn
  }

  return (
    <formContext.Provider value={formContextState}>
      {children}
    </formContext.Provider>
  )
}

const fillForm = (): FormState => {
  const context = useContext(formContext)

  if (context === undefined) {
    throw new Error('fillForm must be used within ShopContext')
  }

  return context
}

export default fillForm
