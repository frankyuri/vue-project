<template>
  <div class="categories-container">
    <el-card>
      <template #header>
        <div class="header-content">
          <h2>分類管理</h2>
          <el-button type="primary" @click="showAddDialog = true"> 新增分類 </el-button>
        </div>
      </template>

      <el-table :data="categories" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="分類名稱" />
        <el-table-column prop="description" label="描述" />
      </el-table>
    </el-card>

    <!-- 新增分類對話框 -->
    <el-dialog v-model="showAddDialog" title="新增分類" width="500px">
      <el-form :model="newCategory" :rules="rules" ref="categoryFormRef" label-width="100px">
        <el-form-item label="分類名稱" prop="name">
          <el-input v-model="newCategory.name" placeholder="請輸入分類名稱" />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            v-model="newCategory.description"
            type="textarea"
            :rows="3"
            placeholder="請輸入分類描述"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addCategory" :loading="adding"> 確定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage } from 'element-plus'

export default {
  name: 'CategoriesView',
  data() {
    return {
      loading: false,
      adding: false,
      categories: [],
      showAddDialog: false,
      newCategory: {
        name: '',
        description: '',
      },
      rules: {
        name: [{ required: true, message: '請輸入分類名稱', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      try {
        this.loading = true
        const res = await api.get('/api/categories')
        this.categories = res.data.categories
      } catch {
        ElMessage.error('取得分類列表失敗')
      } finally {
        this.loading = false
      }
    },

    async addCategory() {
      try {
        await this.$refs.categoryFormRef.validate()
        this.adding = true

        await api.post('/api/categories', this.newCategory)

        ElMessage.success('新增分類成功')
        this.showAddDialog = false
        this.resetForm()
        this.fetchCategories()
      } catch (error) {
        if (error.response?.data?.message) {
          ElMessage.error(error.response.data.message)
        } else {
          ElMessage.error('新增分類失敗')
        }
      } finally {
        this.adding = false
      }
    },

    resetForm() {
      this.newCategory = {
        name: '',
        description: '',
      }
      this.$refs.categoryFormRef?.resetFields()
    },
  },
}
</script>

<style scoped>
.categories-container {
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

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
