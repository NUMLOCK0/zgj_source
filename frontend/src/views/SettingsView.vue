<template>
  <section class="settings-page">
    <template v-if="section === 'profile'">
    <div v-if="isMobile" class="mobile-settings-home">
      <div class="mobile-settings-group-title">个人设置</div>
      <div class="mobile-settings-group">
        <button class="mobile-settings-item" @click="pwdDialog = true">
          <span class="mobile-settings-icon icon-blue"><el-icon><Lock /></el-icon></span>
          <span>修改密码</span>
          <el-icon class="mobile-settings-arrow"><ArrowRight /></el-icon>
        </button>
      </div>

      <template v-if="user.isAdmin">
        <div class="mobile-settings-group-title">账号管理</div>
        <div class="mobile-settings-group">
          <button class="mobile-settings-item" @click="go('settings-accounts')">
            <span class="mobile-settings-icon icon-green"><el-icon><UserFilled /></el-icon></span>
            <span>账号列表与权限</span>
            <el-icon class="mobile-settings-arrow"><ArrowRight /></el-icon>
          </button>
          <button class="mobile-settings-item" @click="go('settings-customer-config')">
            <span class="mobile-settings-icon icon-orange"><el-icon><Tools /></el-icon></span>
            <span>客户配置</span>
            <el-icon class="mobile-settings-arrow"><ArrowRight /></el-icon>
          </button>
          <button class="mobile-settings-item" @click="go('settings-sync')">
            <span class="mobile-settings-icon icon-purple"><el-icon><Connection /></el-icon></span>
            <span>同步设置</span>
            <el-icon class="mobile-settings-arrow"><ArrowRight /></el-icon>
          </button>
          <!-- 人脸录入管理菜单暂时隐藏，保留组件、路由和业务代码 -->
          <!--
          <button class="mobile-settings-item" @click="go('settings-face-enroll')">
            <span class="mobile-settings-icon icon-cyan"><el-icon><Camera /></el-icon></span>
            <span>人脸录入管理</span>
            <el-icon class="mobile-settings-arrow"><ArrowRight /></el-icon>
          </button>
          -->
          <button class="mobile-settings-item" @click="go('settings-audit')">
            <span class="mobile-settings-icon icon-violet"><el-icon><DocumentChecked /></el-icon></span>
            <span>操作审计日志</span>
            <el-icon class="mobile-settings-arrow"><ArrowRight /></el-icon>
          </button>
        </div>
      </template>

      <div class="mobile-settings-group-title">关于</div>
      <div class="mobile-settings-group">
        <div class="mobile-settings-item static-item">
          <span class="mobile-settings-icon icon-gray"><el-icon><Files /></el-icon></span>
          <span>产品名称</span>
          <strong>创赢工具箱</strong>
        </div>
        <div class="mobile-settings-item static-item">
          <span class="mobile-settings-icon icon-gray"><el-icon><InfoFilled /></el-icon></span>
          <span>当前版本</span>
          <strong>v5.2.1</strong>
        </div>
        <button class="mobile-settings-item logout-item" @click="emit('logout')">
          <span class="mobile-settings-icon icon-red"><el-icon><SwitchButton /></el-icon></span>
          <span>退出登录</span>
        </button>
      </div>
      <div class="mobile-settings-footer">创赢工具箱</div>
    </div>

    <template v-else>
    <div class="settings-section-title">个人设置</div>
    <el-card shadow="never" class="settings-card">
      <div class="settings-row">
        <div>
          <div class="settings-row-label">登录密码</div>
          <div class="settings-row-desc">修改当前账号的登录密码</div>
        </div>
        <el-button type="primary" @click="pwdDialog = true">修改密码</el-button>
      </div>
    </el-card>
    </template>
    </template>

    <template v-if="user.isAdmin && section === 'accounts'">
      <div class="settings-section-title">账号管理</div>
      <el-card shadow="never" class="settings-card">
        <template #header>
          <div class="panel-head">
            <div>
              <div class="settings-row-label">账号列表与权限</div>
              <div class="settings-row-desc">创建子账号、配置功能权限、重置密码</div>
            </div>
            <el-button type="primary" :icon="Plus" @click="openUser()">创建账号</el-button>
          </div>
        </template>

        <div class="settings-toolbar">
          <el-input v-model="userKeyword" clearable :prefix-icon="Search" placeholder="搜索用户名/姓名" />
          <span class="muted-text">{{ filteredUsers.length }} 条</span>
        </div>

        <el-table v-if="!isMobile" :data="pagedUsers" border class="settings-table">
          <el-table-column prop="username" label="用户名" min-width="140">
            <template #default="{ row }">
              <span>{{ row.username }}</span>
              <el-tag v-if="row.isAdmin" type="success" size="small" class="ml-8">管理员</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="120" />
          <el-table-column label="权限概览" min-width="140">
            <template #default="{ row }"><span :class="permOverviewClass(row)">{{ permOverview(row) }}</span></template>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template #default="{ row }">
              <el-button text @click="openUser(row)">编辑</el-button>
                            <el-button text @click="openReset(row)">重置密码</el-button>
              <el-button text type="danger" :disabled="!canDeleteUser(row)" @click="removeUser(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div v-else class="mobile-list">
          <article v-for="u in pagedUsers" :key="u.id" class="customer-card">
            <div class="card-main">
              <strong>{{ u.name || u.username }}</strong>
              <el-tag :type="u.isAdmin ? 'success' : 'info'" size="small">{{ u.isAdmin ? '管理员' : u.username }}</el-tag>
            </div>
            <p>权限：{{ permOverview(u) }}</p>
            <div class="card-foot">
              <span>{{ u.username }}</span>
              <div>
                <el-button size="small" @click="openUser(u)">编辑</el-button>
                <el-button size="small" @click="openReset(u)">重置</el-button>
                <el-button size="small" type="danger" :disabled="!canDeleteUser(u)" @click="removeUser(u)">删除</el-button>
              </div>
            </div>
          </article>
        </div>

        <el-pagination
          v-model:current-page="userPage"
          :layout="isMobile ? 'total, prev, next' : 'total, sizes, prev, pager, next'"
          v-model:page-size="userPageSize"
          :page-sizes="pageSizes"
          :total="filteredUsers.length"
          background
          class="pager"
        />
      </el-card>

    </template>

    <template v-if="(user.isAdmin || hasPerm('punchFace')) && section === 'face-enroll'">
      <div class="settings-section-title">人脸录入管理</div>
      <el-card shadow="never" class="settings-card">
        <template #header>
          <div class="panel-head">
            <div>
              <div class="settings-row-label">人脸录入状态</div>
              <div class="settings-row-desc">在下方列表中点击「录入人脸」按钮即可录入人脸</div>
              <div class="settings-row-desc" style="color: #07c160; font-weight: 600;">考勤打卡锁定IP: 113.66.20.207</div>
            </div>
          </div>
        </template>
        <el-table v-if="!isMobile" :data="users" border class="settings-table">
          <el-table-column prop="username" label="用户名" min-width="140">
            <template #default="{ row }">
              <span>{{ row.username }}</span>
              <el-tag v-if="row.isAdmin" type="success" size="small" class="ml-8">管理员</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" min-width="120" />
          <el-table-column label="人脸状态" min-width="120">
            <template #default="{ row }">
              <el-tag :type="hasFaceEnrolled(row.id) ? 'success' : 'info'" size="small">{{ hasFaceEnrolled(row.id) ? '已录入' : '未录入' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template #default="{ row }">
              <el-button text @click="openFaceEnroll(row)">{{ hasFaceEnrolled(row.id) ? '重新录入' : '录入人脸' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-else class="mobile-list">
          <article v-for="u in users" :key="u.id" class="customer-card">
            <div class="card-main">
              <strong>{{ u.name || u.username }}</strong>
              <el-tag :type="hasFaceEnrolled(u.id) ? 'success' : 'info'" size="small">{{ hasFaceEnrolled(u.id) ? '已录入' : '未录入' }}</el-tag>
            </div>
            <div class="card-foot">
              <span>{{ u.username }}</span>
              <el-button size="small" type="success" @click="openFaceEnroll(u)">{{ hasFaceEnrolled(u.id) ? '重新录入' : '录入人脸' }}</el-button>
            </div>
          </article>
        </div>
      </el-card>
    </template>

    <CustomerConfigSettings v-if="user.isAdmin && section === 'customer-config'" />
    <WukongSyncSettings v-if="user.isAdmin && section === 'sync'" />

    <template v-if="user.isAdmin && section === 'audit'">
      <div class="settings-section-title">操作日志</div>
      <el-card shadow="never" class="settings-card">
        <div class="settings-toolbar">
          <el-select v-model="auditAction" clearable placeholder="动作" style="width: 180px" @change="changeAuditAction">
            <el-option v-for="item in auditActions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button @click="loadLogs">刷新</el-button>
        </div>
        <el-table v-if="!isMobile" :data="pagedLogs" border class="settings-table">
          <el-table-column prop="timestamp" label="时间" min-width="170" />
          <el-table-column prop="username" label="账号" min-width="100" />
          <el-table-column label="动作" min-width="120"><template #default="{ row }">{{ actionLabel(row.action) }}</template></el-table-column>
          <el-table-column prop="detail" label="详情" min-width="220" />
        </el-table>
        <div v-else class="mobile-list settings-log-list">
          <article v-for="row in pagedLogs" :key="row.id || `${row.timestamp}-${row.username}`" class="customer-card settings-log-card">
            <div class="card-main"><strong>{{ actionLabel(row.action) }}</strong><span class="muted-text">{{ row.username || '-' }}</span></div>
            <p>{{ row.detail || '-' }}</p>
            <div class="card-foot"><span>{{ row.timestamp || '-' }}</span></div>
          </article>
        </div>
        <el-pagination
          v-model:current-page="logPage"
          :layout="isMobile ? 'total, prev, next' : 'total, sizes, prev, pager, next'"
          v-model:page-size="logPageSize"
          :page-sizes="pageSizes"
          :total="logTotal"
          background
          class="pager"
          @current-change="loadLogs"
          @size-change="loadLogs"
        />
      </el-card>
    </template>

    <el-dialog v-model="pwdDialog" title="修改密码" :width="isMobile ? '94%' : '420px'" :top="isMobile ? '18vh' : '15vh'" :close-on-click-modal="false" class="responsive-dialog settings-mobile-dialog">
      <el-form class="settings-dialog-form" label-position="top">
        <el-form-item label="旧密码"><el-input v-model="pwd.oldPassword" type="password" show-password /></el-form-item>
        <el-form-item label="新密码"><el-input v-model="pwd.newPassword" type="password" show-password /></el-form-item>
        <el-form-item label="确认新密码"><el-input v-model="pwd.confirmPassword" type="password" show-password /></el-form-item>
      </el-form>
      <template #footer>
        <div class="settings-dialog-actions">
          <el-button size="large" @click="pwdDialog = false">取消</el-button>
          <el-button size="large" type="primary" @click="changePassword">确定修改</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="userDialog"
      :title="editingUser?.id ? '编辑账号' : '创建账号'"
      :width="isMobile ? '94%' : '760px'"
      :top="isMobile ? '5vh' : '15vh'"
      :close-on-click-modal="false"
      class="responsive-dialog account-dialog"
    >
      <el-form :key="editingUser?.id || 'new-user'" class="account-form" label-position="top" autocomplete="off">
        <el-row :gutter="12" class="account-basic-fields">
          <el-col :xs="24" :sm="8"><el-form-item label="用户名"><el-input v-model="userForm.username" name="zgj-new-account-username" autocomplete="off" :disabled="!!editingUser?.id" /></el-form-item></el-col>
          <el-col :xs="24" :sm="8"><el-form-item label="姓名"><el-input v-model="userForm.name" /></el-form-item></el-col>
          <el-col :xs="24" :sm="8"><el-form-item :label="editingUser?.id ? '密码（留空不修改）' : '密码'"><el-input v-model="userForm.password" name="zgj-new-account-password" type="password" autocomplete="new-password" show-password /></el-form-item></el-col>
        </el-row>
        <div class="account-admin-toggle"><el-checkbox v-model="userForm.isAdmin" @change="checkedPerms = userForm.isAdmin ? [] : checkedPerms">设为管理员（拥有全部权限）</el-checkbox></div>

        <div v-if="!userForm.isAdmin" class="perm-tree">
          <div class="perm-tree-root">权限配置</div>
          <div v-for="group in permissionGroups" :key="group.title" class="perm-tree-group" :class="{ collapsed: collapsedGroups[group.title] }">
            <div class="perm-tree-head" @click="collapsedGroups[group.title] = !collapsedGroups[group.title]">
              <span class="toggle-icon">{{ collapsedGroups[group.title] ? '▶' : '▼' }}</span>
              <span>{{ group.title }}</span>
              <el-checkbox :model-value="isGroupAllChecked(group)" @click.stop @change="v => toggleGroup(group, v)" />
              <span class="group-count">{{ groupCheckedCount(group) }}/{{ group.perms.length }}</span>
            </div>
            <div class="perm-tree-body">
              <label v-for="perm in group.perms" :key="perm[0]" class="perm-tree-item">
                <el-checkbox :model-value="checkedPerms.includes(perm[0])" @change="v => togglePerm(perm[0], v)" />
                <span>{{ perm[1] }}</span>
              </label>
            </div>
          </div>
          <div class="perm-tree-footer">已选 {{ checkedPerms.length }} / 共 {{ permissionTotal }} 项</div>
        </div>
      </el-form>
      <template #footer>
        <div class="account-dialog-actions">
          <el-button size="large" @click="userDialog = false">取消</el-button>
          <el-button size="large" type="primary" @click="saveUser">保存账号</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="resetDialog" title="重置密码" :width="isMobile ? '94%' : '420px'" :top="isMobile ? '22vh' : '15vh'" :close-on-click-modal="false" class="responsive-dialog settings-mobile-dialog">
      <el-form class="settings-dialog-form" label-position="top">
        <el-form-item label="账号"><el-input :model-value="resetUser?.username || ''" disabled /></el-form-item>
        <el-form-item label="新密码"><el-input v-model="resetPassword" type="password" show-password /></el-form-item>
      </el-form>
      <template #footer>
        <div class="settings-dialog-actions">
          <el-button size="large" @click="resetDialog = false">取消</el-button>
          <el-button size="large" type="primary" @click="saveResetPassword">确认重置</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 人脸录入弹窗 -->
    <FaceEnroll v-model="faceEnrollDialog" :target-user="faceEnrollTarget" @enrolled="onFaceEnrolled" />
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowRight, Camera, Connection, DocumentChecked, Files, InfoFilled, Lock, Plus, Search, SwitchButton, Tools, UserFilled } from '@element-plus/icons-vue'
import { permissionGroups } from '../constants'
import { authApi, statsApi, userApi, punchApi } from '../services/api'
import { useResponsive } from '../composables/useResponsive'
import CustomerConfigSettings from '../components/CustomerConfigSettings.vue'
import WukongSyncSettings from '../components/WukongSyncSettings.vue'
import FaceEnroll from '../components/FaceEnroll.vue'

const props = defineProps({ user: Object, hasPerm: Function })
const emit = defineEmits(['user-updated', 'logout'])
const { isMobile } = useResponsive()
const route = useRoute()
const router = useRouter()
const section = computed(() => route.meta.section || 'profile')
const pwd = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })
const pwdDialog = ref(false)
const users = ref([])
const userKeyword = ref('')
const userPage = ref(1)
const userPageSize = ref(10)
const pageSizes = [10, 20, 50, 100]
const logs = ref([])
const logPage = ref(1)
const logPageSize = ref(20)
const logTotal = ref(0)
const auditAction = ref('')
const userDialog = ref(false)
const editingUser = ref(null)
const checkedPerms = ref([])
const collapsedGroups = reactive({})
const userForm = reactive({ username: '', name: '', password: '', isAdmin: false })
const resetDialog = ref(false)
const resetUser = ref(null)
const resetPassword = ref('')

// 人脸录入弹窗
const faceEnrollDialog = ref(false)
const faceEnrollTarget = ref(null)
const enrolledUserIds = ref(new Set())

const allPerms = computed(() => permissionGroups.flatMap(g => g.perms))
const permissionTotal = computed(() => allPerms.value.length)
const filteredUsers = computed(() => {
  const q = userKeyword.value.trim().toLowerCase()
  if (!q) return users.value
  return users.value.filter(u => String(u.username || '').toLowerCase().includes(q) || String(u.name || '').toLowerCase().includes(q))
})
const pagedUsers = computed(() => filteredUsers.value.slice((userPage.value - 1) * userPageSize.value, userPage.value * userPageSize.value))
const pagedLogs = computed(() => logs.value)

const auditActions = [
  ['login', '登录'], ['register', '登记客户'], ['edit', '修改客户'], ['delete', '删除客户'],
  ['clear_table', '清空登记表'], ['consult_edit', '录入咨询量'], ['task_import', '导入题目'],
  ['wukong_sync_config', '更新同步设置'], ['wukong_sync_token', '获取CRM Token'], ['wukong_sync_run', '执行客户同步'], ['roi_settings', 'ROI参数修改'], ['roi_product', 'ROI产品管理'], ['punch_settings', '打卡设置修改'], ['punch_employee', '人脸录入管理']
].map(([value, label]) => ({ value, label }))

function go(name) {
  if (route.name !== name) router.push({ name })
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

async function loadUsers() {
  if (!props.user.isAdmin && !hasPerm('punchFace')) return
  const data = await userApi.list()
  users.value = data.users || []
}

async function loadLogs() {
  if (!props.user.isAdmin) return
  const data = await statsApi.auditLogs(logPage.value, logPageSize.value, auditAction.value)
  logs.value = data.logs || []
  logTotal.value = data.total || 0
}

function changeAuditAction() {
  logPage.value = 1
  loadLogs()
}

function permOverview(u) {
  if (u.isAdmin) return '全部权限'
  const count = allPerms.value.filter(p => u.permissions && u.permissions[p[0]]).length
  if (count === 0) return '无权限'
  if (count === permissionTotal.value) return '全部权限'
  return `${count}/${permissionTotal.value}项`
}

function permOverviewClass(u) {
  const text = permOverview(u)
  return text === '无权限' ? 'danger-text' : text === '全部权限' ? 'success-text' : ''
}

function openUser(row) {
  editingUser.value = row || null
  userForm.username = row?.username || ''
  userForm.name = row?.name || ''
  userForm.password = ''
  userForm.isAdmin = !!row?.isAdmin
  checkedPerms.value = row?.permissions ? Object.keys(row.permissions).filter(k => row.permissions[k]) : []
  permissionGroups.forEach(g => { collapsedGroups[g.title] = isMobile.value })
  userDialog.value = true
}

function togglePerm(key, checked) {
  const set = new Set(checkedPerms.value)
  if (checked) set.add(key)
  else set.delete(key)
  checkedPerms.value = [...set]
}

function isGroupAllChecked(group) {
  return group.perms.every(p => checkedPerms.value.includes(p[0]))
}

function groupCheckedCount(group) {
  return group.perms.filter(p => checkedPerms.value.includes(p[0])).length
}

function toggleGroup(group, checked) {
  const set = new Set(checkedPerms.value)
  group.perms.forEach(p => checked ? set.add(p[0]) : set.delete(p[0]))
  checkedPerms.value = [...set]
}

async function saveUser() {
  if (!editingUser.value?.id && (!userForm.username.trim() || !userForm.password)) return ElMessage.warning('用户名和密码不能为空')
  try {
    const permissions = {}
    checkedPerms.value.forEach(p => { permissions[p] = true })
    const payload = { name: userForm.name.trim(), isAdmin: userForm.isAdmin }
    if (!userForm.isAdmin) payload.permissions = permissions
    if (userForm.password) payload.password = userForm.password
    if (editingUser.value?.id) await userApi.update(editingUser.value.id, payload)
    else await userApi.create({ ...payload, username: userForm.username.trim(), password: userForm.password })
    userDialog.value = false
    ElMessage.success('已保存')
    loadUsers()
    emit('user-updated')
  } catch (err) {
    ElMessage.error(err.message || '保存失败，请重试')
  }
}

function openReset(row) {
  resetUser.value = row
  resetPassword.value = ''
  resetDialog.value = true
}

async function saveResetPassword() {
  if (!resetPassword.value) return ElMessage.warning('请输入新密码')
  await userApi.update(resetUser.value.id, { password: resetPassword.value })
  resetDialog.value = false
  ElMessage.success('密码已重置')
}

function canDeleteUser(row) {
  const adminCount = users.value.filter(u => u.isAdmin).length
  return (!row.isAdmin || adminCount > 1) && row.id !== props.user.id
}

async function removeUser(row) {
  await ElMessageBox.confirm(`删除账号 ${row.username}？`, '删除账号', { type: 'warning' })
  await userApi.remove(row.id)
  ElMessage.success('已删除')
  loadUsers()
}

function actionLabel(action) {
  return auditActions.find(item => item.value === action)?.label || action
}

// 人脸录入
function openFaceEnroll(row) {
  faceEnrollTarget.value = row
  faceEnrollDialog.value = true
}

function onFaceEnrolled(userId) {
  enrolledUserIds.value.add(userId)
  enrolledUserIds.value = new Set(enrolledUserIds.value)
}

async function loadEnrolledEmployees() {
  try {
    const data = await punchApi.employees()
    const employees = data.employees || []
    enrolledUserIds.value = new Set(employees.map(e => e.userId).filter(Boolean))
  } catch (err) {
    // 非管理员或无权限时忽略
  }
}

function hasFaceEnrolled(userId) {
  return enrolledUserIds.value.has(userId)
}

watch(userKeyword, () => { userPage.value = 1 })
watch(userPageSize, () => { userPage.value = 1 })
watch(auditAction, () => { logPage.value = 1 })
onMounted(() => {
  loadUsers()
  loadLogs()
  loadEnrolledEmployees()
})
</script>
