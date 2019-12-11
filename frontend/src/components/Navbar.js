import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../lib/authMethods'
import Logo from '../images/logo.png'

const Navbar = (props) => {

  const [open, setOpen] = useState(false)

  function handleLogout() {
    Auth.logout()
    props.history.push('/')
    setOpen(false)
  }

  useEffect(() => {
    setOpen(false)
  }, [props.location.pathname])

  if (!Auth.isAuthorized()) return <></>
  return <div className="navbar is-transparent">
    <div className="container">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/map">
          <img src={Logo} height="28" id="logo" />
          <div className="logo">PLACEHOLDER</div>
        </Link>
        <a
          role="button"
          className={`navbar-burger burger ${open ? 'is-active' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${open ? 'is-active' : ''}`}>
        <div className="navbar-start">
          {Auth.isAuthorized() && <div className="navbar-item">
            <Link className="navbar-item" to="/list">List of locations</Link>
          </div>}
          {Auth.isAuthorized() && <div className="navbar-item">
            <Link className="navbar-item" to="/new">Add new location</Link>
          </div>}
        </div>
        <div className="navbar-end">
          {Auth.isAuthorized() && <div className="navbar-item">
            <Link className="navbar-item" to="/circle">Circle</Link>
          </div>}
          {Auth.isAuthorized() && <div className="navbar-item">
            <a className="navbar-item" onClick={() => handleLogout()}>Logout</a>
          </div>}
        </div>
      </div>
    </div>
  </div>
}


export default withRouter(Navbar)