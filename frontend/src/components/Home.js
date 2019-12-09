import React from 'react'

import { useModalRegister, RegisterModal } from './RegisterModal'
import { useModalLogin, LoginModal } from './LoginModal'

const Home = (props) => {
  const { toggleRegister, isRegisterShowing } = useModalRegister()
  const { toggleLogin, isLoginShowing } = useModalLogin()
  return (
    <section className="hero is-fullheight is-link">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">
            <a className="title" onClick={toggleRegister}>Register</a>
          </h1>
          <h1 className="title">
            <a className="title" onClick={toggleLogin}>Login</a>
          </h1>
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
