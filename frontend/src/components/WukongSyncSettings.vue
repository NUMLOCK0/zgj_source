<template>
  <section class="sync-settings">
    <div class="settings-section-title">同步设置</div>

    <el-card shadow="never" class="settings-card sync-connection-card">
      <template #header>
        <div class="sync-card-head">
          <div>
            <div class="settings-row-label">悟空CRM连接</div>
            <div class="settings-row-desc">使用 CRM 账号获取 Token，凭据仅在服务器加密保存</div>
          </div>
          <div class="sync-status">
            <span class="sync-status-dot" :class="{ connected: form.tokenStatus === 'valid', expired: form.tokenStatus === 'expired' }"></span>
            <span>{{ tokenStatusText }}</span>
          </div>
        </div>
      </template>

      <div class="sync-enable-row">
        <div>
          <div class="settings-row-label">启用客户同步</div>
          <div class="settings-row-desc">新登记客户会进入同步队列，按已选店铺手动同步至悟空CRM</div>
        </div>
        <el-switch v-model="form.enabled" />
      </div>

      <el-divider />
      <el-form label-position="top" class="sync-form">
        <el-row :gutter="16">
          <el-col :xs="24" :md="24">
            <el-form-item label="悟空CRM地址">
              <el-input v-model="form.baseUrl" placeholder="例如：https://scrm.zctom.com（也可粘贴登录地址）" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="CRM账号">
              <el-input v-model="form.username" autocomplete="off" placeholder="请输入登录账号" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="CRM密码">
              <el-input v-model="form.password" type="password" show-password autocomplete="new-password" :placeholder="form.hasPassword ? '已保存，留空则不修改' : '请输入登录密码'" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="sync-action-bar">
        <div class="sync-token-note">
          <span v-if="form.tokenCheckedAt">最近校验：{{ formatTime(form.tokenCheckedAt) }}</span>
          <span v-else-if="form.tokenUpdatedAt">最近获取：{{ formatTime(form.tokenUpdatedAt) }}</span>
          <span v-else>保存账号信息后获取 Token</span>
        </div>
        <div class="sync-action-buttons">
          <el-button :loading="saving" @click="save">保存设置</el-button>
          <el-button type="primary" :loading="fetchingToken" @click="getToken">获取 Token</el-button>
        </div>
      </div>
    </el-card>

    <el-card shadow="never" class="settings-card sync-scope-card">
      <template #header>
        <div class="sync-card-head">
          <div>
            <div class="settings-row-label">同步范围</div>
            <div class="settings-row-desc">仅同步分配至下列店铺的新客户；未勾选店铺不会发送到 CRM</div>
          </div>
          <span class="sync-selected-count">已选 {{ form.syncStores.length }} 个店铺</span>
        </div>
      </template>
      <el-checkbox-group v-model="form.syncStores" class="store-selection-grid" @change="saveSyncStores">
        <el-checkbox v-for="store in stores" :key="store" :label="store" border :disabled="scopeSaving">{{ store }}</el-checkbox>
      </el-checkbox-group>
      <el-empty v-if="!stores.length" :image-size="72" description="请先在客户配置中维护店铺" />
    </el-card>

    <el-card shadow="never" class="settings-card sync-queue-card">
      <template #header>
        <div class="sync-card-head">
          <div>
            <div class="settings-row-label">待同步客户</div>
            <div class="settings-row-desc">新登记客户先进入队列，成功同步后会保留“已同步”标记</div>
          </div>
          <div class="sync-queue-actions">
            <span class="sync-selected-count">未同步 {{ pendingCount }} 条</span>
            <el-button type="primary" :icon="RefreshRight" :loading="syncing" :disabled="!pendingCount" @click="runSync">开始同步</el-button>
          </div>
        </div>
      </template>

      <el-table v-if="!isMobile" :data="queueRows" border class="settings-table sync-queue-table">
        <el-table-column label="客户" min-width="130"><template #default="{ row }">{{ row.customerName || '-' }}</template></el-table-column>
        <el-table-column prop="phone" label="电话" min-width="130" />
        <el-table-column prop="assignedTo" label="店铺" min-width="120" />
        <el-table-column label="状态" width="110"><template #default="{ row }"><el-tag :type="queueStatusType(row.status)" size="small">{{ queueStatusText(row.status) }}</el-tag></template></el-table-column>
        <el-table-column label="尝试次数" width="100"><template #default="{ row }">{{ row.attempts || 0 }}</template></el-table-column>
        <el-table-column label="创建时间" min-width="170"><template #default="{ row }">{{ formatTime(row.createdAt) }}</template></el-table-column>
        <el-table-column label="同步说明" min-width="260" class-name="sync-detail-cell"><template #default="{ row }"><div class="sync-detail-text">{{ row.lastError || (row.syncedAt ? `同步于 ${formatTime(row.syncedAt)}` : '-') }}</div></template></el-table-column>
      </el-table>

      <div v-else class="mobile-list sync-queue-mobile-list">
        <article v-for="row in queueRows" :key="row.id" class="customer-card customer-mobile-card sync-queue-mobile-row" :class="{ expanded: expandedQueueId === row.id }">
          <button class="customer-mobile-summary" @click="toggleQueueDetails(row.id)">
            <span class="customer-summary-date">{{ shortDate(row.createdAt) }}</span>
            <span class="customer-summary-phone">{{ row.phone || '无电话' }}</span>
            <span class="customer-summary-info">{{ row.customerName || '-' }}</span>
            <strong class="customer-summary-store">{{ row.assignedTo || '未分配' }}</strong>
            <el-icon class="customer-summary-arrow"><CaretBottom v-if="expandedQueueId === row.id" /><CaretRight v-else /></el-icon>
          </button>
          <div v-if="expandedQueueId === row.id" class="customer-mobile-details sync-queue-mobile-details">
            <div class="customer-detail-grid">
              <div><span>客户</span><strong>{{ row.customerName || '-' }}</strong></div>
              <div><span>状态</span><strong><el-tag :type="queueStatusType(row.status)" size="small">{{ queueStatusText(row.status) }}</el-tag></strong></div>
              <div><span>电话</span><strong>{{ row.phone || '-' }}</strong></div>
              <div><span>分配店铺</span><strong>{{ row.assignedTo || '-' }}</strong></div>
              <div><span>尝试次数</span><strong>{{ row.attempts || 0 }} 次</strong></div>
              <div><span>创建时间</span><strong>{{ formatTime(row.createdAt) }}</strong></div>
              <div v-if="row.syncedAt"><span>同步时间</span><strong>{{ formatTime(row.syncedAt) }}</strong></div>
              <div v-if="row.lastError" class="customer-detail-wide"><span>同步说明</span><strong class="sync-error-text">{{ row.lastError }}</strong></div>
            </div>
          </div>
        </article>
        <div v-if="queueMobileLoading" class="mobile-load-more">
          <el-icon class="is-loading"><Loading /></el-icon><span>正在加载更多客户</span>
        </div>
        <div v-else-if="queueRows.length && queueRows.length >= queueTotal" class="mobile-load-more muted-text">已加载全部客户</div>
      </div>
      <el-empty v-if="!queueRows.length" :image-size="72" description="暂无同步记录" />
      <el-pagination v-if="queueTotal && !isMobile" v-model:current-page="queuePage" v-model:page-size="queuePageSize" layout="total, sizes, prev, pager, next" :page-sizes="pageSizes" :total="queueTotal" background class="pager" @current-change="loadQueue" @size-change="loadQueue" />
    </el-card>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CaretBottom, CaretRight, Loading, RefreshRight } from '@element-plus/icons-vue'
