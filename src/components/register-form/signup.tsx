import React, { useState } from 'react'
import { validEmail, validPassword } from './Regex'
import './style.css'

const SignUp = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    emailErr: false,
    pwdError: false
  })

  const { firstName, lastName, email, password, emailErr, pwdError } = state

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
        placeholder="First Name"
        name="firstName"
        value={firstName}
        onChange={handleChange}
      />

      <input
        placeholder="Last Name"
        name="lastName"
        value={lastName}
        onChange={handleChange}
      />

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
      {pwdError && !validPassword.test(password) ? (
        <p className="sentence">Your password is invalid</p>
      ) : null}

      <button
        className="submitbutton"
        disabled={
          lastName &&
          firstName &&
          validEmail.test(email) &&
          validPassword.test(password)
            ? false
            : true
        }
      >
        Submit
      </button>
      {lastName && firstName && email && password ? null : (
        <p className="sentence">You must fill all fields</p>
      )}
    </>
  )
}

export default SignUp
