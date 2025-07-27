<script>
export default {
  name: 'HomeView',
}
</script>

<template>
  <div class="home-container">
    <div class="home-header">
      <h1>後台管理系統</h1>
      <p>基於 Vue 3 + Element Plus 開發的傳統網頁應用程式</p>
    </div>

    <div class="home-content">
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">👥</div>
          <h3>用戶管理</h3>
          <p>管理系統用戶，包含新增、編輯、刪除功能</p>
          <a href="#" @click.prevent="$router.push('/users')" class="feature-link">進入管理</a>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📦</div>
          <h3>商品管理</h3>
          <p>管理商品資訊，支援分類管理</p>
          <a href="#" @click.prevent="$router.push('/products')" class="feature-link">進入管理</a>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📁</div>
          <h3>分類管理</h3>
          <p>管理商品分類，建立完整的商品體系</p>
          <a href="#" @click.prevent="$router.push('/categories')" class="feature-link">進入管理</a>
        </div>
      </div>

      <div class="login-section">
        <h2>系統登入</h2>
        <div class="login-buttons">
          <a href="#" @click.prevent="$router.push('/login')" class="btn btn-primary"> 立即登入 </a>
          <a href="#" @click.prevent="$router.push('/register')" class="btn btn-secondary">
            註冊帳號
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.home-header {
  background-color: #fff;
  padding: 40px 20px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.home-header h1 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 32px;
  font-weight: 600;
}

.home-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.home-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.feature-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.feature-card p {
  margin: 0 0 20px 0;
  color: #666;
  line-height: 1.6;
}

.feature-link {
  color: #409eff;
  text-decoration: none;
  font-weight: 500;
}

.feature-link:hover {
  text-decoration: underline;
}

.login-section {
  text-align: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-section h2 {
  margin: 0 0 30px 0;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

.login-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #409eff;
  color: #fff;
}

.btn-primary:hover {
  background-color: #337ecc;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e8e8e8;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .login-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>
