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
}

body {
  margin: 0;
  padding: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
    'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}
</style>
