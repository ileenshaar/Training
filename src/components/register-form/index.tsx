import React, { useState } from 'react'
import { FormProvider } from './store'
import LogIn from './login'
import SignUp from './signup'
import Profile from './Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
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

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <FormProvider>
                <App />
              </FormProvider>
            }
          />
          <Route
            path="/profile"
            element={
              <FormProvider>
                <Profile />
              </FormProvider>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default AppRouter
