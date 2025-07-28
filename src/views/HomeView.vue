<script>
export default {
  name: 'HomeView',
}
</script>

<template>
  <div class="home-container">
    <div class="home-background">
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
        <div class="shape shape-6"></div>
      </div>
    </div>

    <div class="home-content">
      <div class="home-header fade-in-up">
        <div class="logo-container">
          <div class="logo-icon">
            <el-icon><Setting /></el-icon>
          </div>
        </div>
        <h1>後台管理系統</h1>
        <p>基於 Vue 3 + Element Plus 開發的現代化管理平台</p>
        <div class="tech-stack">
          <el-tag type="success" effect="dark" class="tech-tag">Vue 3</el-tag>
          <el-tag type="warning" effect="dark" class="tech-tag">Element Plus</el-tag>
          <el-tag type="info" effect="dark" class="tech-tag">Vite</el-tag>
          <el-tag type="danger" effect="dark" class="tech-tag">Pinia</el-tag>
        </div>
      </div>

      <div class="feature-grid fade-in-up" style="animation-delay: 0.3s">
        <div class="feature-card" @click="$router.push('/users')">
          <div class="feature-icon">
            <el-icon><User /></el-icon>
          </div>
          <h3>用戶管理</h3>
          <p>管理系統用戶，包含新增、編輯、刪除功能</p>
          <div class="feature-actions">
            <el-button type="primary" size="small" class="feature-btn">
              <el-icon><Right /></el-icon>
              進入管理
            </el-button>
          </div>
        </div>

        <div class="feature-card" @click="$router.push('/products')">
          <div class="feature-icon">
            <el-icon><Goods /></el-icon>
          </div>
          <h3>商品管理</h3>
          <p>管理商品資訊，支援分類管理</p>
          <div class="feature-actions">
            <el-button type="primary" size="small" class="feature-btn">
              <el-icon><Right /></el-icon>
              進入管理
            </el-button>
          </div>
        </div>

        <div class="feature-card" @click="$router.push('/categories')">
          <div class="feature-icon">
            <el-icon><Folder /></el-icon>
          </div>
          <h3>分類管理</h3>
          <p>管理商品分類，建立完整的商品體系</p>
          <div class="feature-actions">
            <el-button type="primary" size="small" class="feature-btn">
              <el-icon><Right /></el-icon>
              進入管理
            </el-button>
          </div>
        </div>
      </div>

      <div class="login-section fade-in-up" style="animation-delay: 0.6s">
        <h2>開始使用</h2>
        <p>登入系統開始管理您的資料</p>
        <div class="login-buttons">
          <el-button
            type="primary"
            size="large"
            @click="$router.push('/login')"
            class="btn btn-primary"
          >
            <el-icon><Right /></el-icon>
            立即登入
          </el-button>
          <el-button size="large" @click="$router.push('/register')" class="btn btn-secondary">
            <el-icon><UserFilled /></el-icon>
            註冊帳號
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

.home-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(14, 165, 233, 0.1));
  animation: float 10s ease-in-out infinite;
  transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.shape:hover {
  transform: scale(1.3) rotate(15deg);
  background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(14, 165, 233, 0.2));
  box-shadow: var(--shadow-md);
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 70%;
  right: 5%;
  animation-delay: 2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 10%;
  left: 15%;
  animation-delay: 4s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  top: 20%;
  right: 25%;
  animation-delay: 1s;
}

.shape-5 {
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  animation-delay: 3s;
}

.shape-6 {
  width: 90px;
  height: 90px;
  top: 80%;
  left: 60%;
  animation-delay: 5s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
  }
}

.home-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.home-header {
  text-align: center;
  margin-bottom: 100px;
  padding: 80px 40px;
  background: var(--bg-overlay);
  backdrop-filter: blur(25px);
  border-radius: 32px;
  box-shadow: var(--shadow-2xl);
  border: 1px solid var(--border-color);
  transition: all var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
}

.home-header:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  backdrop-filter: blur(30px);
}

