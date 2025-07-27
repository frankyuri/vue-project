<template>
  <div class="navigation-wrapper">
    <el-menu :default-active="$route.path" class="navigation-menu" mode="horizontal" router>
      <div class="menu-left">
        <el-menu-item index="/users" class="menu-item">
          <el-icon><User /></el-icon>
          <span>用戶管理</span>
        </el-menu-item>

        <el-menu-item index="/products" class="menu-item">
          <el-icon><Goods /></el-icon>
          <span>商品管理</span>
        </el-menu-item>

        <el-menu-item index="/categories" class="menu-item">
          <el-icon><Folder /></el-icon>
          <span>分類管理</span>
        </el-menu-item>

        <el-menu-item index="/change-password" class="menu-item">
          <el-icon><Lock /></el-icon>
          <span>更改密碼</span>
        </el-menu-item>

        <el-menu-item index="/settings" class="menu-item">
          <el-icon><Setting /></el-icon>
          <span>系統設定</span>
        </el-menu-item>
      </div>

      <div class="menu-right">
        <div class="user-info">
          <el-avatar :size="36" class="user-avatar">
            <el-icon><User /></el-icon>
          </el-avatar>
          <span class="username">管理員</span>
        </div>
        <el-button type="danger" @click="logout" size="small" class="logout-btn">
          <el-icon><SwitchButton /></el-icon>
          登出
        </el-button>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { User, Goods, Folder, Lock, Setting, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'NavigationMenu',
  components: {
    User,
    Goods,
    Folder,
    Lock,
    Setting,
    SwitchButton,
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
.navigation-wrapper {
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(25px);
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.navigation-wrapper:hover {
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.98);
}

.navigation-menu {
  background: transparent !important;
  border: none !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  padding: 0 24px !important;
  height: 72px !important;
}

.menu-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu-item {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  height: 52px !important;
  margin: 0 6px !important;
  border-radius: 16px !important;
  font-weight: 600 !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative !important;
  overflow: hidden !important;
  backdrop-filter: blur(10px);
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item:hover::before {
  left: 100%;
}

.menu-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}

.menu-item:hover::after {
  width: 80%;
}

.menu-item:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  transform: translateY(-3px) scale(1.05) !important;
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4) !important;
}

.menu-item.is-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4) !important;
  transform: translateY(-3px) scale(1.05) !important;
}

.menu-item.is-active::after {
  width: 80%;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.user-info:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.user-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.user-info:hover .user-avatar {
  transform: scale(1.1) rotate(5deg);
}

.username {
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  transition: all 0.3s ease;
}

.user-info:hover .username {
  color: #667eea;
}

.logout-btn {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%) !important;
  border: none !important;
  border-radius: 16px !important;
  padding: 10px 20px !important;
  font-weight: 600 !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  position: relative !important;
  overflow: hidden !important;
}

.logout-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-btn:hover::before {
  left: 100%;
}

.logout-btn:hover {
  transform: translateY(-3px) scale(1.05) !important;
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.5) !important;
  background: linear-gradient(135deg, #ff5252 0%, #d32f2f 100%) !important;
}

.logout-btn:active {
  transform: translateY(-1px) scale(1.02) !important;
  transition: all 0.1s ease !important;
}

/* 動畫效果 */
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.navigation-wrapper {
  animation: slideInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item {
  animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
}

.menu-item:nth-child(1) {
  animation-delay: 0.1s;
}
.menu-item:nth-child(2) {
  animation-delay: 0.2s;
}
.menu-item:nth-child(3) {
  animation-delay: 0.3s;
}
.menu-item:nth-child(4) {
  animation-delay: 0.4s;
}
.menu-item:nth-child(5) {
  animation-delay: 0.5s;
}

.user-info {
  animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
}

.logout-btn {
  animation: fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.7s both;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .navigation-menu {
    padding: 0 12px !important;
    height: 64px !important;
  }

  .menu-left {
    gap: 4px;
  }

  .menu-item {
    padding: 0 8px !important;
    font-size: 12px !important;
    height: 44px !important;
  }

  .menu-item span {
    display: none;
  }

  .username {
    display: none;
  }

  .logout-btn span {
    display: none;
  }

  .user-info {
    padding: 8px 12px;
  }
}
</style>
