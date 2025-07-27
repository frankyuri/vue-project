<template>
  <div class="settings-container">
    <el-card>
      <template #header>
        <h2>系統設定</h2>
      </template>

      <el-descriptions :column="1" border>
        <el-descriptions-item label="API 基礎 URL">
          <el-tag type="info">{{ config.apiBaseUrl }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="應用程式標題">
          {{ config.appTitle }}
        </el-descriptions-item>

        <el-descriptions-item label="環境">
          <el-tag :type="config.isDevelopment ? 'success' : 'warning'">
            {{ config.isDevelopment ? '開發環境' : '生產環境' }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="當前 Token">
          <el-tag v-if="currentToken" type="success">已登入</el-tag>
          <el-tag v-else type="danger">未登入</el-tag>
        </el-descriptions-item>
      </el-descriptions>

      <div class="settings-actions">
        <el-button @click="refreshPage">重新整理</el-button>
        <el-button @click="clearToken" type="danger">清除 Token</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { config } from '../config'
import { ElMessage } from 'element-plus'

export default {
  name: 'SettingsView',
  data() {
    return {
      config,
      currentToken: localStorage.getItem('token'),
    }
  },
  methods: {
    refreshPage() {
      window.location.reload()
    },
    clearToken() {
      localStorage.removeItem('token')
      this.currentToken = null
      ElMessage.success('Token 已清除')
    },
  },
}
</script>

<style scoped>
.settings-container {
  padding: 20px;
}

.settings-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>
