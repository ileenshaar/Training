import React from 'react'
import fillForm from './formContext'
import './style.css'

const Profile = () => {
  const { firstName, middleName, lastName, email } = fillForm()
  console.log(email)

  return (
    <div className="profile">
      <p className="welcome">WELCOME TO YOUR PROFILE!</p>
      <br />
      {firstName ? (
        middleName ? (
          <p>
            <div className="fullname">
              {firstName} {middleName} {lastName}
            </div>
            <br />
            <br />
            <br />
            <p className="email">{email}</p>
          </p>
        ) : (
          <p>
            <div className="fullname">
              {firstName} {lastName}
            </div>
            <br />
            <p className="email">{email}</p>
          </p>
        )
      ) : (
        <p>{email}</p>
      )}
    </div>
  )
}

export default Profile
