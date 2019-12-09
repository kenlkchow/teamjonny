class Auth {
  static setToken(token) {
    localStorage.clear()
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token')
  }

  static isAuthorized() {
    return this.getToken()
  }
}

export default Auth

