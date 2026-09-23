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

    <el-card shadow="never" class="settings-card wecom-bot-card">
      <template #header>
        <div class="sync-card-head wecom-bot-head">
          <div>
            <div class="settings-row-label">企微销售群机器人分组与配额分发</div>
            <div class="settings-row-desc">按业务线、班次时段、店铺分组，支持设置每个销售群的每日分发配额（如 A 群满 50 条自动切 B 群）</div>
          </div>
          <div class="wecom-bot-header-actions">
            <div class="wecom-leader-link">
              <span class="wecom-leader-label">主管调度台:</span>
              <el-input :model-value="leaderLink" readonly />
              <el-button type="primary" @click="copyLeaderLink">复制链接</el-button>
            </div>
            <div class="wecom-global-toggle">
              <span>企微推送总开关</span>
              <el-switch v-model="botConfig.globalEnabled" :loading="botGlobalSaving" @change="toggleGlobal" />
            </div>
            <el-button type="primary" @click="openGroupCreate()">创建机器人分组</el-button>
          </div>
        </div>
      </template>

      <div class="wecom-group-body">
        <div v-if="botConfig.groups.length" class="wecom-bot-group-list">
          <article v-for="group in botConfig.groups" :key="group.id" class="wecom-group-panel">
            <div class="wecom-group-head">
              <div class="wecom-group-title-wrap">
                <strong>{{ group.name }}</strong>
                <el-tag size="small" :type="businessTypeTag(group.businessType)">{{ businessTypeText(group.businessType) }}</el-tag>
                <el-tag size="small" effect="plain">{{ dispatchModeText(group.dispatchMode) }}</el-tag>
              </div>
              <div class="wecom-group-actions">
                <el-switch v-model="group.enabled" size="small" :loading="groupSavingId === group.id" @change="updateGroupEnabled(group)" />
                <el-button size="small" @click="openBotCreate(group.id)">添加群机器人</el-button>
                <el-button size="small" @click="resetGroupCount(group)">清零计数</el-button>
                <el-button size="small" @click="openGroupCreate(group)">编辑分组</el-button>
                <el-button size="small" type="danger" plain @click="deleteGroup(group)">删除</el-button>
              </div>
            </div>
            <div class="wecom-group-content">
              <div class="wecom-group-meta">
                <span><b>适用店铺:</b> {{ formatGroupStores(group.stores) }}</span>
                <span><b>班次时段:</b> {{ formatTimeRanges(group.timeRanges) }}</span>
              </div>
              <div v-if="group.bots?.length" class="wecom-bot-grid">
                <div v-for="bot in group.bots" :key="bot.id" class="wecom-bot-item">
                  <div class="wecom-bot-item-head">
                    <strong>{{ bot.name }}</strong>
                    <el-switch v-model="bot.enabled" size="small" :loading="botSavingKey === `${group.id}-${bot.id}`" @change="updateBotEnabled(group, bot)" />
                  </div>
                  <div class="wecom-progress-wrap">
                    <div class="wecom-progress-info">
                      <span>今日分发进度</span>
                      <b :class="{ full: botIsFull(bot) }">{{ bot.todayCount || 0 }} / {{ bot.dailyQuota ? `${bot.dailyQuota} 条` : '无限制' }}</b>
                    </div>
                    <div class="wecom-progress-bar">
                      <div class="wecom-progress-fill" :class="{ full: botIsFull(bot) }" :style="{ width: `${bot.dailyQuota ? botPercent(bot) : 100}%` }"></div>
                    </div>
                  </div>
                  <div class="wecom-bot-item-actions">
                    <el-button size="small" class="wecom-action-test" @click="testBot(group, bot)">测试连通</el-button>
                    <el-button size="small" @click="openBotCreate(group.id, bot)">编辑配额</el-button>
                    <el-button size="small" type="danger" plain @click="deleteBot(group, bot)">移除</el-button>
                  </div>
                </div>
              </div>
              <div v-else class="wecom-group-empty">该分组下暂无机器人，请点击上方“添加群机器人”</div>
            </div>
          </article>
        </div>
        <div v-else class="wecom-empty-tip">暂未创建机器人分组，点击右上角“创建机器人分组”配置销售群分流方案</div>
      </div>
    </el-card>

    <el-dialog v-model="groupDialog.visible" :title="groupDialog.editingId ? '编辑机器人分组' : '新建机器人分组'" width="560px" destroy-on-close>
      <el-form label-position="top" class="settings-dialog-form">
        <el-form-item label="分组名称" required>
          <el-input v-model="groupDialog.form.name" placeholder="例如：职称白班销售分流组" maxlength="40" show-word-limit />
        </el-form-item>
        <el-form-item label="分发策略 / 规则">
          <el-select v-model="groupDialog.form.dispatchMode" class="full-width">
            <el-option value="quota" label="按数量配额分流（满配额后自动切换）" />
            <el-option value="round_robin" label="按比例轮询分发（机器人交替接收）" />
            <el-option value="broadcast" label="全量广播模式（组内机器人同时接收）" />
          </el-select>
        </el-form-item>
        <el-form-item label="关联业务类型">
          <el-select v-model="groupDialog.form.businessType" class="full-width">
            <el-option value="all" label="全部业务（职称 + 财税通用）" />
            <el-option value="zc" label="仅职称业务客户" />
            <el-option value="finance" label="仅财税业务客户" />
          </el-select>
        </el-form-item>
        <el-form-item label="适用店铺（不选则全部店铺通用）">
          <el-checkbox-group v-model="groupDialog.form.stores" class="wecom-store-options">
            <el-checkbox v-for="store in allBotStores" :key="store" :label="store" border>{{ store }}</el-checkbox>
          </el-checkbox-group>
          <span v-if="!allBotStores.length" class="form-help">暂无可选店铺</span>
        </el-form-item>
        <el-form-item label="班次与生效时段">
          <el-select v-model="groupDialog.timeShift" class="full-width">
            <el-option value="all" label="全天 24 小时生效" />
            <el-option value="day" label="白班时段（09:00 - 18:00）" />
            <el-option value="night" label="晚班/夜班时段（18:00 - 次日 09:00）" />
            <el-option value="custom" label="自定义时间段" />
          </el-select>
          <div v-if="groupDialog.timeShift === 'custom'" class="wecom-custom-time">
            <el-time-select v-model="groupDialog.form.startTime" start="00:00" step="00:30" end="23:30" placeholder="开始时间" />
            <span>至</span>
            <el-time-select v-model="groupDialog.form.endTime" start="00:00" step="00:30" end="23:30" placeholder="结束时间" />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="groupDialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="groupDialog.saving" @click="saveGroup">保存分组</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="botDialog.visible" :title="botDialog.editingId ? '编辑群机器人配置与配额' : '添加群机器人至该组'" width="520px" destroy-on-close>
      <el-form label-position="top" class="settings-dialog-form">
        <el-form-item label="机器人名称" required>
          <el-input v-model="botDialog.form.name" placeholder="例如：销售 1 群助手" maxlength="40" />
        </el-form-item>
        <el-form-item label="企业微信群 Webhook 地址" required>
          <el-input v-model="botDialog.form.webhookUrl" placeholder="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=..." />
        </el-form-item>
        <el-form-item label="每日分发配额（条）">
          <el-input-number v-model="botDialog.form.dailyQuota" :min="0" :step="10" controls-position="right" class="full-width" />
          <span class="form-help">0 表示不设上限</span>
        </el-form-item>
        <el-form-item label="机器人状态">
          <el-switch v-model="botDialog.form.enabled" active-text="启用" inactive-text="停用" />
        </el-form-item>
        <el-form-item v-if="botDialog.editingId" label="今日已分发数量">
          <el-input-number v-model="botDialog.form.todayCount" :min="0" controls-position="right" class="full-width" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="botDialog.visible = false">取消</el-button>
        <el-button type="primary" :loading="botDialog.saving" @click="saveBot">保存机器人</el-button>
      </template>
    </el-dialog>

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

      <el-table size="small" v-if="!isMobile" :data="queueRows" border class="settings-table sync-queue-table">
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { CaretBottom, CaretRight, Loading, RefreshRight } from '@element-plus/icons-vue'
import { syncApi } from '../services/api'
import { useResponsive } from '../composables/useResponsive'
import { copyText } from '../utils/clipboard'

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
const botStores = ref([])
const financeStores = ref([])
const botGlobalSaving = ref(false)
const groupSavingId = ref(null)
const botSavingKey = ref('')
const botConfig = reactive({ globalEnabled: true, groups: [] })
const groupDialog = reactive({ visible: false, editingId: null, saving: false, timeShift: 'all', form: emptyGroupForm() })
const botDialog = reactive({ visible: false, groupId: null, editingId: null, saving: false, form: emptyBotForm() })
const form = reactive({ enabled: true, baseUrl: '', username: '', password: '', hasPassword: false, hasToken: false, tokenUpdatedAt: '', tokenStatus: 'missing', tokenCheckedAt: '', syncStores: [] })
const tokenStatusText = computed(() => ({ valid: 'Token 正常', expired: 'Token 已过期', missing: '未获取 Token' })[form.tokenStatus] || '未连接')
const leaderLink = computed(() => `${window.location.origin}/bot-dispatch`)
const allBotStores = computed(() => Array.from(new Set([...botStores.value, ...financeStores.value])))

