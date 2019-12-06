import React, { useState, useEffect } from 'react'


const useModalLogin = () => {
  const [isLoginShowing, setIsLoginShowing] = useState(false)

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape'){
        setIsLoginShowing(false)
      }
    }
    window.addEventListener('keydown', listener)
  }, [])

  function toggleLogin() {
    setIsLoginShowing(!isLoginShowing)
  }

  return {
    isLoginShowing,
    toggleLogin
  }
}

const LoginModal = ({ isLoginShowing, hideLogin }) => isLoginShowing ?
  <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-content">
      <section className="section">
        <div className="container">
          <div className="title">Login</div>
          <form className="form">
            <div className="field">
              <label htmlFor="" className="label has-text-white">
                Username
              </label>
              <div className="control">
                <input
                  type="text"
                  name="username"
                  className="input"
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
                />
              </div>
            </div>
            <button className="button is-info">
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={hideLogin}></button>
  </div>
  : null


export { useModalLogin, LoginModal }