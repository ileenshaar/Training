import React, { useState } from 'react'
import { validEmail, validPassword } from './Regex'
import './style.css'
import fillForm, { FormContextState } from './formContext'

const LogIn = () => {
  const { logIn } = fillForm() as FormContextState

  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    emailErr: false,
    pwdError: false,
    loading: ''
  })

  const { email, password, emailErr, pwdError, loading } = state

  interface logInResponseData {
    email: string
  }

  const validateEmail = () => {
    if (!validEmail.test(email)) {
      setState(prevState => ({
        ...prevState,
        emailErr: true
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        emailErr: false
      }))
    }
  }

  const validatePassword = () => {
    if (!validPassword.test(password)) {
      setState(prevState => ({
        ...prevState,
        pwdError: true
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        pwdError: false
      }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const logInApi = (email: string): Promise<logInResponseData> => {
    {
      setState(prevState => ({
        ...prevState,
        loading: 'loading...'
      }))

      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ email })
        }, 2000)
      })
    }
  }

  const handleSubmit = () => {
    logInApi(email)
      .then((responseData: logInResponseData) => {
        console.log(responseData)

        logIn(responseData.email)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="loading">{loading}</div>

      <input
        type="email"
        placeholder="Email"
        value={email}
        name="email"
        onChange={handleChange}
        onBlur={validateEmail}
        className={emailErr && !validEmail.test(email) ? 'redBorder' : ''}
      />
      {emailErr && !validEmail.test(email) ? (
        <p className="sentence">Incorrect entry</p>
      ) : null}

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
        onBlur={validatePassword}
        className={pwdError && !validPassword.test(password) ? 'redBorder' : ''}
      />
      {pwdError && !validPassword.test(password) ? (
        <p className="sentence">Incorrect entry</p>
      ) : null}

      <button
        className="submitbutton"
        onClick={handleSubmit}
        disabled={
          validEmail.test(email) && validPassword.test(password) ? false : true
        }
      >
        Submit
      </button>
      {email && password ? null : (
        <p className="sentence2">Please fill all required fields</p>
      )}
    </>
  )
}

export default LogIn
