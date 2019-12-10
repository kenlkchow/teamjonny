import React, { useState, useEffect } from 'react'
import RegisterForm from './RegisterForm'

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

const RegisterModal = ({ isRegisterShowing, hideRegister, hideLogin }) => isRegisterShowing ?
  <div className="modal is-active">
    <div className="modal-background" onClick={hideRegister}></div>
    <div className="modal-content">
      <RegisterForm 
        hideRegister={hideRegister}
        hideLogin={hideLogin}
      />
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={hideRegister}></button>
  </div>
  : null


export { useModalRegister, RegisterModal }