function emptyGroupForm() {
  return { name: '', dispatchMode: 'quota', businessType: 'all', stores: [], startTime: '09:00', endTime: '18:00' }
}

function emptyBotForm() {
  return { name: '', webhookUrl: '', dailyQuota: 50, todayCount: 0, enabled: true }
}

function businessTypeText(type) {
  return ({ all: '全部业务', zc: '职称业务', finance: '财税业务' })[type] || '全部业务'
}

function businessTypeTag(type) {
  return ({ all: '', zc: 'success', finance: 'warning' })[type] || ''
}

function dispatchModeText(mode) {
  return ({ quota: '按配额分流 (满额切下个)', round_robin: '轮询分流 (一人一条)', broadcast: '全量广播 (组内全发)' })[mode] || '按配额分流 (满额切下个)'
}

function formatGroupStores(values) {
  return Array.isArray(values) && values.length ? values.join('、') : '全部店铺'
}

function formatTimeRanges(values) {
  if (!Array.isArray(values) || !values.length) return '全天 24 小时'
  return values.map(range => `${range.start || '--:--'} - ${range.end || '--:--'}`).join('、')
}

function botPercent(bot) {
  if (!bot.dailyQuota) return 0
  return Math.min(100, Math.round(((bot.todayCount || 0) / bot.dailyQuota) * 100))
}

