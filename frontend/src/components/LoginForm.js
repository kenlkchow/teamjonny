import React, { useState } from 'react'
import axios from 'axios'

const initialData = {
  username: '',
  password: ''
}

const initialErrors = {
  username: '',
  password: ''
}

const LoginForm = () => {

  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState(initialErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/login', data)
      .then((response) => console.log(response.data))
      .catch(err => {
        setErrors( { ...errors, ...err.response.data.errors } )
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
      <div className="title">Login</div>
      <form className="form" onSubmit={handleSubmit}>
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
          </div>
        </div>
        <button className="button is-info">
          Login
        </button>
      </form>
    </div>
  </section>
}

export default LoginForm 