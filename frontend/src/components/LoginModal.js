import React, { useState, useEffect } from 'react'
import LoginForm  from './LoginForm'

const useModalLogin = () => {
  const [isLoginShowing, setIsLoginShowing] = useState(false)

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
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

const LoginModal = ({ isLoginShowing, hideLogin, props }) => isLoginShowing ?
  <div className="modal is-active">
    <div className="modal-background"></div>
    <div className="modal-content">
      < LoginForm props={props} />
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={hideLogin}></button>
  </div>
  : null


export { useModalLogin, LoginModal }