import { syncApi } from '../services/api'
import { useResponsive } from '../composables/useResponsive'

const { isMobile } = useResponsive()
const stores = ref([])
const saving = ref(false)
const fetchingToken = ref(false)
const syncing = ref(false)
const queueRows = ref([])
const queueTotal = ref(0)
const pendingCount = ref(0)
const queuePage = ref(1)
const queuePageSize = ref(20)
const pageSizes = [10, 20, 50, 100]
const queueMobileLoading = ref(false)
const expandedQueueId = ref(null)
const scopeSaving = ref(false)
const savedSyncStores = ref([])
const form = reactive({ enabled: true, baseUrl: '', username: '', password: '', hasPassword: false, hasToken: false, tokenUpdatedAt: '', tokenStatus: 'missing', tokenCheckedAt: '', syncStores: [] })
const tokenStatusText = computed(() => ({ valid: 'Token 正常', expired: 'Token 已过期', missing: '未获取 Token' })[form.tokenStatus] || '未连接')

function applySettings(settings = {}) {
  form.enabled = !!settings.enabled
  form.baseUrl = settings.baseUrl || ''
  form.username = settings.username || ''
  form.password = ''
  form.hasPassword = !!settings.hasPassword
  form.hasToken = !!settings.hasToken
  form.tokenUpdatedAt = settings.tokenUpdatedAt || ''
  form.tokenStatus = settings.tokenStatus || (settings.hasToken ? 'valid' : 'missing')
  form.tokenCheckedAt = settings.tokenCheckedAt || ''
  form.syncStores = Array.isArray(settings.syncStores) ? settings.syncStores : []
  savedSyncStores.value = [...form.syncStores]
}

