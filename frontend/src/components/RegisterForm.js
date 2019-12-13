import React, { useState } from 'react'
import axios from 'axios'

const initialData = {
  username: '',
  password: '',
  passwordConfirmation: ''
}

const initialErrors = {
  username: '',
  password: '',
  passwordConfirmation: ''
}

const RegisterForm = ({ hideRegister, hideLogin }) => {
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState(initialErrors)


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/register', data)
      .then(() => console.log('Well done'))
      .then(() => {
        hideRegister()
        hideLogin()
      })
      .catch(err => {
        setErrors({ ...errors, ...err.response.data.errors })
      })
  }

  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value }
    const newErrors = { ...errors, [e.target.name]: '' }
    setData(newData)
    setErrors(newErrors)
    console.log(data)
  }

  return <section className="section">
    <div className="container">
      <h1 className="title home-form-title">
        <div className="bracket-form is-size-1 has-text-white">[</div>
        <div className="title-name has-text-white has-text-weight-bold">Register</div>
        <div className="bracket-form has-text-white is-size-1">]</div>
      </h1>
      <form className="form form-home" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Username
          </label>
          <div className="control">
            <input
              type="text"
              name="username"
              className="input"
              onChange={handleChange}
            />
            {errors.username && <small className="help is-primary">Please pick a different username.</small>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Password
          </label>
          <div className="control">
            <input
              type="password"
              name="password"
              className="input"
              onChange={handleChange}
            />
            {errors.password && <small className="help is-primary">{errors.password}</small>}
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label has-text-white">
            Confirm Password
          </label>
          <div className="control">
            <input
              type="password"
              name="passwordConfirmation"
              className="input"
              onChange={handleChange}
            />
            {errors.passwordConfirmation && <small className="help is-primary">Password and Password Confirmation do not match. Dummy!</small>}
          </div>
        </div>
        <button className="button is-link">
          Complete registration
        </button>
      </form>
    </div>
  </section>
}

export default RegisterForm 