import React, { useState } from 'react'
import { validEmail, validPassword } from './Regex'
import './style.css'
import fillForm, { FormContextState } from './store'

const SignUp = () => {
  const { signUp } = fillForm() as FormContextState

  const [state, setState] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    firstNameErr: false,
    lastNameErr: false,
    emailErr: false,
    pwdError: false
  })

  const {
    firstName,
    middleName,
    lastName,
    email,
    password,
    firstNameErr,
    lastNameErr,
    emailErr,
    pwdError
  } = state

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

  const validateFName = () => {
    if (firstName == '') {
      setState(prevState => ({
        ...prevState,
        firstNameErr: true
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        firstNameErr: false
      }))
    }
  }

  const validateLName = () => {
    if (lastName == '') {
      setState(prevState => ({
        ...prevState,
        lastNameErr: true
      }))
    } else {
      setState(prevState => ({
        ...prevState,
        lastNameErr: false
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

  const handleSubmit = () => {
    signUp(firstName, middleName, lastName, email)
  }

  return (
    <>
      <div className="displayname">
        {firstNameErr && <legend className="legend">Required*</legend>}
        <input
          placeholder="First Name*"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          onBlur={() => validateFName()}
        />

        <input
          placeholder="Middle Name"
          name="middleName"
          value={middleName}
          onChange={handleChange}
        />

        {lastNameErr && <legend className="legend">Required*</legend>}
        <input
          placeholder="Last Name*"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          onBlur={() => validateLName()}
        />
      </div>

      <input
        type="email"
        placeholder="Email*"
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
        placeholder="Password*"
        name="password"
        value={password}
        onChange={handleChange}
        onBlur={validatePassword}
        autoComplete="new-password"
        className={pwdError && !validPassword.test(password) ? 'redBorder' : ''}
      />
      {pwdError && !validPassword.test(password) ? (
        <p className="sentence">Incorrect entry</p>
      ) : null}

      <button
        className="submitbutton"
        onClick={handleSubmit}
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
        <p className="sentence2">Please fill all required fields</p>
      )}
    </>
  )
}

export default SignUp
