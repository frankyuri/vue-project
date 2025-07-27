<template>
  <div class="login-container">
    <div class="login-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>

    <div class="login-content fade-in-up">
      <div class="login-card">
        <div class="login-header">
          <div class="logo-container">
            <div class="logo-icon">
              <el-icon><Setting /></el-icon>
            </div>
          </div>
          <h1>後台管理系統</h1>
          <h2>歡迎回來</h2>
          <p>請輸入您的帳號密碼進行登入</p>
        </div>

        <el-form
          @submit.prevent="login"
          :model="form"
          :rules="rules"
          ref="formRef"
          class="login-form"
        >
          <el-form-item label="帳號" prop="username">
            <el-input
              v-model="form.username"
              placeholder="請輸入用戶名"
              size="large"
              class="custom-input"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="密碼" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="請輸入密碼"
              size="large"
              class="custom-input"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              size="large"
              class="login-btn"
            >
              <el-icon v-if="!loading"><Right /></el-icon>
              {{ loading ? '登入中...' : '登入' }}
            </el-button>
          </el-form-item>

          <div class="login-footer">
            <a href="#" @click.prevent="$router.push('/register')" class="register-link">
              <el-icon><UserFilled /></el-icon>
              沒有帳號？立即註冊
            </a>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage } from 'element-plus'
import { User, Lock, Setting, Right, UserFilled } from '@element-plus/icons-vue'

export default {
  name: 'LoginView',
  components: {
    User,
    Lock,
    Setting,
    Right,
    UserFilled,
  },
  data() {
    return {
      loading: false,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '請輸入用戶名', trigger: 'blur' }],
        password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async login() {
      try {
        await this.$refs.formRef.validate()
        this.loading = true

        console.log('🔍 開始登入請求...')

        const res = await api.post('/auth/login', {
          username: this.form.username,
          password: this.form.password,
        })

        // 除錯：檢查回應格式
        console.log('🔍 完整登入回應:', res)
        console.log('🔍 回應狀態:', res.status)
        console.log('🔍 回應資料:', res.data)
        console.log('🔍 回應資料類型:', typeof res.data)

        // 檢查 token 格式 - 嘗試多種可能的格式
        let token = null
        if (res.data && typeof res.data === 'object') {
          // 檢查多層結構的 token
          token =
            res.data.token ||
            res.data.data?.token ||
            res.data.access_token ||
            res.data.accessToken ||
            res.data.jwt
          console.log('🔍 嘗試提取 token:', token ? token.substring(0, 20) + '...' : 'null')
        }

        if (!token) {
          console.error('❌ 無法從回應中提取 token')
          console.error('❌ 回應資料結構:', JSON.stringify(res.data, null, 2))
          throw new Error('回應中沒有找到 token')
        }

        // 儲存 token 到 localStorage
        try {
          localStorage.setItem('token', token)
          console.log('✅ Token 已儲存到 localStorage')

          // 驗證儲存是否成功
          const storedToken = localStorage.getItem('token')
          console.log('🔍 驗證儲存結果:', storedToken ? '成功' : '失敗')
          console.log(
            '🔍 儲存的 token:',
            storedToken ? storedToken.substring(0, 20) + '...' : 'null',
          )
        } catch (storageError) {
          console.error('❌ localStorage 儲存失敗:', storageError)
          throw new Error('無法儲存 token 到 localStorage')
        }

        ElMessage.success('登入成功！')
        this.$router.push('/users')
      } catch (error) {
        console.error('❌ 登入錯誤:', error)
        if (error.response?.data?.message) {
          ElMessage.error(error.response.data.message)
        } else {
          ElMessage.error('登入失敗，請檢查帳號密碼')
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  animation: float 8s ease-in-out infinite;
  transition: all 0.3s ease;
}

.shape:hover {
  transform: scale(1.2);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 120px;
  height: 120px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.shape-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.shape-4 {
  width: 100px;
  height: 100px;
  top: 10%;
  right: 30%;
  animation-delay: 1s;
}

.shape-5 {
  width: 70px;
  height: 70px;
  top: 40%;
  left: 50%;
  animation-delay: 3s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(180deg);
  }
}

.login-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 28px;
  padding: 48px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: slideInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 35px 100px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(30px);
}

.login-header {
  text-align: center;
  margin-bottom: 48px;
}

.logo-container {
  margin-bottom: 24px;
}

.logo-icon {
  width: 88px;
  height: 88px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.logo-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.8s;
}

.logo-icon:hover::before {
  left: 100%;
}

.logo-icon:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 16px 50px rgba(102, 126, 234, 0.5);
}

.login-header h1 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.login-header h2 {
  margin: 0 0 12px 0;
  color: #5a6c7d;
  font-size: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-header p {
  margin: 0;
  color: #8e9aaf;
  font-size: 16px;
  transition: all 0.3s ease;
}

.login-form {
  margin-top: 36px;
}

.custom-input :deep(.el-input__wrapper) {
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
}

.custom-input :deep(.el-input__wrapper:hover) {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.95);
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
  transform: translateY(-2px);
  background: white;
}

.custom-input :deep(.el-input__prefix) {
  color: #667eea;
  transition: all 0.3s ease;
}

.custom-input :deep(.el-input__wrapper:hover .el-input__prefix) {
  transform: scale(1.1);
}

.login-btn {
  width: 100%;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  font-weight: 600;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-btn:hover::before {
  left: 100%;
}

.login-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 45px rgba(102, 126, 234, 0.5);
}

.login-btn:active {
  transform: translateY(-1px) scale(1.01);
  transition: all 0.1s ease;
}

.login-footer {
  text-align: center;
  margin-top: 36px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.register-link {
  color: #667eea;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 8px 16px;
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.register-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
  transition: left 0.6s;
}

.register-link:hover::before {
  left: 100%;
}

.register-link:hover {
  color: #764ba2;
  transform: translateX(6px) scale(1.05);
  background: rgba(102, 126, 234, 0.1);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: slideInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .login-card {
    padding: 36px 24px;
    margin: 10px;
  }

  .logo-icon {
    width: 72px;
    height: 72px;
    font-size: 28px;
  }

  .login-header h1 {
    font-size: 28px;
  }

  .login-header h2 {
    font-size: 18px;
  }

  .login-btn {
    height: 52px;
    font-size: 16px;
  }
}
</style>
