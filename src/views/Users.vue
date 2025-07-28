<template>
  <div class="users-container fade-in-up">
    <el-card class="users-card">
      <template #header>
        <div class="header-content">
          <div class="header-left">
            <div class="title-section">
              <div class="title-icon">
                <el-icon><User /></el-icon>
              </div>
              <div class="title-text">
                <h2>用戶管理</h2>
                <p>管理系統中的所有用戶帳號</p>
              </div>
            </div>
          </div>
          <div class="header-right">
            <el-input
              v-model="searchKeyword"
              placeholder="搜尋用戶名或 Email"
              class="search-input"
              clearable
              @input="handleSearch"
            >
              <template #prefix>
                <el-icon><SearchIcon /></el-icon>
              </template>
            </el-input>
          </div>
        </div>
      </template>

      <div class="table-container">
        <el-table
          :data="users"
          v-loading="loading"
          class="users-table"
          :header-cell-style="{
            background: 'var(--primary-gradient)',
            color: 'white',
          }"
        >
          <el-table-column prop="id" label="ID" width="80" align="center">
            <template #default="scope">
              <el-tag type="info" effect="plain">{{ scope.row.id }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="用戶名" min-width="120">
            <template #default="scope">
              <div class="user-info">
                <el-avatar :size="32" class="user-avatar">
                  <el-icon><User /></el-icon>
                </el-avatar>
                <span class="username">{{ scope.row.username }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="Email" min-width="200">
            <template #default="scope">
              <div class="email-info">
                <el-icon><Message /></el-icon>
                <span>{{ scope.row.email }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template #default="scope">
              <div class="action-buttons">
                <el-button
                  size="small"
                  type="primary"
                  @click="viewUser(scope.row)"
                  class="action-btn view-btn"
                >
                  <el-icon><ViewIcon /></el-icon>
                  查看
                </el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteUser(scope.row)"
                  :loading="scope.row.deleting"
                  class="action-btn delete-btn"
                >
                  <el-icon><Delete /></el-icon>
                  刪除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 用戶詳情對話框 -->
    <el-dialog v-model="dialogVisible" title="用戶詳情" width="500px" class="user-dialog">
      <div v-if="selectedUser" class="user-details">
        <div class="detail-item">
          <div class="detail-label">
            <el-icon><User /></el-icon>
            <span>用戶ID</span>
          </div>
          <div class="detail-value">
            <el-tag type="info" effect="plain">{{ selectedUser.id }}</el-tag>
          </div>
        </div>

        <div class="detail-item">
          <div class="detail-label">
            <el-icon><UserFilled /></el-icon>
            <span>用戶名</span>
          </div>
          <div class="detail-value">{{ selectedUser.username }}</div>
        </div>

        <div class="detail-item">
          <div class="detail-label">
            <el-icon><Message /></el-icon>
            <span>Email</span>
          </div>
          <div class="detail-value">{{ selectedUser.email }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search as SearchIcon,
  User,
  Message,
  View as ViewIcon,
  Delete,
  UserFilled,
} from '@element-plus/icons-vue'

export default {
  name: 'UsersView',
  components: {
    SearchIcon,
    User,
    Message,
    ViewIcon,
    Delete,
    UserFilled,
  },
  data() {
    return {
      loading: false,
      users: [],
      searchKeyword: '',
      dialogVisible: false,
      selectedUser: null,
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        this.loading = true
        const params = {}
        if (this.searchKeyword) {
          params.keyword = this.searchKeyword
        }

        console.log('🔍 開始取得用戶列表...')
        console.log('🔍 當前 token:', localStorage.getItem('token') ? '存在' : '不存在')

        const res = await api.get('/api/users', { params })
        console.log('✅ 用戶列表回應:', res.data)
        this.users = res.data.users
      } catch (error) {
        console.error('❌ 取得用戶列表失敗:', error)
        console.error('❌ 錯誤狀態:', error.response?.status)
        console.error('❌ 錯誤訊息:', error.response?.data)
        ElMessage.error('取得用戶列表失敗')
      } finally {
        this.loading = false
      }
    },

    handleSearch() {
      this.fetchUsers()
    },

    viewUser(user) {
      this.selectedUser = user
      this.dialogVisible = true
    },

    async deleteUser(user) {
      try {
        await ElMessageBox.confirm(`確定要刪除用戶 "${user.username}" 嗎？`, '確認刪除', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning',
        })

        user.deleting = true
        await api.delete(`/api/users/${user.id}`)

        ElMessage.success('刪除成功')
        this.fetchUsers()
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('刪除失敗')
        }
      } finally {
        // Vue 3 已不建議使用 $set，直接設定屬性即可
        user.deleting = false
      }
    },
  },
}
</script>

<style scoped>
.users-container {
  padding: 20px;
  min-height: calc(100vh - 70px);
}

.users-card {
  border-radius: 16px;
  overflow: hidden;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-left {
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

.header-right {
  display: flex;
  align-items: center;
}

.search-input {
  width: 300px;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.search-input :deep(.el-input__wrapper:hover) {
  box-shadow: var(--shadow-md);
  border-color: rgba(6, 182, 212, 0.3);
}

.search-input :deep(.el-input__wrapper.is-focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

.table-container {
  margin-top: 20px;
}

.users-table {
  border-radius: 12px;
  overflow: hidden;
}

.users-table :deep(.el-table__header) {
  background: var(--primary-gradient);
}

.users-table :deep(.el-table__header th) {
  background: transparent !important;
  color: white !important;
  font-weight: 600 !important;
  border-bottom: none !important;
}

.users-table :deep(.el-table__body tr:hover) {
  background: rgba(6, 182, 212, 0.05) !important;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  background: var(--primary-gradient);
  color: white;
}

.username {
  font-weight: 500;
  color: var(--text-primary);
}

.email-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
}

.email-info .el-icon {
  color: var(--primary-color);
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.action-btn {
  border-radius: 8px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
}

.view-btn {
  background: var(--primary-gradient);
  border: none;
}

.view-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.delete-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  border: none;
}

.delete-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
}

/* 用戶詳情對話框樣式 */
.user-details {
  padding: 20px 0;
}

.detail-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5a6c7d;
  font-weight: 500;
}

.detail-label .el-icon {
  color: var(--primary-color);
}

.detail-value {
  color: #2c3e50;
  font-weight: 500;
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
  .users-container {
    padding: 10px;
  }

  .header-content {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .title-section {
    justify-content: center;
  }

  .search-input {
    width: 100%;
  }

  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
