import React, { useState, useEffect } from 'react'


const useModalRegister = () => {
  const [isRegisterShowing, setIsRegisterShowing] = useState(false)

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape'){
        setIsRegisterShowing(false)
      }
    }
    window.addEventListener('keydown', listener)
  }, [])

  function toggleRegister() {
    setIsRegisterShowing(!isRegisterShowing)
  }

  return {
    isRegisterShowing,
    toggleRegister
  }
}

const RegisterModal = ({ isRegisterShowing, hideRegister }) => isRegisterShowing ?
  <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-content">
      <section className="section">
        <div className="container">
          <div className="title">Register</div>
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
            <div className="field">
              <label htmlFor="" className="label has-text-white">
                Confirm Password
              </label>
              <div className="control">
                <input
                  type="text"
                  name="passwordConfirmation"
                  className="input"
                />
              </div>
            </div>
            <button className="button is-info">
              Complete registration
            </button>
          </form>
        </div>
      </section>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={hideRegister}></button>
  </div>
  : null


export { useModalRegister, RegisterModal }