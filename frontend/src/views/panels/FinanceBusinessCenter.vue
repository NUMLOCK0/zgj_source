<template>
  <section class="zc-business-center fn-business-center">
    <div class="zc-page-heading"><span class="zc-heading-mark">✎</span><strong>{{ businessLabel }}信息快速整理与登记</strong></div>

    <section class="zc-extract-card">
      <div class="zc-card-head"><div class="zc-card-title"><span class="zc-badge fn-badge">智能提取</span><h2>{{ businessLabel }}客户信息整理</h2></div></div>
      <el-input v-model="rawText" class="zc-textarea" type="textarea" :rows="isMobile ? 7 : 6" :placeholder="`在此粘贴客户聊天记录、${businessLabel}需求、电商订单号、企业开户信息...`" @input="persistDraft" />
      <div class="zc-textarea-status"><span><i />{{ rawText ? '已暂存' : '就绪' }}</span><span>{{ rawText.length }} 字</span></div>
      <div v-if="duplicate" class="zc-duplicate-alert"><strong>检测到疑似撞单线索！</strong><p>匹配到 {{ duplicate.matchedBy }}，已由客服【{{ duplicate.record?.createdBy }}】于 {{ duplicate.record?.date }} 登记，请勿重复登记。</p></div>
      <div class="zc-extract-actions"><el-button type="primary" size="large" class="zc-btn-extract" :loading="extracting" :disabled="!canExtract || extracting" @click="extract">智能提取并登记</el-button><el-button size="large" class="zc-btn-clear" :disabled="extracting" @click="clearDraft">清空</el-button></div>
    </section>

    <div class="zc-teacher-row"><label>被加老师微信：</label><el-input v-model="teacherWechat" placeholder="主动添加时填写老师微信" clearable /><el-button class="zc-photo-button" :icon="Camera" @click="pickQr">相册选名片/拍二维码</el-button><input ref="qrInput" type="file" accept="image/*" hidden @change="uploadQr" /></div>

    <div class="zc-section-title"><div><span class="zc-section-icon">▧</span><strong>{{ businessLabel }}留资与提成核算（{{ statDate }}）</strong></div><el-date-picker v-model="date" type="date" value-format="YYYY-MM-DD" size="small" clearable /></div>
    <div class="zc-stat-grid fn-stat-grid">
      <div class="zc-stat-card"><span>{{ businessLabel }}总留资</span><strong>{{ overview.leads }}<small> 条</small></strong></div>
      <div class="zc-stat-card"><span>5元单（录入单号）</span><strong class="green">{{ overview.five }}<small> 条</small></strong><em>￥{{ money(overview.five * 5) }} 提成</em></div>
      <div class="zc-stat-card"><span>2元单（未录入单号）</span><strong class="orange">{{ overview.two }}<small> 条</small></strong><em>￥{{ money(overview.two * 2) }} 提成</em></div>
      <div class="zc-stat-card"><span>{{ businessLabel }}今日提成</span><strong class="red">￥{{ money(overview.commission) }}</strong></div>
    </div>

    <div v-if="!isMobile" class="zc-stats-table-wrap"><el-table size="small" v-loading="statsLoading" :data="stats" stripe border class="zc-stats-table fn-stats-table">
      <el-table-column prop="username" label="员工姓名" min-width="180" />
      <el-table-column :label="`${businessLabel}订单构成（5元单 · 2元单）`" min-width="300" align="center"><template #default="{ row }"><div class="fn-order-mix"><span>5元单：<strong>{{ row.orderCount }}</strong> 条（￥{{ row.orderCount * 5 }}）</span><span>2元单：<strong>{{ row.noOrderCount }}</strong> 条（￥{{ row.noOrderCount * 2 }}）</span></div></template></el-table-column>
      <el-table-column :label="`${businessLabel}总留资`" width="125" align="center"><template #default="{ row }"><strong class="zc-lead-num">{{ row.leadCount }}</strong><small> 条</small></template></el-table-column>
      <el-table-column :label="`${businessLabel}总咨询量`" width="180" align="center"><template #default="{ row }"><el-input-number v-if="canEditConsult" :model-value="row.consultCount" :min="0" size="small" controls-position="right" @change="value => saveConsult(row, value)" /><span v-else>{{ row.consultCount }}</span></template></el-table-column>
      <el-table-column :label="`${businessLabel}提成`" width="140" align="center"><template #default="{ row }"><strong class="zc-commission">￥{{ money(row.commission) }}</strong></template></el-table-column>
    </el-table><el-empty v-if="!stats.length && !statsLoading" description="暂无统计数据" /></div>
    <div v-else class="zc-mobile-stats"><article v-for="row in stats" :key="row.rawUser || row.username" class="zc-staff-card"><div class="zc-staff-head"><div><span class="fn-avatar">{{ (row.username || '员')[0] }}</span><strong>{{ row.username }}</strong></div><strong class="zc-commission">￥{{ money(row.commission) }}</strong></div><div class="fn-mobile-order"><span>5元单 <b>{{ row.orderCount }}</b></span><span>2元单 <b>{{ row.noOrderCount }}</b></span><span>总留资 <b class="zc-lead-num">{{ row.leadCount }}</b></span></div><label class="fn-mobile-consult">{{ businessLabel }}咨询量 <el-input-number v-if="canEditConsult" :model-value="row.consultCount" :min="0" size="small" @change="value => saveConsult(row, value)" /><b v-else>{{ row.consultCount }}</b></label></article><el-empty v-if="!stats.length" description="暂无统计数据" /></div>

    <el-dialog v-model="registerVisible" :title="`${businessLabel}客户登记`" :width="isMobile ? '94%' : '580px'" :close-on-click-modal="false">
      <div v-if="cardData" class="zc-register-dialog"><div class="fn-commission-notice" :class="cardData.orderNo ? 'is-five' : 'is-two'">{{ cardData.orderNo ? '已包含有效订单编号 · 享受 ￥5.0/条提成' : '未包含订单编号 · 按基础 ￥2.0/条计算提成' }}</div><div class="zc-modal-label">选择分配店铺</div><div class="zc-store-chips"><button v-for="store in stores" :key="store" type="button" :class="{ active: selectedStore === store }" @click="selectedStore = store">{{ store }}</button><button type="button" class="random" @click="randomStore">随机</button></div><el-input v-model="selectedStore" class="zc-store-input" placeholder="或直接输入自定义店铺名称" /><div class="zc-modal-label">客户字段校对</div><el-form label-position="top"><el-row :gutter="12"><el-col :xs="24" :sm="12"><el-form-item label="订单编号"><el-input v-model="cardData.orderNo" :class="{ 'is-error': orderWarning }" @input="onOrderChange" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="业务类型"><el-select v-model="cardData.serviceType" style="width:100%"><el-option v-for="item in serviceTypes" :key="item" :label="item" :value="item" /></el-select></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="联系电话"><el-input v-model="cardData.phone" @change="checkDuplicate" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="微信号"><el-input v-model="cardData.wechat" @change="checkDuplicate" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="纳税性质"><el-input v-model="cardData.taxpayerType" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="所在城市"><el-input v-model="cardData.city" /></el-form-item></el-col><el-col :xs="24"><el-form-item label="备注"><el-input v-model="cardData.remarks" type="textarea" :rows="2" /></el-form-item></el-col></el-row></el-form><p v-if="orderWarning" class="fn-order-warning">{{ orderWarning }}</p></div>
      <template #footer><el-button @click="registerVisible = false">取消</el-button><el-button type="primary" :loading="registering" @click="register">确定登记 · 复制 · 同步 CRM</el-button></template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Camera } from '@element-plus/icons-vue'
