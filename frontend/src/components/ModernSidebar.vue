<template>
  <aside class="modern-sidebar">
    <div class="sidebar-brand-box">
      <div class="brand-logo-badge"><el-icon><Suitcase /></el-icon></div>
      <div class="brand-info">
        <strong class="brand-name">创赢工具箱</strong>
        <span class="brand-ver">v5.2</span>
      </div>
    </div>

    <div class="sidebar-nav-scroll">
      <div v-for="section in menuSections" :key="section.key" class="menu-section-group">
        <div v-if="section.groupTitle" class="menu-group-label">{{ section.groupTitle }}</div>
        <template v-if="section.children?.length === 1 && section.key === 'dashboard'">
          <button class="nav-item single-nav-item" :class="{ active: currentRouteName === section.children[0].route }" type="button" @click="navigate(section.children[0].route)">
            <span class="nav-item-content"><el-icon class="nav-icon"><component :is="section.icon" /></el-icon><span class="nav-text">{{ section.children[0].label }}</span></span>
            <span v-if="currentRouteName === section.children[0].route" class="active-dot" />
          </button>
        </template>
        <template v-else>
          <button class="nav-item folder-header" :class="{ active: isSectionActive(section), 'is-open': open[section.key] }" type="button" @click="toggle(section.key)">
            <span class="nav-item-content"><el-icon class="nav-icon"><component :is="section.icon" /></el-icon><span class="nav-text">{{ section.label }}</span></span>
            <el-icon class="arrow-icon" :class="{ 'is-rotated': open[section.key] }"><ArrowDown /></el-icon>
          </button>
          <div v-show="open[section.key]" class="sub-tree-wrap">
            <span class="sub-tree-line" />
            <button v-for="child in section.children" :key="child.key" class="sub-nav-item" :class="{ active: currentRouteName === child.route }" type="button" @click="navigate(child.route)">
              <span class="sub-dot" /><span class="sub-text">{{ child.label }}</span>
            </button>
          </div>
        </template>
      </div>
    </div>

    <div class="sidebar-bottom-user">
      <el-popover trigger="hover" placement="right-end" width="240" :show-after="120" popper-class="sidebar-user-popover">
        <template #reference>
          <div class="user-card-content">
            <div class="user-avatar-cube">{{ (user?.name || user?.username || '客')[0] }}</div>
            <div class="user-info-text">
              <div class="user-name-line">{{ user?.name || user?.username }}</div>
              <div class="u-role-pill" :class="user?.isAdmin ? 'admin' : 'staff'">{{ user?.isAdmin ? '管理员' : '在线客服' }}</div>
            </div>
            <button class="btn-sidebar-logout" type="button" title="退出登录" @click.stop="$emit('logout')"><el-icon><SwitchButton /></el-icon></button>
          </div>
        </template>
        <div class="sidebar-user-menu">
          <div class="sidebar-user-menu-title">账号设置</div>
          <button type="button" class="sidebar-user-menu-action" @click="pwdDialog = true">修改密码</button>
        </div>
      </el-popover>
    </div>

    <el-dialog v-model="pwdDialog" title="修改密码" width="420px" :close-on-click-modal="false" class="responsive-dialog">
      <el-form label-position="top">
        <el-form-item label="旧密码"><el-input v-model="pwd.oldPassword" type="password" show-password /></el-form-item>
        <el-form-item label="新密码"><el-input v-model="pwd.newPassword" type="password" show-password /></el-form-item>
        <el-form-item label="确认新密码"><el-input v-model="pwd.confirmPassword" type="password" show-password /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="pwdDialog = false">取消</el-button>
        <el-button type="primary" @click="changePassword">确定修改</el-button>
      </template>
    </el-dialog>
  </aside>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowDown, Suitcase, SwitchButton } from '@element-plus/icons-vue'
import { authApi } from '../services/api'

const props = defineProps({
  menuSections: { type: Array, required: true },
  currentRouteName: { type: String, required: true },
  user: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['navigate', 'logout'])
const open = reactive({ records: true, operation: true, settings: true })
const pwdDialog = ref(false)
const pwd = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })

function toggle(key) {
  open[key] = !open[key]
}

function isSectionActive(section) {
  return section.children?.some(item => item.route === props.currentRouteName)
}

function navigate(route) {
  if (route) emit('navigate', route)
}

async function changePassword() {
  if (!pwd.oldPassword || !pwd.newPassword) return ElMessage.warning('请填写旧密码和新密码')
  if (pwd.newPassword !== pwd.confirmPassword) return ElMessage.warning('两次新密码不一致')
  if (pwd.newPassword.length < 3) return ElMessage.warning('新密码至少3位')
  try {
    await authApi.changePassword({ oldPassword: pwd.oldPassword, newPassword: pwd.newPassword })
    pwd.oldPassword = ''
    pwd.newPassword = ''
    pwd.confirmPassword = ''
    pwdDialog.value = false
    ElMessage.success('密码已修改')
  } catch (err) {
    ElMessage.error(err.message || '修改失败')
  }
}

watch(() => props.currentRouteName, name => {
  props.menuSections.forEach(section => {
    if (section.children?.some(item => item.route === name)) open[section.key] = true
  })
}, { immediate: true })
</script>
