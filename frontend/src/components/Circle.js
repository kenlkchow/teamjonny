import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Auth from '../lib/authMethods'

const initialState = {
  sendRequest: '',
  sendApprove: '',
  sendDelete: ''
}

const Circle = () => {

  const [circle, setCircle] = useState({})
  const [errors, setErrors] = useState(initialState)
  const [username, setUsername] = useState({ username: '' })
  const [message, setMessage] = useState(initialState)

  function fetchCircleData() {
    axios.get('/api/circle', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        console.log('API data', resp.data)
        setCircle(resp.data)
      })
      .catch(err => setErrors({ ...errors, ...err.response.data }))
  }

  useEffect(() => {
    fetchCircleData()
  }, [])

  function handleRequest (e) {
    e.preventDefault()
    axios.post('/api/circle', username, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        setMessage({ ...initialState, sendRequest: resp.data.message })
        setUsername({ username: '' })
        setErrors({ ...errors, sendRequest: '' })
      })
      .catch(err => {
        setMessage({ ...initialState })
        setErrors({ ...errors, sendRequest: err.response.data.message })
      })
  }

  function handleChange (e) {
    setUsername({ username: e.target.value })
    setErrors({ ...errors, sendRequest: '' })
  }

  function handleApprove(e) {
    e.preventDefault
    axios.put('/api/circle', { username: e.target.id }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        setMessage({ ...initialState, sendApprove: resp.data.message })
        setUsername({ username: '' })
        setErrors({ ...errors, sendApprove: '' })
        fetchCircleData()
      })
      .catch(err => {
        setErrors({ ...errors, sendApprove: err.response.data.message })
        setMessage({ ...initialState })
      })
  }

  function handleDelete(e) {
    e.preventDefault
    axios.delete('/api/circle', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: { username: e.target.id }
    })
      .then(resp => {
        setMessage({ ...initialState, sendDelete: resp.data.message })
        setUsername({ username: '' })
        setErrors({ ...errors, sendDelete: '' })
        fetchCircleData()
      })
      .catch(err => {
        setErrors({ ...errors, sendDelete: err.response.data.message })
        setMessage({ ...initialState })
      })
  }

  if (!circle) return <h1>Loading...</h1>

  return <section className="section">
    {console.log('username', username)}
    <div className="container">

      <h1 className="title">Your Circle</h1>

      <section className="section">
        <div className="container">
          
            
          <form className="form" onSubmit={handleRequest}>

            <div className="columns is-mobile">

              <div className="column is-10-desktop is-8-tablet is-8-mobile">
                <div className="field">
                  <div className="control">
                    <input
                      onChange={handleChange}
                      type="text"
                      name="username"
                      className="input"
                      placeholder="Type username"
                      value={username.username}
                    />
                  </div>
                </div>
              </div>

              <div className="column column is-2-desktop is-4-tablet is-4-mobile has-text-right">
                <button className="button is-link" id="send-request">
                  Send request
                </button>
                {errors.sendRequest && <small className="help is-danger">
                  {errors.sendRequest}
                </small>}
                {message.sendRequest && <small className="help is-success">
                  {message.sendRequest}
                </small>}
              </div>
            
            </div>
          </form>

          
        </div>
      </section>

      <div className="has-text-centered">
        {errors.sendApprove && <small className="help is-danger">
          {errors.sendApprove}
        </small>}
        {message.sendApprove && <small className="help is-success">
          {message.sendApprove}
        </small>}
        {errors.sendDelete && <small className="help is-danger">
          {errors.sendDelete}
        </small>}
        {message.sendDelete && <small className="help is-success">
          {message.sendDelete}
        </small>}
      </div>

      <section className="section">
        <div className="container">
          <h2 className="subtitle">New requests</h2>
          {circle.requested && circle.requested.map((user, i) => {
            return <div key={i}>
              <div className="level is-mobile circle-level">
                <div className="level-left">
                  <div className="level-item">
                    {user.username}
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button className="button is-link is-small circle-button" id={user.username} onClick={handleApprove}>
                      Approve request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          })}
          {(!circle.requested || circle.requested.length === 0) && <div className="is-size-7 has-text-grey">No requests</div>}


        </div>
      </section>


      <section className="section">
        <div className="container">
          <h2 className="subtitle">Current members</h2>
          {circle.approved && circle.approved.map((user, i) => {
            return <div key={i}>
              <div className="level is-mobile circle-level">
                <div className="level-left">
                  <div className="level-item">
                    {user.username}
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button className="button is-link is-small circle-button" id={user.username} onClick={handleDelete}>
                      Remove from circle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          })}
          {(!circle.approved || circle.approved.length === 0) && <div className="is-size-7 has-text-grey">No members added</div>}
        </div>
      </section>

    </div>
  </section>
}

export default Circle
