import React from 'react'
import fillForm from './store'
import './style.css'

const Profile = () => {
  const { firstName, middleName, lastName, email } = fillForm()

  return (
    <div className="profile">
      <p className="welcome">WELCOME TO YOUR PROFILE!</p>
      <br />
      {firstName ? (
        middleName ? (
          <div>
            <p className="fullname">
              {firstName} {middleName} {lastName}
            </p>
            <br />
            <br />
            <br />
            <p className="email">{email}</p>
          </div>
        ) : (
          <div>
            <p className="fullname">
              {firstName} {lastName}
            </p>
            <br />
            <p className="email">{email}</p>
          </div>
        )
      ) : email ? (
        <p>{email} </p>
      ) : (
        <p className="loading">Loading... </p>
      )}
    </div>
  )
}

export default Profile