.logo-container {
  margin-bottom: 40px;
}

.logo-icon {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  background: var(--primary-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
  box-shadow: var(--shadow-xl);
  transition: all var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.logo-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-icon:hover::before {
  left: 100%;
}

.logo-icon:hover {
  transform: scale(1.15) rotate(10deg);
  box-shadow: var(--shadow-2xl);
}

.home-header h1 {
  margin: 0 0 24px 0;
  color: var(--text-primary);
  font-size: 56px;
  font-weight: 700;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all var(--transition-normal) ease;
}

.home-header p {
  margin: 0 0 40px 0;
  color: var(--text-secondary);
  font-size: 20px;
  line-height: 1.6;
  transition: all var(--transition-normal) ease;
}

.tech-stack {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.tech-tag {
  transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.tech-tag:hover {
  transform: translateY(-4px) scale(1.1);
  box-shadow: var(--shadow-md);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 40px;
  margin-bottom: 100px;
}

.feature-card {
  background: var(--bg-overlay);
  backdrop-filter: blur(25px);
  border-radius: 24px;
  padding: 48px 36px;
  text-align: center;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
  transition: all var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.1), transparent);
  transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: var(--shadow-2xl);
  backdrop-filter: blur(30px);
}

.feature-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 32px;
  background: var(--primary-gradient);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 40px;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover .feature-icon::before {
  left: 100%;
}

.feature-card:hover .feature-icon {
  transform: scale(1.15) rotate(5deg);
  box-shadow: var(--shadow-xl);
}

.feature-card h3 {
  margin: 0 0 20px 0;
  color: var(--text-primary);
  font-size: 28px;
  font-weight: 600;
  transition: all var(--transition-normal) ease;
}

.feature-card p {
  margin: 0 0 32px 0;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 18px;
  transition: all var(--transition-normal) ease;
}

.feature-actions {
  margin-top: 24px;
}

.feature-btn {
  background: var(--primary-gradient);
  border: none;
  border-radius: 16px;
  padding: 12px 24px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.feature-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-btn:hover::before {
  left: 100%;
}

.feature-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: var(--shadow-lg);
}

.login-section {
  text-align: center;
  background: var(--bg-overlay);
  backdrop-filter: blur(25px);
  border-radius: 32px;
  padding: 80px 60px;
  box-shadow: var(--shadow-2xl);
  border: 1px solid var(--border-color);
  transition: all var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
}

.login-section:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-2xl);
  backdrop-filter: blur(30px);
}

.login-section h2 {
  margin: 0 0 20px 0;
  color: var(--text-primary);
  font-size: 40px;
  font-weight: 600;
  transition: all var(--transition-normal) ease;
}

.login-section p {
  margin: 0 0 50px 0;
  color: var(--text-secondary);
  font-size: 20px;
  transition: all var(--transition-normal) ease;
}

.login-buttons {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  border-radius: 16px;
  padding: 18px 36px;
  font-weight: 600;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all var(--transition-normal) cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 160px;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:hover::before {
  left: 100%;
}

.btn-primary {
  background: var(--primary-gradient);
  border: none;
  color: white;
  box-shadow: var(--shadow-lg);
}

.btn-primary:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: var(--shadow-xl);
}

.btn-secondary {
  background: var(--bg-secondary);
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  backdrop-filter: blur(15px);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
  transform: translateY(-4px) scale(1.05);
  box-shadow: var(--shadow-lg);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(60px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .home-content {
    padding: 20px 10px;
  }

  .home-header {
    padding: 60px 30px;
    margin-bottom: 80px;
  }

  .logo-icon {
    width: 100px;
    height: 100px;
    font-size: 40px;
  }

  .home-header h1 {
    font-size: 40px;
  }

  .home-header p {
    font-size: 18px;
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    margin-bottom: 80px;
  }

  .feature-card {
    padding: 40px 30px;
  }

  .login-section {
    padding: 60px 40px;
  }

  .login-section h2 {
    font-size: 32px;
  }

  .login-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 320px;
  }
}
</style>
