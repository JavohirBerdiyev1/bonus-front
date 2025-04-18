import http from 'http' // http.js ni to'g'ri yo'ldan import qil

const loginPost = async (email, password) => {
  try {
    const response = await http.post('/auth/login', { email, password })
    // Axiosda asosiy ma'lumot response.data da bo‘ladi
    console.log('Axios response:', response)
    console.log('Axios response data:', response.data)

    return response.data // Shu ma'lumotni qaytaramiz
  } catch (error) {
    console.error('loginPost error:', error)
    throw error
  }
}

// Boshqa auth funktsiyalar (logout, refresh...) bo'lsa shu yerga qo'sh
export default {
  loginPost
}
