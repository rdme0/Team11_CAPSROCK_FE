import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://sbwe6610.iptime.org:8081',
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
      if (error.response?.status === 401) {
        alert("로그인을 해주시기 바랍니다.");
        navigate('/api/login')
      }
      return Promise.reject(error)
    }
  )
}

export default axiosInstance
