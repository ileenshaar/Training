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
      ) : (
        <p>{email}</p>
      )}
    </div>
  )
}

export default Profile
