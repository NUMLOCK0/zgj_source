<template>
  <div v-if="!authReady" class="auth-bootstrap-screen" aria-label="正在检查登录状态">
    <div class="auth-bootstrap-mark">创</div>
  </div>
  <LoginView v-else-if="!currentUser" @login="handleLogin" />
  <div v-else class="app-shell">
    <ModernSidebar v-if="!isMobile" :menu-sections="menuSections" :current-route-name="currentRouteName" :user="currentUser" @navigate="go" @logout="logout" />

    <main class="main" :class="{ mobile: isMobile }">
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

    <nav v-if="isMobile" class="app-mobile-tabbar">
      <button v-for="item in mobileNav" :key="item.key" class="tabbar-item" :class="{ active: isNavActive(item) }" type="button" @click="go(item.route)">
        <span class="tabbar-icon-wrap"><el-icon><component :is="item.icon" /></el-icon></span>
        <span class="tabbar-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed, onErrorCaptured, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Collection, DataAnalysis, DocumentChecked, Setting, TrendCharts } from '@element-plus/icons-vue'
import LoginView from './views/LoginView.vue'
import ModernSidebar from './components/ModernSidebar.vue'
import { authApi } from './services/api'
import { useResponsive } from './composables/useResponsive'

const { isMobile } = useResponsive()
const route = useRoute()
const router = useRouter()
const currentUser = ref(null)
const authReady = ref(false)
const reloadCustomersSignal = ref(0)
const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)

const nav = [
  { key: 'dashboard', label: '工作台', icon: DataAnalysis, any: ['viewData', 'financeView', 'leadStats'] },
  { key: 'customer', label: '客户管理', icon: Collection, any: ['extract', 'viewData', 'leadStats'] },
  { key: 'finance', label: '财税登记', icon: DocumentChecked, any: ['financeView', 'financeRegister', 'financeEdit'] },
  { key: 'finance-ledger', label: '个人记账', icon: DataAnalysis, any: ['financeView', 'viewData'] },
  { key: 'operation', label: '运营管理', icon: TrendCharts, any: ['taskManage', 'qrGen'] },
  // { key: 'punch', label: '考勤打卡', icon: Clock, any: ['punchUse', 'punchView'] },
  { key: 'settings', label: '设置', icon: Setting, always: true, children: true }
]
const settingsChildren = [
  { key: 'settings-accounts', label: '账号管理', admin: true },
  { key: 'settings-business-config', label: '客户与财税配置', admin: true },
  { key: 'settings-ai', label: 'AI识别配置', admin: true },
  { key: 'settings-sync', label: '同步设置', admin: true },
  // { key: 'settings-face-enroll', label: '人脸录入', perm: 'punchFace' },
  { key: 'settings-audit', label: '操作日志', admin: true }
]
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
const currentRouteName = computed(() => String(route.name || 'customer'))

const menuSections = computed(() => {
  const sections = [
    { key: 'dashboard', label: '工作台', groupTitle: '数据中心', icon: DataAnalysis, children: [{ key: 'dashboard', label: '工作台', route: 'dashboard' }] },
    { key: 'records', label: '客户登记表', groupTitle: '数据沉淀', icon: DocumentChecked, children: [
      { key: 'customer', label: '职称登记表', route: 'customer', visible: hasPerm('viewData') },
      { key: 'finance', label: '财税登记表', route: 'finance', visible: hasPerm('financeView') || hasPerm('financeRegister') },
      { key: 'journal', label: '期刊登记表', route: 'journal', visible: hasPerm('financeView') || hasPerm('financeRegister') },
      { key: 'finance-ledger', label: '个人记账本', route: 'finance-ledger', visible: true }
    ] },
    { key: 'operation', label: '运营管理', groupTitle: '系统支持', icon: TrendCharts, children: [
      { key: 'operation-tasks', label: '任务管理', route: 'operation-tasks', visible: hasPerm('taskManage') },
      { key: 'operation-qr', label: '无痕码', route: 'operation-qr', visible: hasPerm('qrGen') }
    ] },
    { key: 'settings', label: '系统设置', icon: Setting, children: visibleSettingsChildren.value.map(child => ({ key: child.key, label: child.label, route: child.key, visible: true })) }
  ]
  return sections.map(section => ({ ...section, children: section.children.filter(item => item.visible !== false) })).filter(section => section.children.length)
})

const mobileNav = computed(() => menuSections.value.map(section => ({
  key: section.key,
  label: section.key === 'records' ? '客户登记表' : section.label,
  icon: section.icon,
  route: section.children[0].route,
  children: section.children
})))

function firstVisibleRoute() {
  const firstSection = menuSections.value[0]
  return firstSection?.children?.[0]?.route || 'dashboard'
}

function routeAllowed(name) {
  if (String(name).startsWith('settings-')) return visibleSettingsChildren.value.some(item => item.key === name)
  return visibleNav.value.some(item => item.key === name) || menuSections.value.some(section => section.children.some(child => child.route === name))
}

function routeHref(name) {
  const map = {
    dashboard: '/dashboard', customer: '/customer', finance: '/finance/list', journal: '/journal/list', 'finance-ledger': '/finance/ledger', operation: '/operation/tasks', 'operation-tasks': '/operation/tasks', 'operation-qr': '/operation/qr', punch: '/punch',
    'settings-accounts': '/settings/accounts', 'settings-business-config': '/settings/business-config', 'settings-ai': '/settings/ai', 'settings-sync': '/settings/sync',
    'settings-face-enroll': '/settings/face-enroll', 'settings-audit': '/settings/audit'
  }
  return map[name] || '/customer'
}

function isNavActive(item) {
  return item.key === 'settings'
    ? String(currentRouteName.value).startsWith('settings-')
    : item.key === 'records'
      ? ['customer', 'finance', 'journal', 'finance-ledger'].includes(currentRouteName.value)
      : (item.children || []).some(child => child.route === currentRouteName.value) || currentRouteName.value === item.route || currentRouteName.value === item.key
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
  try {
    currentUser.value = await authApi.me()
    ensureAllowedRoute()
  } catch (err) {
    currentUser.value = null
  } finally {
    authReady.value = true
  }
})

onUnmounted(() => {
  window.removeEventListener('online', handleOnline)
  window.removeEventListener('offline', handleOffline)
  window.removeEventListener('keydown', handleKeydown)
})
</script>
