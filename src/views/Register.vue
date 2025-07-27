<template>
  <div class="register-container">
    <div class="register-content">
      <div class="register-header">
        <h1>後台管理系統</h1>
        <h2>用戶註冊</h2>
      </div>

      <el-form
        @submit.prevent="register"
        :model="form"
        :rules="rules"
        ref="formRef"
        class="register-form"
      >
        <el-form-item label="用戶名" prop="username">
          <el-input v-model="form.username" placeholder="請輸入用戶名" />
        </el-form-item>

        <el-form-item label="密碼" prop="password">
          <el-input v-model="form.password" type="password" placeholder="請輸入密碼" />
        </el-form-item>

        <el-form-item label="確認密碼" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="請再次輸入密碼" />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="請輸入 Email" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" style="width: 100%">
            註冊
          </el-button>
        </el-form-item>

        <div class="register-footer">
          <a href="#" @click.prevent="$router.push('/login')" class="login-link">
            已有帳號？立即登入
          </a>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage } from 'element-plus'

export default {
  name: 'RegisterView',
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
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.register-content {
  width: 100%;
  max-width: 400px;
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.register-header h2 {
  margin: 0;
  color: #666;
  font-size: 16px;
  font-weight: 400;
}

.register-form {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.register-footer {
  text-align: center;
  margin-top: 20px;
}

.login-link {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
