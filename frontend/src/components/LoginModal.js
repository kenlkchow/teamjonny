import React, { useState } from 'react'


const useModalLogin = () => {
  const [isLoginShowing, setIsLoginShowing] = useState(false)

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
              <label htmlFor="" className="label">
                Email
              </label>
              <div className="control">
                <input
                  type="text"
                  name="email"
                  className="input"
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={hideLogin}></button>
  </div>
  : null


export { useModalLogin, LoginModal }