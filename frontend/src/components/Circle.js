import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Auth from '../lib/authMethods'

const Circle = () => {

  const [circle, setCircle] = useState({})
  const [errors, setErrors] = useState({})
  const [username, setUsername] = useState({ username: '' })

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
        setUsername({ username: '' })  
        toast(resp.data.message)  
      })
      .catch(err => {
        toast(err.response.data.message)
      })

  }

  function handleChange (e) {
    setUsername({ username: e.target.value })
  }

  function handleApprove(e) {
    e.preventDefault
    axios.put('/api/circle', { username: e.target.id }, {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        setUsername({ username: '' })
        fetchCircleData()
        toast(resp.data.message)   
      })
      .catch(err => {
        toast(err.response.data.message)
      })
  }

  function handleDelete(e) {
    e.preventDefault
    axios.delete('/api/circle', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: { username: e.target.id }
    })
      .then(resp => {
        setUsername({ username: '' })
        fetchCircleData()
        toast(resp.data.message)  
      })
      .catch(err => {
        toast(err.response.data.message)  
      })
  }
  
  if (!circle) return <h1>Loading...</h1>

  return <section className="section">
    <div className="container">
      <h1 className="title">Your Circle</h1>

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
                  placeholder="Enter username to send request"
                  value={username.username}
                />
              </div>
            </div>
          </div>

          <div className="column column is-2-desktop is-4-tablet is-4-mobile has-text-right">
            <button className="button is-link" id="send-request">
              Send
            </button>
          </div>
        
        </div>
      </form>

      <section className="section">
        <div className="container">
          <h2 className="subtitle is-size-4 has-text-weight-bold">New requests</h2>
          {circle.requested && circle.requested.map((user, i) => {
            return <div key={i}>
              <div className="level is-mobile circle-level">
                <div className="level-left">
                  <div className="level-item">
                    <div className="is-size-6">{user.username}</div>
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
          {(!circle.requested || circle.requested.length === 0) && <div className="is-size-6 has-text-grey">No requests</div>}


        </div>
      </section>


      <section className="section">
        <div className="container">
          <h2 className="subtitle is-size-4 has-text-weight-bold">Current members</h2>
          {circle.approved && circle.approved.map((user, i) => {
            return <div key={i}>
              <div className="level is-mobile circle-level">
                <div className="level-left">
                  <div className="level-item">
                    <div className="is-size-6">{user.username}</div>
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
          {(!circle.approved || circle.approved.length === 0) && <div className="is-size-6 has-text-grey">No members added</div>}
        </div>
      </section>

    </div>
    
  </section>
}

export default Circle
