import React, { createContext, useReducer, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const initialState: FormState = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: ''
}

export interface FormState {
  firstName: string
  middleName: string
  lastName: string
  email: string
}

const reducer = (state: FormState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case 'SIGN-UP':
      return {
        ...state,
        firstName: payload.firstName,
        middleName: payload.middleName,
        lastName: payload.lastName,
        email: payload.email
      }
    case 'LOG-IN':
      return {
        ...state,
        email: payload.email
      }
    default:
      return state
  }
}

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

interface SignUpResponseData {
  firstName: string
  middleName: string
  lastName: string
  email: string
}

interface logInResponseData {
  email: string
}

const signUpApi = (
  firstName: string,
  middleName: string,
  lastName: string,
  email: string
): Promise<SignUpResponseData> => {
  {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ firstName, middleName, lastName, email })
      }, 2000)
    })
  }
}

const logInApi = (email: string): Promise<logInResponseData> => {
  {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ email })
      }, 2000)
    })
  }
}

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const navigate = useNavigate()

  const signUp = (
    fName: string,
    mName: string,
    lName: string,
    newEmail: string
  ) => {
    signUpApi(fName, mName, lName, newEmail)
      .then((responseData: SignUpResponseData) => {
        console.log(responseData)
        dispatch({
          type: 'SIGN-UP',
          payload: {
            firstName: responseData.firstName,
            middleName: responseData.middleName,
            lastName: responseData.lastName,
            email: responseData.email
          }
        })
      })
      .catch(error => {
        console.log(error)
      })

    navigate('./Profile')
  }

  const logIn = (newEmail: string) => {
    logInApi(newEmail)
      .then((responseData: logInResponseData) => {
        console.log(responseData)
        dispatch({
          type: 'LOG-IN',
          payload: {
            email: responseData.email
          }
        })
      })
      .catch(error => {
        console.log(error)
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
    throw new Error('fillForm must be used within fillContext')
  }

  return context
}

export default fillForm