import { aiApi, customerApi, financeApi, financeStatsApi } from '../../services/api'
import { copyText } from '../../utils/clipboard'
import { extractFinanceInfo, formatFinanceCard, validateFinanceOrderNo } from '../../utils/financeExtract'
import { useResponsive } from '../../composables/useResponsive'

const props = defineProps({ user: Object, hasPerm: Function, businessLabel: { type: String, default: '财税' } })
const { isMobile } = useResponsive()
const rawText = ref(localStorage.getItem('fn_extract_draft_text') || '')
const teacherWechat = ref('')
const qrCodeUrl = ref('')
const cardData = ref(null)
const duplicate = ref(null)
const stores = ref([])
const serviceTypes = ref([])
const selectedStore = ref('')
const registerVisible = ref(false)
const registering = ref(false)
const extracting = ref(false)
const qrInput = ref(null)
const date = ref(localDate(new Date()))
const stats = ref([])
const statsLoading = ref(false)
const orderWarning = ref('')
const businessLabel = computed(() => props.businessLabel || '财税')
const isJournalBusiness = computed(() => businessLabel.value === '期刊')

function hasPerm(name) { return props.hasPerm ? props.hasPerm(name) : false }
function localDate(value) { return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}` }
function money(value) { return Number(value || 0).toFixed(1) }
const statDate = computed(() => date.value || localDate(new Date()))
const canExtract = computed(() => hasPerm('financeExtract') || hasPerm('extract'))
const canRegister = computed(() => hasPerm('financeRegister') || hasPerm('register'))
const canEditConsult = computed(() => Boolean(props.user?.isAdmin || hasPerm('editConsult')))
const overview = computed(() => ({
  leads: stats.value.reduce((sum, row) => sum + Number(row.leadCount || 0), 0),
  five: stats.value.reduce((sum, row) => sum + Number(row.orderCount || 0), 0),
  two: stats.value.reduce((sum, row) => sum + Number(row.noOrderCount || 0), 0),
  commission: stats.value.reduce((sum, row) => sum + Number(row.commission || 0), 0)
}))

async function loadConfigs() {
  try {
    const data = await financeApi.configs()
    stores.value = data.stores || []
    serviceTypes.value = isJournalBusiness.value ? ['期刊业务'] : data.configs?.serviceTypes || []
  } catch (error) {}
}
async function loadDay() {
  statsLoading.value = true
  try { stats.value = (await financeStatsApi.leadDay(date.value)).stats || [] } catch (error) { ElMessage.error(error.message || `加载${businessLabel.value}统计失败`) } finally { statsLoading.value = false }
}
function persistDraft() { localStorage.setItem('fn_extract_draft_text', rawText.value) }
function clearDraft() { rawText.value = ''; cardData.value = null; duplicate.value = null; teacherWechat.value = ''; qrCodeUrl.value = ''; orderWarning.value = ''; localStorage.removeItem('fn_extract_draft_text') }
async function checkDuplicate() {
  if (!cardData.value) return
  try { const data = await customerApi.checkDuplicate({ phone: cardData.value.phone, wechat: cardData.value.wechat, orderNo: cardData.value.orderNo, scope: 'finance' }); duplicate.value = data.duplicate ? data : null } catch (error) {}
}
async function extract() {
  if (!canExtract.value) return ElMessage.warning('无信息提取权限')
  if (!rawText.value.trim()) return ElMessage.warning('请先粘贴内容')
  extracting.value = true
  try {
    try {
      const result = await aiApi.extract(rawText.value, 'finance')
      cardData.value = result.data || extractFinanceInfo(rawText.value)
      ElMessage.success(`AI识别完成${result.model ? `（${result.model}）` : ''}`)
    } catch (aiError) {
      cardData.value = extractFinanceInfo(rawText.value)
      ElMessage.warning(`AI识别暂不可用，已使用本地规则提取：${aiError.message || '未知错误'}`)
    }
    if (isJournalBusiness.value) cardData.value.serviceType = '期刊业务'
    await loadConfigs()
    await checkDuplicate()
    selectedStore.value = stores.value[0] || ''
    orderWarning.value = validateFinanceOrderNo(cardData.value.orderNo).warning
    registerVisible.value = true
  } finally {
    extracting.value = false
  }
}
function onOrderChange() { orderWarning.value = validateFinanceOrderNo(cardData.value?.orderNo).warning; checkDuplicate() }
function randomStore() { if (stores.value.length) selectedStore.value = stores.value[Math.floor(Math.random() * stores.value.length)] }
async function register() {
  if (!cardData.value || !canRegister.value) return ElMessage.warning('无登记权限')
  orderWarning.value = validateFinanceOrderNo(cardData.value.orderNo).warning
  if (orderWarning.value) return ElMessage.warning(orderWarning.value)
  if (duplicate.value) { try { await ElMessageBox.confirm(`系统检测到疑似重复线索（${duplicate.value.matchedBy} 已由 ${duplicate.value.record?.createdBy} 登记），确定仍要登记吗？`, '防撞单提示', { type: 'warning' }) } catch (error) { return } }
  registering.value = true
  try {
    const payload = { ...cardData.value, name: '', companyName: '', assignedTo: selectedStore.value, teacherWechat: teacherWechat.value, qrCodeUrl: qrCodeUrl.value }
    await copyText(formatFinanceCard(payload))
    await financeApi.create(payload)
    registerVisible.value = false
    clearDraft()
    ElMessage.success(`已登记并复制信息卡（提成 ￥${payload.orderNo ? '5.0' : '2.0'}）`)
    await loadDay()
  } catch (error) { ElMessage.error(error.message || '登记失败') } finally { registering.value = false }
}
function pickQr() { qrInput.value?.click() }
async function uploadQr(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return
  if (file.size > 8 * 1024 * 1024) return ElMessage.warning('图片不能超过 8MB')
  try {
    const image = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file) })
    const data = await customerApi.uploadQrcode(image, file.name)
    qrCodeUrl.value = data.url || ''
    ElMessage.success('二维码名片已暂存')
  } catch (error) { ElMessage.error(error.message || '二维码上传失败') }
}
async function saveConsult(row, value) {
  try { await financeStatsApi.saveConsult({ date: date.value, username: row.rawUser || row.username, consultCount: Number(value || 0), invalidConsultCount: Number(row.invalidConsultCount || 0) }); ElMessage.success(`${businessLabel.value}咨询量已保存`); await loadDay() } catch (error) { ElMessage.error(error.message || '保存失败') }
}
watch(date, loadDay)
onMounted(() => { loadConfigs(); loadDay() })
</script>
