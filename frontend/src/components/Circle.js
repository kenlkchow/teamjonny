import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Circle = () => {

  const [circle, setCircle] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    axios.get('/api/circle', {
      headers: { Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZGVhNjI5MDEwODA4N2RmMTY3Y2MxMDAiLCJpYXQiOjE1NzU2NDE4NzAsImV4cCI6MTU3NTcyODI3MH0.47LPwbEX6aQlPkkUZ0ilUmuXpcudDYy_f66SHgE-5Do' }
    })
      .then(resp => {
        console.log(resp.data)
        setCircle(resp.data)
      })
      .catch(err => setErrors({ ...errors, ...err.response.data }))
  }, [])

  function handleRequest (e) {
    e.preventDefault()
    return
  }

  function handleChange (e) {
    return
  }

  if (!circle) return <h1>Loading...</h1>

  return <section className="section">
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
                    />
                  </div>
                </div>
              </div>

              <div className="column column is-2-desktop is-4-tablet is-4-mobile has-text-right">
                <button className="button is-link" id="send-request">
                  Send request
                </button>
                {errors.message && <small className="help is-danger">
                  {errors.message}
                </small>}
              </div>
            
            </div>
          </form>

          
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="subtitle">New requests</h2>
          {circle.requested && circle.requested.map((user, i) => {
            return <div key={i}>
              <div className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    {user.username}
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button className="button is-link is-small circle-button">
                      Approve request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          })}

          {!circle.requested && <div className="is-size-7 has-text-grey">No requests</div>}


        </div>
      </section>


      <section className="section">
        <div className="container">
          <h2 className="subtitle">Current members</h2>
          {circle.approved && circle.approved.map((user, i) => {
            return <div key={i}>
              <div className="level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    {user.username}
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button className="button is-link is-small circle-button">
                      Remove from circle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          })}
          {!circle.approved && <div className="is-size-7 has-text-grey">No members added</div>}
        </div>
      </section>

    </div>
  </section>
}

export default Circle
