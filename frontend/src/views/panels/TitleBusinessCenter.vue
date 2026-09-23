<template>
  <section class="zc-business-center">
    <div class="zc-page-heading"><span class="zc-heading-mark">✎</span><strong>职称信息快速整理与登记</strong></div>

    <section class="zc-extract-card">
      <div class="zc-card-head"><div class="zc-card-title"><span class="zc-badge">智能提取</span><h2>职称客户信息整理</h2></div><span class="zc-rule-pill">全字段自动识别</span></div>
      <el-input v-model="rawText" class="zc-textarea" type="textarea" :rows="isMobile ? 7 : 6" placeholder="在此粘贴客户聊天记录、客户描述或报名信息..." @input="persistDraft" />
      <div class="zc-textarea-status"><span><i />{{ rawText ? '就绪' : '就绪' }}</span><span>{{ rawText.length }} 字</span></div>
      <div v-if="duplicate" class="zc-duplicate-alert"><strong>检测到疑似撞单客户！</strong><p>匹配到 {{ duplicate.matchedBy }}，已由客服【{{ duplicate.record?.createdBy }}】于 {{ duplicate.record?.date }} 登记在【{{ duplicate.record?.store }}】，请勿重复登记。</p></div>
      <div class="zc-extract-actions"><el-button type="primary" size="large" class="zc-btn-extract" :loading="extracting" :disabled="!hasPerm('extract') || extracting" @click="extract">智能提取并登记</el-button><el-button size="large" class="zc-btn-clear" :disabled="extracting" @click="clearDraft">清空</el-button></div>
    </section>

    <div class="zc-teacher-row"><label>被加老师微信：</label><el-input v-model="teacherWechat" placeholder="主动添加时填写老师微信" clearable /><el-button class="zc-photo-button" :icon="Camera" @click="pickQr">相册选名片/拍二维码</el-button><input ref="qrInput" type="file" accept="image/*" hidden @change="uploadQr" /></div>

    <div class="zc-section-title"><div><span class="zc-section-icon">▧</span><strong>职称留资与提成核算（{{ statDate }}）</strong></div><el-date-picker v-model="date" type="date" value-format="YYYY-MM-DD" size="small" clearable /></div>
    <div class="zc-stat-grid">
      <div class="zc-stat-card"><span>职称今日留资</span><strong>{{ overview.leads }}<small> 条</small></strong></div>
      <div class="zc-stat-card"><span>职称总咨询量</span><strong>{{ overview.consult }}<small> 人</small></strong></div>
      <div class="zc-stat-card"><span>职称意向留资率</span><strong class="green">{{ overview.rate }}%</strong></div>
      <div class="zc-stat-card"><span>职称今日提成</span><strong class="red">￥{{ money(overview.commission) }}</strong></div>
    </div>

    <div v-if="!isMobile" class="zc-stats-table-wrap"><el-table size="small" v-loading="statsLoading" :data="stats" stripe border class="zc-stats-table">
      <el-table-column prop="username" label="员工姓名" min-width="260" />
      <el-table-column label="职称总咨询（可直接修改）" min-width="180" align="center"><template #default="{ row }"><el-input-number v-if="canEditConsult" :model-value="row.consultCount" :min="0" size="small" controls-position="right" @change="value => saveConsult(row, value, 'consult')" /><span v-else>{{ row.consultCount }}</span></template></el-table-column>
      <el-table-column label="职称无效咨询" width="180" align="center"><template #default="{ row }"><el-input-number v-if="canEditConsult" :model-value="row.invalidConsultCount || 0" :min="0" size="small" controls-position="right" @change="value => saveConsult(row, value, 'invalid')" /><span v-else>{{ row.invalidConsultCount || 0 }}</span></template></el-table-column>
      <el-table-column label="意向咨询" width="115" align="center"><template #default="{ row }">{{ intended(row) }}</template></el-table-column>
      <el-table-column label="留资总量" width="120" align="center"><template #default="{ row }"><strong class="zc-lead-num">{{ row.leadCount }}</strong><small> 条</small></template></el-table-column>
      <el-table-column label="意向留资率" width="125" align="center"><template #default="{ row }"><span class="zc-rate-pill" :class="rateClass(row)">{{ rowRate(row) }}%</span></template></el-table-column>
      <el-table-column label="职称提成" width="135" align="center"><template #default="{ row }"><strong class="zc-commission">￥{{ money(row.commission) }}</strong></template></el-table-column>
    </el-table></div>
    <div v-else class="zc-mobile-stats"><article v-for="row in stats" :key="row.rawUser || row.username" class="zc-staff-card"><div class="zc-staff-head"><strong>{{ row.username }}</strong><strong class="zc-commission">￥{{ money(row.commission) }}</strong></div><div class="zc-staff-grid"><label>总咨询 <el-input-number v-if="canEditConsult" :model-value="row.consultCount" :min="0" size="small" @change="value => saveConsult(row, value, 'consult')" /><b v-else>{{ row.consultCount }}</b></label><label>无效咨询 <el-input-number v-if="canEditConsult" :model-value="row.invalidConsultCount || 0" :min="0" size="small" @change="value => saveConsult(row, value, 'invalid')" /><b v-else>{{ row.invalidConsultCount || 0 }}</b></label><label>意向咨询 <b>{{ intended(row) }}</b></label><label>留资总量 <b class="zc-lead-num">{{ row.leadCount }}</b></label><label>意向率 <b class="zc-rate-pill" :class="rateClass(row)">{{ rowRate(row) }}%</b></label></div></article><el-empty v-if="!stats.length" description="暂无统计数据" /></div>

    <el-dialog v-model="registerVisible" title="职称客户登记与 CRM 同步" :width="isMobile ? '94%' : '580px'" :close-on-click-modal="false">
      <div v-if="cardData" class="zc-register-dialog"><div class="zc-modal-label">选择分配店铺</div><div class="zc-store-chips"><button v-for="store in stores" :key="store" type="button" :class="{ active: selectedStore === store }" @click="selectedStore = store">{{ store }}</button><button type="button" class="random" @click="randomStore">随机</button></div><el-input v-model="selectedStore" class="zc-store-input" placeholder="或直接输入自定义店铺名称" /><div class="zc-modal-label">客户字段校对</div><el-form label-position="top"><el-row :gutter="12"><el-col :xs="24" :sm="12"><el-form-item label="联系电话"><el-input v-model="cardData.phone" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="微信号"><el-input v-model="cardData.wechat" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="学历"><el-input v-model="cardData.degree" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="专业"><el-input v-model="cardData.major" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="申报专业"><el-input v-model="cardData.reviewMajor" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="申报级别"><el-input v-model="cardData.applyLevel" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="现有职称"><el-input v-model="cardData.titleLevel" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="社保城市"><el-input v-model="cardData.ssCity" /></el-form-item></el-col><el-col :xs="24"><el-form-item label="备注"><el-input v-model="cardData.remarks" type="textarea" :rows="2" /></el-form-item></el-col></el-row></el-form></div>
      <template #footer><el-button @click="registerVisible = false">取消</el-button><el-button type="primary" :loading="registering" @click="register">确定登记 · 复制 · 同步 CRM</el-button></template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Camera } from '@element-plus/icons-vue'
