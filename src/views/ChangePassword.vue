<template>
  <div class="change-password-container">
    <el-card class="change-password-card">
      <template #header>
        <h2>更改密碼</h2>
      </template>

      <el-form
        @submit.prevent="changePassword"
        :model="form"
        :rules="rules"
        ref="formRef"
        label-width="120px"
      >
        <el-form-item label="舊密碼" prop="old_password">
          <el-input v-model="form.old_password" type="password" placeholder="請輸入舊密碼" />
        </el-form-item>

        <el-form-item label="新密碼" prop="new_password">
          <el-input v-model="form.new_password" type="password" placeholder="請輸入新密碼" />
        </el-form-item>

        <el-form-item label="確認新密碼" prop="confirm_password">
          <el-input
            v-model="form.confirm_password"
            type="password"
            placeholder="請再次輸入新密碼"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" style="width: 100%">
            更改密碼
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage } from 'element-plus'

export default {
  name: 'ChangePasswordView',
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.change-password-card {
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.change-password-card :deep(.el-card__header) {
  text-align: center;
  border-bottom: none;
}

.change-password-card h2 {
  margin: 0;
  color: #409eff;
  font-weight: 600;
}
</style>
