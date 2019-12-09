import React from 'react'

const RegisterForm = () => (

  <section className="section">
    <div className="container">
      <div className="title">Register</div>
      <form className="form">
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Username
          </label>
          <div className="control">
            <input
              type="text"
              name="username"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Password
          </label>
          <div className="control">
            <input
              type="text"
              name="password"
              className="input"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Confirm Password
          </label>
          <div className="control">
            <input
              type="text"
              name="passwordConfirmation"
              className="input"
            />
          </div>
        </div>
        <button className="button is-info">
          Complete registration
        </button>
      </form>
    </div>
  </section>
)

export default RegisterForm 