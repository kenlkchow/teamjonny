import React, { useState } from 'react'


const useModalRegister = () => {
  const [isRegisterShowing, setIsRegisterShowing] = useState(false)

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
    <button className="modal-close is-large" aria-label="close" onClick={hideRegister}></button>
  </div>
  : null


export { useModalRegister, RegisterModal }