// 環境變數設定
export const config = {
  // API 基礎 URL
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://f4334e89f44d.ngrok-free.app',

  // 應用程式標題
  appTitle: import.meta.env.VITE_APP_TITLE || 'Vue 後台管理系統',

  // 開發環境
  isDevelopment: import.meta.env.DEV,

  // 生產環境
  isProduction: import.meta.env.PROD,
}

// 取得當前 API URL
export const getApiUrl = () => {
  return config.apiBaseUrl
}

// 顯示當前設定（開發時使用）
export const showConfig = () => {
  if (config.isDevelopment) {
    console.log('🔧 當前設定:', config)
  }
}
