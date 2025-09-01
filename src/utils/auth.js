export const login = (token, userData) => {
    localStorage.setItem('authToken', token)
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    }
  }
  
  export const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }
  
  export const isLoggedIn = () => {
    return !!localStorage.getItem('authToken')
  }
  
  export const getUser = () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }






