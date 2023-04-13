import { createContext, useReducer, useContext } from 'react'
import formReducer, { initialState } from './formReducer'

const formContext = createContext(initialState)

export const FormProvider = ({ children = null } = {}) => {
  const [state, dispatch] = useReducer(formReducer, initialState)
}

export default FormProvider
