<template>
  <el-menu :default-active="$route.path" class="navigation-menu" mode="horizontal" router>
    <el-menu-item index="/users">
      <el-icon><User /></el-icon>
      <span>用戶管理</span>
    </el-menu-item>

    <el-menu-item index="/products">
      <el-icon><Goods /></el-icon>
      <span>商品管理</span>
    </el-menu-item>

    <el-menu-item index="/categories">
      <el-icon><Folder /></el-icon>
      <span>分類管理</span>
    </el-menu-item>

    <el-menu-item index="/change-password">
      <el-icon><Lock /></el-icon>
      <span>更改密碼</span>
    </el-menu-item>

    <el-menu-item index="/settings">
      <el-icon><Setting /></el-icon>
      <span>系統設定</span>
    </el-menu-item>

    <div class="logout-container">
      <el-button type="danger" @click="logout" size="small"> 登出 </el-button>
    </div>
  </el-menu>
</template>

<script>
import { User, Goods, Folder, Lock, Setting } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'NavigationMenu',
  components: {
    User,
    Goods,
    Folder,
    Lock,
    Setting,
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      ElMessage.success('已登出')
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.navigation-menu {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logout-container {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.navigation-menu :deep(.el-menu-item) {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
