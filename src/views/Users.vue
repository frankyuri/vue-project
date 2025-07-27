<template>
  <div class="users-container">
    <el-card>
      <template #header>
        <div class="header-content">
          <h2>用戶管理</h2>
          <el-input
            v-model="searchKeyword"
            placeholder="搜尋用戶名或 Email"
            style="width: 300px"
            clearable
            @input="handleSearch"
          >
            <template #prefix>
              <el-icon><SearchIcon /></el-icon>
            </template>
          </el-input>
        </div>
      </template>

      <el-table :data="users" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用戶名" />
        <el-table-column prop="email" label="Email" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button size="small" @click="viewUser(scope.row)">查看</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteUser(scope.row)"
              :loading="scope.row.deleting"
            >
              刪除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 用戶詳情對話框 -->
    <el-dialog v-model="dialogVisible" title="用戶詳情" width="500px">
      <div v-if="selectedUser">
        <p><strong>ID:</strong> {{ selectedUser.id }}</p>
        <p><strong>用戶名:</strong> {{ selectedUser.username }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search as SearchIcon } from '@element-plus/icons-vue'

export default {
  name: 'UsersView',
  components: {
    SearchIcon,
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

        const res = await api.get('/api/users', { params })
        this.users = res.data.users
      } catch {
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
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h2 {
  margin: 0;
  color: #409eff;
}
</style>
