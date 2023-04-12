import React, { useState } from 'react'
import LogIn from './login'
import SignUp from './signup'
import './style.css'

const Application = () => {
  const [logInOrSignUp, setlogInOrSignUp] = useState('Login')

  return (
    <div className="app">
      <h1>{logInOrSignUp} Form</h1>
      <div>
        <button
          className={logInOrSignUp === 'Login' ? 'selected' : ''}
          onClick={() => setlogInOrSignUp('Login')}
        >
          Login
        </button>
        <button
          className={logInOrSignUp === 'Login' ? '' : 'selected'}
          onClick={() => setlogInOrSignUp('Signup')}
        >
          Signup
        </button>
      </div>
      {logInOrSignUp == 'Login' ? <LogIn /> : <SignUp />}
    </div>
  )
}

export default Application
