import React, { useState } from 'react'
import axios from 'axios'
import Auth from '../lib/authMethods'

import Logo from '../images/logo.png'


const initialData = {
  username: '',
  password: ''
}

const initialErrors = ''




const LoginForm = ({ props }) => {

  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState(initialErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', data)
      .then(resp => {
        console.log(resp.data.token)
        Auth.setToken(resp.data.token)
        // localStorage.setItem('token', resp.data.token)
        props.history.push('/map')
      })
      .catch(() => setErrors('Username or password incorrect')
      )
  }

  const handleChange = (e) => {
    const newData = { ...data, [e.target.name]: e.target.value }
    const newErrors = ''
    setData(newData)
    setErrors(newErrors)
    console.log(data)
  }

  return <section className="section">
    <div className="container">
      <div className="columns home-columns-login">
        <div className="column home-modal-title-login">
          <div className="title has-text-white">
            Login
          </div>
        </div>
        <div className="column">
          <figure className="image is-64x64">
            <img src={Logo}></img>
          </figure>
        </div>
      </div>
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
            {errors && <small className="help is-danger">{errors}</small>}
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
              onChange={handleChange}
            />
            {errors && <small className="help is-danger">{errors}</small>}
          </div>
        </div>
        <button className="button is-link">
          Login
        </button>
      </form>
    </div>
  </section>
}

export default LoginForm 