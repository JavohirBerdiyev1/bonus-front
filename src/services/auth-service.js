import { useEffect, useRef, useState } from 'react';
import http from 'http/index';
import { setToken } from 'store/auth/sessionSlice';
import store from 'store';
import loginService from './loginService';

export function logOut() {
  sessionStorage.removeItem('client-token');
}

// Custom hook: dastlabki renderda login qilmoqchi bo‘lsang, email va password ber
export function useAuthOne(email, password) {
  const isRun = useRef(false)
  const [isLogin, setIsLogin] = useState(false)

  // const login = async () => {
  //   try {
  //     // Auth service dagi loginPost ni chaqiramiz
  //     const data = await loginService.loginPost(email, password)

  //     console.log('Token:', data?.data?.accessToken?.token)

  //     if (data?.data?.accessToken?.token) {
  //       setIsLogin(true)
  //       // Tokenni saqlash
  //       sessionStorage.setItem('client-token', data.data.accessToken.token)
  //       // Redux store ga ham setToken(...) bilan yozish
  //       store.dispatch(setToken(data.data.accessToken.token))
  //     } else {
  //       console.error('Authentication failed', data?.message)
  //     }
  //   } catch (error) {
  //     console.error('Authentication error:', error)
  //   }
  // }

  useEffect(() => {
    // Faqat bir marta ishlasin
    if (isRun.current) return
    isRun.current = true

    // login()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [isLogin]
}



const loginPost = async (email, password) => {
  try {
    const response = await http.post('/auth/login', { email, password })
    console.log('Axios response:', response)
    console.log('Response data:', response.data)

    // axios javobida ma’lumot: response.data
    return response.data
  } catch (error) {
    console.error('Login request error:', error)
    throw error
  }
}

// Xohlasa logout, refresh kabi servislarni ham qo‘shsa bo‘ladi

export default {
  loginPost,
}