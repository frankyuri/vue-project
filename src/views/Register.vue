<template>
  <div class="register-container">
    <div class="register-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
      </div>
    </div>

    <div class="register-content fade-in-up">
      <div class="register-card">
        <div class="register-header">
          <div class="logo-container">
            <div class="logo-icon">
              <el-icon><UserFilled /></el-icon>
            </div>
          </div>
          <h1>後台管理系統</h1>
          <h2>創建新帳號</h2>
          <p>請填寫以下資訊完成註冊</p>
        </div>

        <el-form
          @submit.prevent="register"
          :model="form"
          :rules="rules"
          ref="formRef"
          class="register-form"
        >
          <el-form-item label="用戶名" prop="username">
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

          <el-form-item label="確認密碼" prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="請再次輸入密碼"
              size="large"
              class="custom-input"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="Email" prop="email">
            <el-input
              v-model="form.email"
              placeholder="請輸入 Email"
              size="large"
              class="custom-input"
            >
              <template #prefix>
                <el-icon><Message /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              size="large"
              class="register-btn"
            >
              <el-icon v-if="!loading"><UserFilled /></el-icon>
              {{ loading ? '註冊中...' : '註冊' }}
            </el-button>
          </el-form-item>

          <div class="register-footer">
            <a href="#" @click.prevent="$router.push('/login')" class="login-link">
              <el-icon><Right /></el-icon>
              已有帳號？立即登入
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
import { User, Lock, UserFilled, Message, Right } from '@element-plus/icons-vue'

export default {
  name: 'RegisterView',
  components: {
    User,
    Lock,
    UserFilled,
    Message,
    Right,
  },
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('兩次輸入的密碼不一致'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
      },
      rules: {
        username: [
          { required: true, message: '請輸入用戶名', trigger: 'blur' },
          { min: 3, message: '用戶名至少3個字元', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          { min: 6, message: '密碼至少6個字元', trigger: 'blur' },
        ],
        confirmPassword: [
          { required: true, message: '請確認密碼', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '請輸入 Email', trigger: 'blur' },
          { type: 'email', message: '請輸入正確的 Email 格式', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    async register() {
      try {
        await this.$refs.formRef.validate()
        this.loading = true

        await api.post('/auth/register', {
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
        })

        ElMessage.success('註冊成功！')
        this.$router.push('/login')
      } catch (error) {
        if (error.response?.data?.message) {
          ElMessage.error(error.response.data.message)
        } else {
          ElMessage.error('註冊失敗，請稍後再試')
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.register-background {
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
  animation: float 6s ease-in-out infinite;
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.register-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
}

.register-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideInUp 0.8s ease-out;
}

.register-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo-container {
  margin-bottom: 20px;
}

.logo-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.register-header h1 {
  margin: 0 0 8px 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.register-header h2 {
  margin: 0 0 8px 0;
  color: #5a6c7d;
  font-size: 18px;
  font-weight: 500;
}

.register-header p {
  margin: 0;
  color: #8e9aaf;
  font-size: 14px;
}

.register-form {
  margin-top: 30px;
}

.custom-input :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.custom-input :deep(.el-input__wrapper:hover) {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
}

.custom-input :deep(.el-input__wrapper.is-focus) {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.register-btn {
  width: 100%;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.register-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
}

.register-btn:active {
  transform: translateY(0);
}

.register-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.login-link {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.login-link:hover {
  color: #764ba2;
  transform: translateX(4px);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: slideInUp 0.8s ease-out;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .register-card {
    padding: 30px 20px;
    margin: 10px;
  }

  .logo-icon {
    width: 60px;
    height: 60px;
    font-size: 24px;
  }

  .register-header h1 {
    font-size: 24px;
  }

  .register-header h2 {
    font-size: 16px;
  }
}
</style>
