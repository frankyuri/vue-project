<script setup>
import { RouterView } from 'vue-router'
import Navigation from './components/Navigation.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 判斷是否顯示導航（只在需要認證的頁面顯示）
const showNavigation = computed(() => {
  return route.meta.requiresAuth
})
</script>

<template>
  <div id="app">
    <Navigation v-if="showNavigation" />
    <RouterView />
  </div>
</template>

<style>
#app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
}

body {
  margin: 0;
  padding: 0;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  line-height: 1.6;
}

/* 全域滾動條樣式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
  transition: background 0.3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Element Plus 全域樣式優化 */
.el-card {
  border-radius: 16px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08) !important;
  border: none !important;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.el-card:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12) !important;
}

.el-button {
  border-radius: 12px !important;
  font-weight: 600 !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative !important;
  overflow: hidden !important;
}

.el-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}

.el-button:hover::before {
  left: 100%;
}

.el-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.el-button:active {
  transform: translateY(0) !important;
  transition: all 0.1s ease !important;
}

.el-input__wrapper {
  border-radius: 12px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border: 2px solid transparent !important;
}

.el-input__wrapper:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(-1px) !important;
}

.el-input__wrapper.is-focus {
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15) !important;
  border-color: #667eea !important;
}

.el-table {
  border-radius: 16px !important;
  overflow: hidden !important;
  transition: all 0.3s ease !important;
}

.el-table th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
}

.el-table tr {
  transition: all 0.3s ease !important;
}

.el-table tr:hover {
  background: rgba(102, 126, 234, 0.05) !important;
  transform: scale(1.01) !important;
}

.el-dialog {
  border-radius: 20px !important;
  overflow: hidden !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.el-dialog__header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  padding: 24px 28px !important;
}

.el-dialog__title {
  color: white !important;
  font-weight: 600 !important;
}

.el-menu {
  border-radius: 0 !important;
}

.el-menu-item {
  border-radius: 12px !important;
  margin: 6px 10px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative !important;
  overflow: hidden !important;
}

.el-menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.6s;
}

.el-menu-item:hover::before {
  left: 100%;
}

.el-menu-item:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  transform: translateX(6px) scale(1.02) !important;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
}

.el-menu-item.is-active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4) !important;
  transform: translateX(6px) scale(1.02) !important;
}

/* 標籤動畫效果 */
.el-tag {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative !important;
  overflow: hidden !important;
}

.el-tag:hover {
  transform: translateY(-1px) scale(1.05) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

/* 表單元素動畫 */
.el-form-item {
  transition: all 0.3s ease !important;
}

.el-form-item:hover {
  transform: translateX(4px) !important;
}

/* 動畫效果 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-left {
  animation: slideInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-in-right {
  animation: slideInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-in {
  animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.bounce-in {
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* 載入動畫 */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .el-card {
    margin: 10px !important;
  }

  .el-button {
    font-size: 14px !important;
    padding: 10px 18px !important;
  }

  .el-menu-item {
    margin: 4px 6px !important;
  }
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .el-card {
    background: rgba(30, 30, 30, 0.95) !important;
  }
}
</style>
