<template>
  <div class="products-container fade-in-up">
    <el-card class="products-card">
      <template #header>
        <div class="header-content">
          <div class="header-left">
            <div class="title-section">
              <div class="title-icon">
                <el-icon><Goods /></el-icon>
              </div>
              <div class="title-text">
                <h2>商品管理</h2>
                <p>管理系統中的所有商品資訊</p>
              </div>
            </div>
          </div>
          <div class="header-right">
            <el-button type="primary" @click="showAddDialog = true" class="add-btn">
              <el-icon><Plus /></el-icon>
              新增商品
            </el-button>
          </div>
        </div>
      </template>

      <div class="table-container">
        <el-table
          :data="products"
          v-loading="loading"
          class="products-table"
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
          <el-table-column prop="name" label="商品名稱" min-width="150">
            <template #default="scope">
              <div class="product-info">
                <div class="product-icon">
                  <el-icon><Goods /></el-icon>
                </div>
                <span class="product-name">{{ scope.row.name }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="價格" width="120" align="center">
            <template #default="scope">
              <el-tag type="success" effect="plain"> NT$ {{ scope.row.price }} </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="category_id" label="分類ID" width="100" align="center">
            <template #default="scope">
              <el-tag type="warning" effect="plain">{{ scope.row.category_id }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" min-width="200">
            <template #default="scope">
              <div class="description-text">
                {{ scope.row.description || '無描述' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!-- 新增商品對話框 -->
    <el-dialog v-model="showAddDialog" title="新增商品" width="600px" class="product-dialog">
      <el-form
        :model="newProduct"
        :rules="rules"
        ref="productFormRef"
        label-width="100px"
        class="product-form"
      >
        <el-form-item label="商品名稱" prop="name">
          <el-input v-model="newProduct.name" placeholder="請輸入商品名稱" class="form-input">
            <template #prefix>
              <el-icon><Goods /></el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item label="價格" prop="price">
          <el-input-number
            v-model="newProduct.price"
            :min="0"
            :precision="2"
            style="width: 100%"
            class="form-input-number"
            placeholder="請輸入價格"
          />
        </el-form-item>

        <el-form-item label="分類ID" prop="category_id">
          <el-input-number
            v-model="newProduct.category_id"
            :min="1"
            style="width: 100%"
            class="form-input-number"
            placeholder="請輸入分類ID"
          />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            v-model="newProduct.description"
            type="textarea"
            :rows="4"
            placeholder="請輸入商品描述"
            class="form-textarea"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showAddDialog = false" class="cancel-btn"> 取消 </el-button>
          <el-button type="primary" @click="addProduct" :loading="adding" class="confirm-btn">
            <el-icon v-if="!adding"><Plus /></el-icon>
            {{ adding ? '新增中...' : '確定' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage } from 'element-plus'
import { Goods, Plus } from '@element-plus/icons-vue'

export default {
  name: 'ProductsView',
  components: {
    Goods,
    Plus,
  },
  data() {
    return {
      loading: false,
      adding: false,
      products: [],
      showAddDialog: false,
      newProduct: {
        name: '',
        price: 0,
        category_id: 1,
        description: '',
      },
      rules: {
        name: [{ required: true, message: '請輸入商品名稱', trigger: 'blur' }],
        price: [{ required: true, message: '請輸入價格', trigger: 'blur' }],
        category_id: [{ required: true, message: '請輸入分類ID', trigger: 'blur' }],
      },
    }
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    async fetchProducts() {
      try {
        this.loading = true
        const res = await api.get('/api/products')
        this.products = res.data.products
      } catch {
        ElMessage.error('取得商品列表失敗')
      } finally {
        this.loading = false
      }
    },

    async addProduct() {
      try {
        await this.$refs.productFormRef.validate()
        this.adding = true

        await api.post('/api/products', this.newProduct)

        ElMessage.success('新增商品成功')
        this.showAddDialog = false
        this.resetForm()
        this.fetchProducts()
      } catch (error) {
        if (error.response?.data?.message) {
          ElMessage.error(error.response.data.message)
        } else {
          ElMessage.error('新增商品失敗')
        }
      } finally {
        this.adding = false
      }
    },

    resetForm() {
      this.newProduct = {
        name: '',
        price: 0,
        category_id: 1,
        description: '',
      }
      this.$refs.productFormRef?.resetFields()
    },
  },
}
</script>

<style scoped>
.products-container {
  padding: 20px;
  min-height: calc(100vh - 70px);
}

.products-card {
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

.add-btn {
  background: var(--primary-gradient);
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all var(--transition-normal) ease;
  box-shadow: var(--shadow-md);
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.table-container {
  margin-top: 20px;
}

.products-table {
  border-radius: 12px;
  overflow: hidden;
}

.products-table :deep(.el-table__header) {
  background: var(--primary-gradient);
}

.products-table :deep(.el-table__header th) {
  background: transparent !important;
  color: white !important;
  font-weight: 600 !important;
  border-bottom: none !important;
}

.products-table :deep(.el-table__body tr:hover) {
  background: rgba(6, 182, 212, 0.05) !important;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-icon {
  width: 32px;
  height: 32px;
  background: var(--primary-gradient);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
}

.product-name {
  font-weight: 500;
  color: var(--text-primary);
}

.description-text {
  color: #5a6c7d;
  line-height: 1.5;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 對話框樣式 */
.product-dialog :deep(.el-dialog__header) {
  background: var(--primary-gradient);
  color: white;
  padding: 20px 24px;
}

.product-dialog :deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
}

.product-form {
  padding: 20px 0;
}

.form-input :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.form-input :deep(.el-input__wrapper:hover) {
  box-shadow: var(--shadow-md);
  border-color: rgba(6, 182, 212, 0.3);
}

.form-input :deep(.el-input__wrapper.is-focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

.form-input-number :deep(.el-input-number__decrease),
.form-input-number :deep(.el-input-number__increase) {
  background: var(--primary-gradient);
  border: none;
  color: white;
}

.form-input-number :deep(.el-input__wrapper) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.form-textarea :deep(.el-textarea__inner) {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  resize: vertical;
}

.form-textarea :deep(.el-textarea__inner:hover) {
  box-shadow: var(--shadow-md);
  border-color: rgba(6, 182, 212, 0.3);
}

.form-textarea :deep(.el-textarea__inner:focus) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
}

.cancel-btn {
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.confirm-btn {
  background: var(--primary-gradient);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all var(--transition-normal) ease;
  box-shadow: var(--shadow-md);
}

.confirm-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
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
  .products-container {
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

  .add-btn {
    width: 100%;
    justify-content: center;
  }

  .description-text {
    max-width: 150px;
  }
}
</style>