import { aiApi, customerApi, statsApi } from '../../services/api'
import { copyText } from '../../utils/clipboard'
import { extractInfo, formatCard } from '../../utils/customerExtract'
import { useResponsive } from '../../composables/useResponsive'

const props = defineProps({ user: Object, hasPerm: Function })
const { isMobile } = useResponsive()
const rawText = ref(localStorage.getItem('zc_extract_draft_text') || '')
const teacherWechat = ref('')
const qrCodeUrl = ref('')
const cardData = ref(null)
const duplicate = ref(null)
const stores = ref([])
const selectedStore = ref('')
const registerVisible = ref(false)
const registering = ref(false)
const extracting = ref(false)
const qrInput = ref(null)
const date = ref(localDate(new Date()))
const stats = ref([])
const statsLoading = ref(false)

function hasPerm(name) { return props.hasPerm ? props.hasPerm(name) : false }
function localDate(value) { return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}` }
function money(value) { return Number(value || 0).toFixed(1) }
const statDate = computed(() => date.value || localDate(new Date()))
const canEditConsult = computed(() => Boolean(props.user?.isAdmin || (hasPerm('editConsult') && date.value === localDate(new Date()))))
const overview = computed(() => {
  const leads = stats.value.reduce((sum, row) => sum + Number(row.leadCount || 0), 0)
  const consult = stats.value.reduce((sum, row) => sum + Number(row.consultCount || 0), 0)
  const invalid = stats.value.reduce((sum, row) => sum + Number(row.invalidConsultCount || 0), 0)
  const intendedCount = Math.max(0, consult - invalid)
  const commission = stats.value.reduce((sum, row) => sum + Number(row.commission || 0), 0)
  return { leads, consult, rate: intendedCount ? Math.round(leads / intendedCount * 1000) / 10 : 0, commission }
})
function intended(row) { return Math.max(0, Number(row.consultCount || 0) - Number(row.invalidConsultCount || 0)) }
function rowRate(row) { const count = intended(row); return count ? Math.round(Number(row.leadCount || 0) / count * 1000) / 10 : 0 }
function rateClass(row) { return rowRate(row) >= 55 ? 'high' : rowRate(row) >= 30 ? 'mid' : 'low' }
async function loadStores() { try { const data = await customerApi.stores(); stores.value = data.stores || [] } catch (error) {} }
async function loadDay() { statsLoading.value = true; try { const data = await statsApi.leadDay(date.value); stats.value = data.stats || [] } catch (error) { ElMessage.error(error.message || '加载职称统计失败') } finally { statsLoading.value = false } }
function persistDraft() { localStorage.setItem('zc_extract_draft_text', rawText.value) }
function clearDraft() { rawText.value = ''; cardData.value = null; duplicate.value = null; teacherWechat.value = ''; qrCodeUrl.value = ''; localStorage.removeItem('zc_extract_draft_text') }
async function extract() {
  if (!hasPerm('extract')) return ElMessage.warning('无信息提取权限')
  if (!rawText.value.trim()) return ElMessage.warning('请先粘贴内容')
  extracting.value = true
  try {
    try {
      const result = await aiApi.extract(rawText.value, 'customer')
      cardData.value = result.data || extractInfo(rawText.value)
      ElMessage.success(`AI识别完成${result.model ? `（${result.model}）` : ''}`)
    } catch (aiError) {
      cardData.value = extractInfo(rawText.value)
      ElMessage.warning(`AI识别暂不可用，已使用本地规则提取：${aiError.message || '未知错误'}`)
    }
    const data = await customerApi.checkDuplicate({ phone: cardData.value.phone, wechat: cardData.value.wechat, scope: 'customer' })
    duplicate.value = data.duplicate ? data : null
    selectedStore.value = stores.value[0] || ''
    registerVisible.value = true
  } catch (error) { ElMessage.error(error.message || '信息提取失败') } finally { extracting.value = false }
}
function randomStore() { if (stores.value.length) selectedStore.value = stores.value[Math.floor(Math.random() * stores.value.length)] }
async function register() {
  if (!cardData.value || !hasPerm('register')) return ElMessage.warning('无登记权限')
  if (duplicate.value) { try { await ElMessageBox.confirm(`系统检测到疑似重复客户（${duplicate.value.matchedBy} 已由 ${duplicate.value.record?.createdBy} 登记），确定仍要登记吗？`, '防撞单提示', { type: 'warning' }) } catch (error) { return } }
  registering.value = true
  try {
    const payload = { ...cardData.value, name: '', assignedTo: selectedStore.value, teacherWechat: teacherWechat.value, qrCodeUrl: qrCodeUrl.value, syncNow: true }
    await copyText(formatCard(payload))
    const data = await customerApi.create(payload)
    registerVisible.value = false
    clearDraft()
    ElMessage.success(data.sync?.status === 'synced' ? '已登记并同步 CRM' : '已登记，已加入同步队列')
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
async function saveConsult(row, value, type) {
  try { await statsApi.saveConsult({ date: date.value, username: row.rawUser || row.username, consultCount: type === 'consult' ? Number(value || 0) : Number(row.consultCount || 0), invalidConsultCount: type === 'invalid' ? Number(value || 0) : Number(row.invalidConsultCount || 0) }); ElMessage.success('咨询量已保存'); await loadDay() } catch (error) { ElMessage.error(error.message || '保存失败') }
}
watch(date, loadDay)
onMounted(() => { loadStores(); loadDay() })
</script>
