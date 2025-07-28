<template>
  <div class="settings-container fade-in-up">
    <el-card class="settings-card">
      <template #header>
        <div class="header-content">
          <div class="title-section">
            <div class="title-icon">
              <el-icon><Setting /></el-icon>
            </div>
            <div class="title-text">
              <h2>系統設定</h2>
              <p>查看和管理系統配置資訊</p>
            </div>
          </div>
        </div>
      </template>

      <div class="settings-content">
        <el-descriptions :column="1" border class="settings-descriptions">
          <el-descriptions-item label="API 基礎 URL">
            <div class="setting-value">
              <el-icon><LinkIcon /></el-icon>
              <el-tag type="info" effect="plain">{{ config.apiBaseUrl }}</el-tag>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="應用程式標題">
            <div class="setting-value">
              <el-icon><Document /></el-icon>
              <span>{{ config.appTitle }}</span>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="環境">
            <div class="setting-value">
              <el-icon><Monitor /></el-icon>
              <el-tag :type="config.isDevelopment ? 'success' : 'warning'" effect="dark">
                {{ config.isDevelopment ? '開發環境' : '生產環境' }}
              </el-tag>
            </div>
          </el-descriptions-item>

          <el-descriptions-item label="當前 Token">
            <div class="setting-value">
              <el-icon><Key /></el-icon>
              <el-tag v-if="currentToken" type="success" effect="dark">
                <el-icon><Check /></el-icon>
                已登入
              </el-tag>
              <el-tag v-else type="danger" effect="dark">
                <el-icon><Close /></el-icon>
                未登入
              </el-tag>
            </div>
          </el-descriptions-item>
        </el-descriptions>

        <div class="settings-actions">
          <el-button @click="refreshPage" class="action-btn refresh-btn">
            <el-icon><Refresh /></el-icon>
            重新整理
          </el-button>
          <el-button @click="clearToken" type="danger" class="action-btn clear-btn">
            <el-icon><Delete /></el-icon>
            清除 Token
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { config } from '../config'
import { ElMessage } from 'element-plus'
import {
  Setting,
  Link as LinkIcon,
  Document,
  Monitor,
  Key,
  Check,
  Close,
  Refresh,
  Delete,
} from '@element-plus/icons-vue'

export default {
  name: 'SettingsView',
  components: {
    Setting,
    LinkIcon,
    Document,
    Monitor,
    Key,
    Check,
    Close,
    Refresh,
    Delete,
  },
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
  min-height: calc(100vh - 70px);
}

.settings-card {
  border-radius: 16px;
  overflow: hidden;
}

.header-content {
  display: flex;
  align-items: center;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.title-icon {
  width: 50px;
  height: 50px;
  background: var(--primary-gradient);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  box-shadow: var(--shadow-md);
}

.title-text h2 {
  margin: 0 0 4px 0;
  color: var(--text-primary);
  font-size: 24px;
  font-weight: 600;
}

.title-text p {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
}

.settings-content {
  padding: 20px 0;
}

.settings-descriptions {
  margin-bottom: 40px;
}

.settings-descriptions :deep(.el-descriptions__header) {
  margin-bottom: 20px;
}

.settings-descriptions :deep(.el-descriptions__body) {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  overflow: hidden;
}

.settings-descriptions :deep(.el-descriptions__table) {
  border-radius: 12px;
  overflow: hidden;
}

.settings-descriptions :deep(.el-descriptions__label) {
  background: var(--primary-gradient);
  color: white;
  font-weight: 600;
  padding: 16px 20px;
  border: none;
}

.settings-descriptions :deep(.el-descriptions__content) {
  padding: 16px 20px;
  background: white;
  border: none;
}

.setting-value {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
  font-weight: 500;
}

.setting-value .el-icon {
  color: var(--primary-color);
  font-size: 16px;
}

.settings-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  min-width: 140px;
  justify-content: center;
}

.refresh-btn {
  background: var(--primary-gradient);
  border: none;
  color: white;
  box-shadow: var(--shadow-md);
}

.refresh-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.clear-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.clear-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .settings-container {
    padding: 10px;
  }

  .title-section {
    justify-content: center;
  }

  .settings-actions {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 100%;
    max-width: 280px;
  }
}
</style>
