import React, { useState } from 'react'
import { validEmail, validPassword } from './Regex'
import './style.css'
import fillForm, { FormContextState } from './formContext'

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
    pwdError: false,
    loading: ''
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
    pwdError,
    loading
  } = state

  interface SignUpResponseData {
    firstName: string
    middleName: string
    lastName: string
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

  const signUpApi = (
    firstName: string,
    middleName: string,
    lastName: string,
    email: string
  ): Promise<SignUpResponseData> => {
    {
      setState(prevState => ({
        ...prevState,
        loading: 'loading...'
      }))

      return new Promise(resolve => {
        setTimeout(() => {
          resolve({ firstName, middleName, lastName, email })
        }, 2000)
      })
    }
  }

  const handleSubmit = () => {
    signUpApi(firstName, middleName, lastName, email)
      .then((responseData: SignUpResponseData) => {
        console.log(responseData)

        signUp(
          responseData.firstName,
          responseData.middleName,
          responseData.lastName,
          responseData.email
        )
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="loading">{loading}</div>

      <div className="displayname">
        {firstNameErr && <legend className="legend">Required*</legend>}
        <input
          placeholder="First Name"
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
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          onBlur={() => validateLName()}
        />
      </div>

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
