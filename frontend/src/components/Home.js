import React from 'react'

import { useModalRegister, RegisterModal } from './RegisterModal'
import { useModalLogin, LoginModal } from './LoginModal'

const Home = () => {
  const { toggleRegister, isRegisterShowing } = useModalRegister()
  const { toggleLogin, isLoginShowing } = useModalLogin()
  return (
    <section className="hero is-fullheight is-link">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title" onClick={toggleRegister}>Register</h1>
          <h1 className="title" onClick={toggleLogin}>Login</h1>
        </div>
      </div>
      <RegisterModal
        isRegisterShowing={isRegisterShowing}
        hideRegister={toggleRegister}
      />
      <LoginModal
        isLoginShowing={isLoginShowing}
        hideLogin={toggleLogin}
      />
    </section>
  )
}

export default Home