function payload() {
  return { enabled: form.enabled, baseUrl: form.baseUrl, username: form.username, password: form.password, syncStores: form.syncStores }
}

function formatTime(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('zh-CN', { hour12: false })
}

async function load() {
  try {
    const data = await syncApi.settings()
    stores.value = data.stores || []
    applySettings(data.settings)
    const validation = await syncApi.validateToken()
    applySettings(validation.settings)
    await loadQueue({ reset: true })
  } catch (err) {
    ElMessage.error(err.message || '加载同步设置失败')
  }
}

async function loadQueue(options = {}) {
  const append = Boolean(options.append)
  const reset = Boolean(options.reset)
  if (reset) queuePage.value = 1
  if (append) queueMobileLoading.value = true
  try {
    const data = await syncApi.queue(queuePage.value, queuePageSize.value)
    const incoming = data.queue || []
    queueRows.value = append ? [...queueRows.value, ...incoming] : incoming
    queueTotal.value = data.total || 0
    pendingCount.value = data.pendingCount || 0
    if (data.page && data.page !== queuePage.value) queuePage.value = data.page
  } catch (err) {
    ElMessage.error(err.message || '加载同步队列失败')
  } finally {
    queueMobileLoading.value = false
  }
}

function shortDate(value) {
  const match = String(value || '').match(/(\d{4})-(\d{2})-(\d{2})/)
  return match ? `${match[2]}-${match[3]}` : String(value || '-').slice(0, 5)
}

function toggleQueueDetails(id) {
  expandedQueueId.value = expandedQueueId.value === id ? null : id
}

function handleQueueMobileScroll() {
  if (!isMobile.value || queueMobileLoading.value || queueRows.value.length >= queueTotal.value) return
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 180) {
    queuePage.value += 1
    loadQueue({ append: true })
  }
}

function queueStatusText(status) {
  return ({ pending: '待同步', failed: '同步失败', synced: '已同步' })[status] || '待处理'
}

function queueStatusType(status) {
  return ({ pending: 'warning', failed: 'danger', synced: 'success' })[status] || 'info'
}

async function runSync() {
  syncing.value = true
  try {
    const data = await syncApi.runQueue()
    const summary = data.summary || {}
    ElMessage.success(`同步完成：成功 ${summary.success || 0} 条，失败 ${summary.failed || 0} 条，跳过 ${summary.skipped || 0} 条`)
    await loadQueue({ reset: true })
  } catch (err) {
    ElMessage.error(err.message || '同步失败')
  } finally {
    syncing.value = false
  }
}

async function save() {
  saving.value = true
  try {
    const data = await syncApi.saveSettings(payload())
    applySettings(data.settings)
    ElMessage.success('同步设置已保存')
  } catch (err) {
    ElMessage.error(err.message || '保存失败')
  } finally {
    saving.value = false
  }
}

async function saveSyncStores() {
  scopeSaving.value = true
  try {
    const data = await syncApi.saveSettings({ syncStores: form.syncStores })
    applySettings(data.settings)
    ElMessage.success('同步店铺已更新')
  } catch (err) {
    form.syncStores = [...savedSyncStores.value]
    ElMessage.error(err.message || '更新同步店铺失败')
  } finally {
    scopeSaving.value = false
  }
}

async function getToken() {
  fetchingToken.value = true
  try {
    const data = await syncApi.fetchToken(payload())
    applySettings(data.settings)
    ElMessage.success('已获取悟空CRM Token')
  } catch (err) {
    ElMessage.error(err.message || '获取Token失败')
  } finally {
    fetchingToken.value = false
  }
}

onMounted(() => {
  load()
  window.addEventListener('scroll', handleQueueMobileScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', handleQueueMobileScroll))
</script>
