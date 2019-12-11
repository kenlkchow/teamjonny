/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../images/logo.png'


const RedirectHome = () => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <figure className="image is-128x128 has-text-centered" >
            <img src={Logo} alt="" />
          </figure>
          <h1 className="title" id="logo-title">
            <div className="bracket is-size-1">[</div>
            <h1 className="title-name has-text-weight-bold">
              TeamJonny wants to get you there, but this ain't it, chief.
            </h1>
            <div className="bracket is-size-1">]</div>
          </h1>
          <Link to="/" className="title is-size-2 has-text-primary redirect-link">Back to Homepage</Link>
        </div>
      </div>
    </section>
  )
}

export default RedirectHome

{/* <section className="hero is-fullheight">
<div className="hero-body">
  <div className="container has-text-centered">
    <figure className="image has-text-centered is" id="redirectlogo">
      <img src="../images/logo.png"></img>
    </figure>
    <h1 className="title">
      Oh no! You're not logged in
    </h1>
    <Link to="/" className="title is-size-2 has-text-primary">Back to Homepage</Link>
  </div>
</div>
</section> */}