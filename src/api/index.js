import axios from 'axios'
import { config, showConfig } from '../config'

// 顯示當前設定（開發時）
showConfig()

const instance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
})

// 請求攔截器：自動加入 JWT token 和 ngrok header
instance.interceptors.request.use(
  (config) => {
    // 加入 ngrok-skip-browser-warning header 來避開警告頁面
    config.headers['ngrok-skip-browser-warning'] = 'true'
    config.headers['User-Agent'] = 'Custom-API-Client/1.0'

    const token = localStorage.getItem('token')
    console.log('🔍 當前請求 URL:', config.url)
    console.log('🔍 從 localStorage 讀取的 token:', token ? token.substring(0, 20) + '...' : 'null')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('✅ Authorization header 已設定')
    } else {
      console.log('⚠️ 沒有找到 token，跳過 Authorization header')
    }

    return config
  },
  (error) => {
    console.error('❌ 請求攔截器錯誤:', error)
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
