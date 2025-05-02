import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'https://home-try.13.125.102.156.sslip.io',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('authToken')
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

export const setupAxiosInterceptor = (navigate) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.status === 401 ||
        error.response?.data?.errorCode === 'Member400_001' ||
        error.response?.data?.errorCode === 'Auth400_001'
      ) {
        navigate('/login')
      }
      return Promise.reject(error)
    }
  )
}

export default axiosInstance
