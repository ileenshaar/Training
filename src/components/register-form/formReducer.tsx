export interface FormState {
  firstName: string
  middleName: string
  lastName: string
  email: string
}

export const initialState: FormState = {
  firstName: '',
  middleName: '',
  lastName: '',
  email: ''
}

const formReducer = (state: FormState, action: any) => {
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

export default formReducer
