import React from 'react'

import { useModalRegister, RegisterModal } from './RegisterModal'
import { useModalLogin, LoginModal } from './LoginModal'

import Logo from '../images/logo.png'

const Home = (props) => {
  const { toggleRegister, isRegisterShowing } = useModalRegister()
  const { toggleLogin, isLoginShowing } = useModalLogin()
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <figure className="image is-128x128 has-text-centered" >
            <img src={Logo} alt=""/>
          </figure>
          <h1 className="title" id="logo-title">
            <div className="bracket is-size-1">[</div>
            <div className="title-name has-text-weight-bold">PLACEHOLDER</div>
            <div className="bracket is-size-1">]</div>
          </h1>
          <div id="home-container">
            <h1 className="subtitle">
              <a className="subtitle is-size-4" onClick={toggleRegister}>Register</a>
            </h1>
            <h1 className="subtitle">
              <a className="subtitle is-size-4" onClick={toggleLogin}>Login</a>
            </h1>
          </div>
        </div>
      </div>
      <RegisterModal
        isRegisterShowing={isRegisterShowing}
        hideRegister={toggleRegister}
        hideLogin={toggleLogin}
      />
      <LoginModal
        isLoginShowing={isLoginShowing}
        hideLogin={toggleLogin}
        props={props}
      />
    </section>
  )
}

export default Home
