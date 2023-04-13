export interface FormState {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

const formReducer = (state: FormState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case 'UPDATE_FIRST_NAME':
      return {
        ...state,
        firstName: payload
      }
    case 'UPDATE_LAST_NAME':
      return {
        ...state,
        lastName: payload
      }
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: payload
      }
    case 'UPDATE_PASSWORD':
      return {
        ...state,
        password: payload
      }
    default:
      return state
  }
}

export default formReducer
