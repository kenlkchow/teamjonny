/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Link } from 'react-router-dom'

const RedirectHome = () => {
  return (
    <section className="hero is-fullheight is-link">
      <div className="hero-body">
        <div className="container has-text-centered">
          <figure className="image has-text-centered" id="redirectlogo">
            <img src="../images/logo.png"></img>
          </figure>
          <h1 className="title">
            Oh no! You're not logged in
          </h1>
          <Link to="/" className="title is-size-2 has-text-primary">Back to Homepage</Link>
        </div>
      </div>
    </section>
  )
}

export default RedirectHome