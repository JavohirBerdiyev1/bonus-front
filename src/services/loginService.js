// services/loginService.js
import http from 'http/index'

const login = async (login, password) => {
  // POST to your login endpoint
  const response = await http.post('/auth/login', { login, password })
  return response.data
}

export default {
  login,
}