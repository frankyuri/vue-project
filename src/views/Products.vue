<template>
  <div class="products-container">
    <el-card>
      <template #header>
        <div class="header-content">
          <h2>商品管理</h2>
          <el-button type="primary" @click="showAddDialog = true"> 新增商品 </el-button>
        </div>
      </template>

      <el-table :data="products" v-loading="loading" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="商品名稱" />
        <el-table-column prop="price" label="價格" />
        <el-table-column prop="category_id" label="分類ID" />
        <el-table-column prop="description" label="描述" />
      </el-table>
    </el-card>

    <!-- 新增商品對話框 -->
    <el-dialog v-model="showAddDialog" title="新增商品" width="500px">
      <el-form :model="newProduct" :rules="rules" ref="productFormRef" label-width="100px">
        <el-form-item label="商品名稱" prop="name">
          <el-input v-model="newProduct.name" placeholder="請輸入商品名稱" />
        </el-form-item>

        <el-form-item label="價格" prop="price">
          <el-input-number v-model="newProduct.price" :min="0" :precision="2" style="width: 100%" />
        </el-form-item>

        <el-form-item label="分類ID" prop="category_id">
          <el-input-number v-model="newProduct.category_id" :min="1" style="width: 100%" />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            v-model="newProduct.description"
            type="textarea"
            :rows="3"
            placeholder="請輸入商品描述"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addProduct" :loading="adding"> 確定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from '../api'
import { ElMessage } from 'element-plus'

export default {
  name: 'ProductsView',
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
