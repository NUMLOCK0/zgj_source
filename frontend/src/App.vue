<template>
  <LoginView v-if="!currentUser" @login="handleLogin" />
  <div v-else class="app-shell">
    <header class="topbar">
      <div class="brand">
        <el-icon><Suitcase /></el-icon>
        <div>
          <strong>创赢工具箱</strong>
          <span>客户管理 · 运营 · 考勤</span>
        </div>
      </div>
      <div class="top-actions">
        <el-button :icon="isDark ? Sunny : Moon" text @click="toggleDark" :title="isDark ? '浅色模式' : '深色模式'" />
        <el-tag effect="plain">{{ currentUser.name || currentUser.username }}</el-tag>
        <el-button :icon="SwitchButton" text @click="logout">退出</el-button>
      </div>
    </header>

    <SidebarMenu
      v-if="!isMobile"
      v-model:collapsed="sidebarCollapsed"
      :menu="sidebarMenu"
      :width="'184px'"
      :width-collapsed="'64px'"
      :show-one-child="true"
      theme="white-theme"
      class="app-sidebar"
    />

    <main class="main" :class="{ mobile: isMobile, collapsed: sidebarCollapsed && !isMobile }">
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component
            :is="Component"
            :user="currentUser"
            :has-perm="hasPerm"
            :reload-signal="reloadCustomersSignal"
            @registered="reloadCustomersSignal++"
            @user-updated="refreshMe"
            @logout="logout"
          />
        </Transition>
      </RouterView>
    </main>

    <div v-if="!isOnline" class="network-banner">网络连接已断开，请检查网络</div>

    <nav v-if="isMobile" class="mobile-nav">
      <button
        v-for="item in visibleNav"
        :key="item.key"
        :class="{ active: isNavActive(item) }"
        @click="item.children ? go('settings-profile') : go(item.key)"
      >
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed, onErrorCaptured, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { SidebarMenu } from 'vue-sidebar-menu'
import { ElMessage } from 'element-plus'
import { Collection, DataAnalysis, DocumentChecked, Setting, Suitcase, SwitchButton, Clock, TrendCharts, Moon, Sunny } from '@element-plus/icons-vue'
import LoginView from './views/LoginView.vue'
import { authApi } from './services/api'
import { useResponsive } from './composables/useResponsive'

const { isMobile } = useResponsive()
const route = useRoute()
const router = useRouter()
const currentUser = ref(null)
const reloadCustomersSignal = ref(0)
const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)
const isDark = ref(typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark')

function toggleDark() {
  isDark.value = !isDark.value
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = isDark.value ? 'dark' : ''
  }
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }
}

const nav = [
  { key: 'customer', label: '客户管理', icon: Collection, any: ['extract', 'viewData', 'leadStats'] },
  { key: 'operation', label: '运营管理', icon: TrendCharts, any: ['taskManage', 'qrGen', 'roiView'] },
  // { key: 'punch', label: '考勤打卡', icon: Clock, any: ['punchUse', 'punchView'] },
  { key: 'settings', label: '设置', icon: Setting, always: true, children: true }
]
const settingsChildren = [
  { key: 'settings-profile', label: '个人设置' },
  { key: 'settings-accounts', label: '账号管理', admin: true },
  { key: 'settings-customer-config', label: '客户配置', admin: true },
  { key: 'settings-sync', label: '同步设置', admin: true },
  // { key: 'settings-face-enroll', label: '人脸录入', perm: 'punchFace' },
  { key: 'settings-audit', label: '操作日志', admin: true }
]
const sidebarCollapsed = ref(false)

function hasPerm(perm) {
  if (!currentUser.value) return false
  if (currentUser.value.isAdmin) return true
  return !!(currentUser.value.permissions && currentUser.value.permissions[perm])
}

const visibleNav = computed(() => nav.filter(item => {
  if (item.always) return true
  if (item.any) return item.any.some(hasPerm)
  return hasPerm(item.perm)
}))
const visibleSettingsChildren = computed(() => settingsChildren.filter(item => {
  if (item.admin) return currentUser.value?.isAdmin
  if (item.perm) return hasPerm(item.perm)
  return true
}))
const sidebarMenu = computed(() => visibleNav.value.map(item => {
  const menuItem = {
    href: routeHref(item.children ? 'settings-profile' : item.key),
    title: item.label,
    icon: { element: item.icon, class: 'app-sidebar-icon' },
    exact: !item.children,
    isActive: item.children ? () => String(currentRouteName.value).startsWith('settings-') : undefined
  }
  if (item.children) {
    menuItem.child = visibleSettingsChildren.value.map(child => ({
      href: routeHref(child.key),
      title: child.label,
      exact: true
    }))
  }
  return menuItem
}))

const currentRouteName = computed(() => String(route.name || 'customer'))

function firstVisibleRoute() {
  const first = visibleNav.value[0]
  if (!first) return 'settings-profile'
  return first.key === 'settings' ? 'settings-profile' : first.key
}

function routeAllowed(name) {
  if (String(name).startsWith('settings-')) return visibleSettingsChildren.value.some(item => item.key === name)
  return visibleNav.value.some(item => item.key === name)
}

function routeHref(name) {
  const map = {
    customer: '/customer', operation: '/operation', punch: '/punch',
    'settings-profile': '/settings/profile', 'settings-accounts': '/settings/accounts',
    'settings-customer-config': '/settings/customer-config', 'settings-sync': '/settings/sync',
    'settings-face-enroll': '/settings/face-enroll', 'settings-audit': '/settings/audit'
  }
  return map[name] || '/customer'
}

function isNavActive(item) {
  return item.key === 'settings'
    ? String(currentRouteName.value).startsWith('settings-')
    : currentRouteName.value === item.key
}

function ensureAllowedRoute() {
  if (!currentUser.value) return
  if (!routeAllowed(currentRouteName.value)) router.replace({ name: firstVisibleRoute() })
}

function go(name) {
  if (currentRouteName.value !== name) router.push({ name })
}

watch(visibleNav, ensureAllowedRoute)
watch(() => route.name, ensureAllowedRoute)

async function refreshMe() {
  try {
    currentUser.value = await authApi.me()
  } catch (err) {
    currentUser.value = null
  }
}

function handleLogin(user) {
  currentUser.value = user
  if (!routeAllowed(currentRouteName.value)) router.replace({ name: firstVisibleRoute() })
}

async function logout() {
  await authApi.logout().catch(() => {})
  currentUser.value = null
}

function handleOnline() { isOnline.value = true }

function handleKeydown(e) {
  const tag = document.activeElement?.tagName
  if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
    e.preventDefault()
    const searchInput = document.querySelector('.toolbar .el-input__inner')
    if (searchInput) searchInput.focus()
  }
}
function handleOffline() { isOnline.value = false }

onErrorCaptured((err) => {
  console.error('组件错误:', err)
  ElMessage.error('页面出现异常，请刷新重试')
  return false
})

onMounted(async () => {
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  window.addEventListener('keydown', handleKeydown)
  if (isDark.value && typeof document !== 'undefined') document.documentElement.dataset.theme = 'dark'
  window.addEventListener('keydown', handleKeydown)
  if (isDark.value && typeof document !== 'undefined') document.documentElement.dataset.theme = 'dark'
  try {
    currentUser.value = await authApi.me()
    ensureAllowedRoute()
  } catch (err) {
    currentUser.value = null
  }
})

onUnmounted(() => {
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keydown', handleKeydown)
})
</script>
