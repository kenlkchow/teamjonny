import React from 'react'

const LoginForm = () => (

  <section className="section">
    <div className="container">
      <div className="title">Login</div>
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
        <button className="button is-info">
          Login
        </button>
      </form>
    </div>
  </section>
)

export default LoginForm 