import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://sbwe6610.mooo.com',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

let isInterceptorSetup = false; // 인터셉터 설정 여부 확인

export const setupAxiosInterceptor = (navigate) => {
  if (isInterceptorSetup) return; // 이미 설정되어 있으면 중복 실행 방지
  
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        alert("로그인을 해주시기 바랍니다.");
        navigate('/login')
      }
      return Promise.reject(error)
    }
  )
  
  isInterceptorSetup = true; // 설정 완료 표시
}

export default axiosInstance