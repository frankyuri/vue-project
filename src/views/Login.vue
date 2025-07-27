<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-header">
        <h1>後台管理系統</h1>
        <h2>用戶登入</h2>
      </div>

      <el-form
        @submit.prevent="login"
        :model="form"
        :rules="rules"
        ref="formRef"
        class="login-form"
      >
        <el-form-item label="帳號" prop="username">
          <el-input v-model="form.username" placeholder="請輸入用戶名" />
        </el-form-item>

        <el-form-item label="密碼" prop="password">
          <el-input v-model="form.password" type="password" placeholder="請輸入密碼" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" style="width: 100%">
            登入
          </el-button>
        </el-form-item>

        <div class="login-footer">
          <a href="#" @click.prevent="$router.push('/register')" class="register-link">
            沒有帳號？立即註冊
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
  name: 'LoginView',
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

        const res = await api.post('/auth/login', {
          username: this.form.username,
          password: this.form.password,
        })

        localStorage.setItem('token', res.data.token)
        ElMessage.success('登入成功！')
        this.$router.push('/users')
      } catch (error) {
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
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-content {
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.login-header h2 {
  margin: 0;
  color: #666;
  font-size: 16px;
  font-weight: 400;
}

.login-form {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-footer {
  text-align: center;
  margin-top: 20px;
}

.register-link {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
}

.register-link:hover {
  text-decoration: underline;
}
</style>
