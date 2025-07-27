<template>
  <div class="change-password-container">
    <div class="change-password-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>

    <div class="change-password-content fade-in-up">
      <div class="change-password-card">
        <div class="change-password-header">
          <div class="logo-container">
            <div class="logo-icon">
              <el-icon><Lock /></el-icon>
            </div>
          </div>
          <h1>更改密碼</h1>
          <p>請輸入您的舊密碼和新密碼</p>
        </div>

        <el-form
          @submit.prevent="changePassword"
          :model="form"
          :rules="rules"
          ref="formRef"
          class="change-password-form"
          label-width="120px"
        >
          <el-form-item label="舊密碼" prop="old_password">
            <el-input
              v-model="form.old_password"
              type="password"
              placeholder="請輸入舊密碼"
              size="large"
              class="custom-input"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="新密碼" prop="new_password">
            <el-input
              v-model="form.new_password"
              type="password"
              placeholder="請輸入新密碼"
              size="large"
              class="custom-input"
              show-password
            >
              <template #prefix>
                <el-icon><Key /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="確認新密碼" prop="confirm_password">
            <el-input
              v-model="form.confirm_password"
              type="password"
              placeholder="請再次輸入新密碼"
              size="large"
              class="custom-input"
              show-password
            >
              <template #prefix>
                <el-icon><Key /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              :loading="loading"
              size="large"
              class="change-password-btn"
            >
              <el-icon v-if="!loading"><Check /></el-icon>
              {{ loading ? '更改中...' : '更改密碼' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage } from 'element-plus'
import { Lock, Key, Check } from '@element-plus/icons-vue'

export default {
  name: 'ChangePasswordView',
  components: {
    Lock,
    Key,
    Check,
  },
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (value !== this.form.new_password) {
        callback(new Error('兩次輸入的新密碼不一致'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      form: {
        old_password: '',
        new_password: '',
        confirm_password: '',
      },
      rules: {
        old_password: [{ required: true, message: '請輸入舊密碼', trigger: 'blur' }],
        new_password: [
          { required: true, message: '請輸入新密碼', trigger: 'blur' },
          { min: 6, message: '新密碼至少6個字元', trigger: 'blur' },
        ],
        confirm_password: [
          { required: true, message: '請確認新密碼', trigger: 'blur' },
          { validator: validateConfirmPassword, trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    async changePassword() {
      try {
        await this.$refs.formRef.validate()
        this.loading = true

        await api.post('/api/change-password', {
          old_password: this.form.old_password,
          new_password: this.form.new_password,
        })

        ElMessage.success('密碼更改成功')
        this.resetForm()
      } catch (error) {
        if (error.response?.data?.message) {
          ElMessage.error(error.response.data.message)
        } else {
          ElMessage.error('密碼更改失敗')
        }
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.form = {
        old_password: '',
        new_password: '',
        confirm_password: '',
      }
      this.$refs.formRef?.resetFields()
    },
  },
}
</script>

<style scoped>
.change-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.change-password-background {
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.shape:hover {
  transform: scale(1.2) rotate(10deg);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
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

.change-password-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
}

.change-password-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(25px);
  border-radius: 28px;
  padding: 48px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: slideInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.change-password-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 35px 100px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(30px);
}

.change-password-header {
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

.change-password-header h1 {
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

.change-password-header p {
  margin: 0;
  color: #8e9aaf;
  font-size: 16px;
  transition: all 0.3s ease;
}

.change-password-form {
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

.change-password-btn {
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

.change-password-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.change-password-btn:hover::before {
  left: 100%;
}

.change-password-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 16px 45px rgba(102, 126, 234, 0.5);
}

.change-password-btn:active {
  transform: translateY(-1px) scale(1.01);
  transition: all 0.1s ease;
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
  .change-password-card {
    padding: 36px 24px;
    margin: 10px;
  }

  .logo-icon {
    width: 72px;
    height: 72px;
    font-size: 28px;
  }

  .change-password-header h1 {
    font-size: 28px;
  }

  .change-password-btn {
    height: 52px;
    font-size: 16px;
  }
}
</style>