function botIsFull(bot) {
  return !!bot.dailyQuota && (bot.todayCount || 0) >= bot.dailyQuota
}

async function loadBotGroups() {
  try {
    const data = await syncApi.botGroups()
    const config = data.config || {}
    botConfig.globalEnabled = config.globalEnabled !== false
    botConfig.groups = Array.isArray(config.groups) ? config.groups : []
    botStores.value = data.stores || []
    financeStores.value = data.financeStores || []
  } catch (err) {
    ElMessage.error(err.message || '加载企微机器人配置失败')
  }
}

async function copyLeaderLink() {
  try {
    await copyText(leaderLink.value)
    ElMessage.success('主管入口已复制')
  } catch (err) {
    ElMessage.error(err.message || '复制失败')
  }
}

async function toggleGlobal(enabled) {
  botGlobalSaving.value = true
  try {
    const data = await syncApi.toggleBotGroups(enabled)
    botConfig.globalEnabled = data.globalEnabled !== false
    ElMessage.success(enabled ? '已开启企微推送' : '已关闭企微推送')
  } catch (err) {
    botConfig.globalEnabled = !enabled
    ElMessage.error(err.message || '更新企微推送开关失败')
  } finally {
    botGlobalSaving.value = false
  }
}

function groupTimeShift(timeRanges) {
  const range = Array.isArray(timeRanges) && timeRanges[0]
  if (!range) return 'all'
  if (range.start === '09:00' && range.end === '18:00') return 'day'
  if (range.start === '18:00' && range.end === '09:00') return 'night'
  return 'custom'
}

function openGroupCreate(group = null) {
  const source = group || {}
  Object.assign(groupDialog.form, emptyGroupForm(), {
    name: source.name || '',
    dispatchMode: source.dispatchMode || 'quota',
    businessType: source.businessType || 'all',
    stores: Array.isArray(source.stores) ? [...source.stores] : [],
    startTime: source.timeRanges?.[0]?.start || '09:00',
    endTime: source.timeRanges?.[0]?.end || '18:00'
  })
  groupDialog.editingId = source.id || null
  groupDialog.timeShift = groupTimeShift(source.timeRanges)
  groupDialog.visible = true
}

function groupPayload() {
  let timeRanges = []
  if (groupDialog.timeShift === 'day') timeRanges = [{ start: '09:00', end: '18:00' }]
  if (groupDialog.timeShift === 'night') timeRanges = [{ start: '18:00', end: '09:00' }]
  if (groupDialog.timeShift === 'custom') timeRanges = [{ start: groupDialog.form.startTime, end: groupDialog.form.endTime }]
  return { name: groupDialog.form.name.trim(), dispatchMode: groupDialog.form.dispatchMode, businessType: groupDialog.form.businessType, stores: [...groupDialog.form.stores], timeRanges }
}

