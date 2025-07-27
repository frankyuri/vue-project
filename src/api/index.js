import axios from 'axios'
import { config, showConfig } from '../config'

// 顯示當前設定（開發時）
showConfig()

const instance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
})

// 請求攔截器：自動加入 JWT token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 回應攔截器：處理 401 錯誤
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default instance
