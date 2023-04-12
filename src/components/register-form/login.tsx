import React, { useState } from 'react'
import { validEmail, validPassword } from './Regex'
import './style.css'

const LogIn = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    emailErr: false,
    pwdError: false
  })

  const { email, password, emailErr, pwdError } = state

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

  return (
    <>
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
        <p className="sentence">Your email is invalid</p>
      ) : null}

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
        onBlur={validatePassword}
        autoComplete="new-password"
        className={pwdError && !validPassword.test(password) ? 'redBorder' : ''}
      />

      <button
        className="submitbutton"
        disabled={
          validEmail.test(email) && validPassword.test(password) ? false : true
        }
      >
        Submit
      </button>
      {email && password ? null : (
        <p className="sentence">All fields are required</p>
      )}
    </>
  )
}

export default LogIn