async function saveGroup() {
  if (!groupDialog.form.name.trim()) {
    ElMessage.warning('请填写分组名称')
    return
  }
  groupDialog.saving = true
  try {
    if (groupDialog.editingId) await syncApi.updateBotGroup(groupDialog.editingId, groupPayload())
    else await syncApi.createBotGroup(groupPayload())
    groupDialog.visible = false
    await loadBotGroups()
    ElMessage.success('机器人分组已保存')
  } catch (err) {
    ElMessage.error(err.message || '保存分组失败')
  } finally {
    groupDialog.saving = false
  }
}

async function updateGroupEnabled(group) {
  groupSavingId.value = group.id
  try {
    await syncApi.updateBotGroup(group.id, { enabled: group.enabled })
  } catch (err) {
    group.enabled = !group.enabled
    ElMessage.error(err.message || '更新分组开关失败')
  } finally {
    groupSavingId.value = null
  }
}

async function deleteGroup(group) {
  try {
    await ElMessageBox.confirm(`确定删除分组“${group.name}”及其组内的所有机器人吗？`, '删除确认', { type: 'warning' })
    await syncApi.removeBotGroup(group.id)
    await loadBotGroups()
    ElMessage.success('机器人分组已删除')
  } catch (err) {
    if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '删除分组失败')
  }
}

async function resetGroupCount(group) {
  try {
    await ElMessageBox.confirm(`确定将分组“${group.name}”今日已发计数全部清零吗？`, '重置确认', { type: 'warning' })
    await syncApi.resetBotCounts(group.id)
    await loadBotGroups()
    ElMessage.success('今日分发计数已清零')
  } catch (err) {
    if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '重置计数失败')
  }
}

function openBotCreate(groupId, bot = null) {
  Object.assign(botDialog.form, emptyBotForm(), bot ? {
    name: bot.name || '', webhookUrl: bot.webhookUrl || '', dailyQuota: bot.dailyQuota || 0, todayCount: bot.todayCount || 0, enabled: bot.enabled !== false
  } : {})
  botDialog.groupId = groupId
  botDialog.editingId = bot?.id || null
  botDialog.visible = true
}

function botPayload() {
  return {
    name: botDialog.form.name.trim(),
    webhookUrl: botDialog.form.webhookUrl.trim(),
    dailyQuota: Number(botDialog.form.dailyQuota) || 0,
    enabled: botDialog.form.enabled,
    ...(botDialog.editingId ? { todayCount: Number(botDialog.form.todayCount) || 0 } : {})
  }
}

async function saveBot() {
  if (!botDialog.form.name.trim()) {
    ElMessage.warning('请填写机器人名称')
    return
  }
  if (!/^https?:\/\//i.test(botDialog.form.webhookUrl.trim())) {
    ElMessage.warning('请填写正确的 Webhook 地址')
    return
  }
  botDialog.saving = true
  try {
    if (botDialog.editingId) await syncApi.updateBot(botDialog.groupId, botDialog.editingId, botPayload())
    else await syncApi.addBot(botDialog.groupId, botPayload())
    botDialog.visible = false
    await loadBotGroups()
    ElMessage.success('机器人配置已保存')
  } catch (err) {
    ElMessage.error(err.message || '保存机器人失败')
  } finally {
    botDialog.saving = false
  }
}

async function updateBotEnabled(group, bot) {
  const key = `${group.id}-${bot.id}`
  botSavingKey.value = key
  try {
    await syncApi.updateBot(group.id, bot.id, { enabled: bot.enabled })
  } catch (err) {
    bot.enabled = !bot.enabled
    ElMessage.error(err.message || '更新机器人开关失败')
  } finally {
    botSavingKey.value = ''
  }
}

async function deleteBot(group, bot) {
  try {
    await ElMessageBox.confirm(`确定从该分组中移除机器人“${bot.name}”吗？`, '删除确认', { type: 'warning' })
    await syncApi.removeBot(group.id, bot.id)
    await loadBotGroups()
    ElMessage.success('机器人已移除')
  } catch (err) {
    if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '移除机器人失败')
  }
}

async function testBot(group, bot) {
  try {
    await ElMessageBox.confirm(`将向“${bot.name}”发送一条测试消息，是否继续？`, '连通性测试', { type: 'info' })
    await syncApi.testBot(group.id, bot.id)
    ElMessage.success('测试消息发送成功')
  } catch (err) {
    if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '测试发送失败')
  }
}

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
    await loadBotGroups()
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
