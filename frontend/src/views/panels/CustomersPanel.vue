<template>
  <section class="customers-page">
    <div class="panel-header">
      <div class="panel-title-group">
        <h2>职称客户登记表</h2>
        <span class="customer-count">共 {{ total }} 条记录 · 已成交 <strong class="text-green">{{ dealtCount }}</strong> 条</span>
      </div>
      <div class="panel-actions">
        <DataTransfer
          scope-label="职称客户"
          :can-export="hasPerm('exportExcel') || hasPerm('viewData')"
          :can-import="hasPerm('register')"
          :show-export-dialog="true"
          :allow-empty-export-range="true"
          :default-export-range="customDateRange"
          :export-url="exportUrl"
          :import-request="customerApi.importRows"
          fallback-filename="customers.csv"
          :key-headers="['联系电话', '电话', '微信']"
          import-fields-hint="支持列：联系电话、微信、学历、专业、现有职称、社保城市、申报专业、申报级别、分配店铺、备注、结论"
          @imported="load"
        />
        <el-button :icon="Refresh" :loading="loading" @click="load">刷新</el-button>
        <el-button v-if="selected.length && hasPerm('delete')" type="danger" :icon="Delete" @click="batchRemove">批量删除({{ selected.length }})</el-button>
      </div>
    </div>

    <div class="filter-row-unified">
      <el-input v-model="keyword" class="search-pill-input" placeholder="搜索姓名/电话/微信/店铺/专业/录入人" clearable @keyup.enter="load" />
      <el-select v-model="storeFilter" placeholder="选择店铺" clearable @change="load"><el-option v-for="store in stores" :key="store" :label="store" :value="store" /></el-select>
      <UnifiedDateFilter v-model="customDateRange" default-type="all" @change="onDateRangeChange" />
      <el-button type="primary" :icon="Search" class="btn-search-pill" @click="load">查询</el-button>
    </div>

    <div v-if="isMobile" class="mobile-list app-m-card-flow">
      <article v-for="row in rows" :key="row.id" class="app-m-contact-card">
        <div class="card-header-bar"><div class="header-left"><span class="customer-avatar-badge">{{ (row.reviewMajor || '客')[0] }}</span><div class="customer-main-info"><strong class="major-title">{{ [row.reviewMajor, row.applyLevel].filter(Boolean).join(' · ') || '职称申报' }}</strong><span class="sub-date">{{ row.date }}</span></div></div><el-tag size="small" effect="light">{{ row.assignedTo || '未分配' }}</el-tag></div>
        <div class="card-content-grid"><div class="data-chip"><span class="chip-lbl">学历专业</span><span class="chip-val">{{ [row.degree, row.major].filter(Boolean).join(' · ') || '-' }}</span></div><div class="data-chip"><span class="chip-lbl">职称社保</span><span class="chip-val">{{ [row.titleLevel, row.ssCity].filter(Boolean).join(' · ') || '-' }}</span></div></div>
        <div class="card-contact-row"><button v-if="row.phone" type="button" class="app-tap-pill" @click="copyContact(row.phone, '手机号')"><span class="pill-text">{{ displayContact(row, 'phone') }}</span><span class="pill-action">复制</span></button><button v-if="row.wechat" type="button" class="app-tap-pill" @click="copyContact(row.wechat, '微信号')"><span class="pill-text">微: {{ displayContact(row, 'wechat') }}</span><span class="pill-action">复制</span></button></div>
        <div v-if="row.remarks" class="card-remarks-box"><span class="rem-text">{{ row.remarks }}</span></div>
        <div class="card-footer-flex"><span class="creator-stamp">录入客服：<strong>{{ row.createdBy || '未知' }}</strong></span><div class="card-actions-right"><RecordLogsPopover record-type="customer" :record-id="row.id" /><button v-if="hasPerm('edit')" type="button" class="btn-app-text-action" @click="openEdit(row)">编辑</button><button v-if="hasPerm('delete')" type="button" class="btn-app-text-action text-danger" @click="remove(row)">删除</button></div></div>
      </article>
      <el-empty v-if="!rows.length && !loading" description="暂无职称客户记录" :image-size="48" />
    </div>

    <el-table size="small" v-else v-loading="loading" :data="rows" stripe border class="data-table compact-table" @selection-change="selected = $event">
      <el-table-column type="selection" width="40" />
      <el-table-column prop="seq" label="序号" width="55" align="center" />
      <el-table-column label="登记时间" width="130"><template #default="{ row }"><span class="cell-time-text">{{ row.date ? row.date.slice(2, 16) : '-' }}</span></template></el-table-column>
      <el-table-column label="联系方式" width="140"><template #default="{ row }"><div class="contact-wrap-compact"><span v-if="row.phone">{{ displayContact(row, 'phone') }}</span><span v-if="row.wechat" class="text-sub">微: {{ displayContact(row, 'wechat') }}</span><span v-if="!row.phone && !row.wechat" class="muted-text">-</span></div></template></el-table-column>
      <el-table-column prop="degree" label="学历" width="85" align="center" />
      <el-table-column prop="major" label="毕业专业" min-width="110" show-overflow-tooltip />
      <el-table-column prop="titleLevel" label="现有职称" width="90" align="center" />
      <el-table-column prop="ssCity" label="社保城市" width="95" align="center" />
      <el-table-column prop="reviewMajor" label="申报专业" min-width="120" show-overflow-tooltip />
      <el-table-column prop="applyLevel" label="申报级别" width="90" align="center"><template #default="{ row }"><el-tag v-if="row.applyLevel" size="small">{{ row.applyLevel }}</el-tag><span v-else>-</span></template></el-table-column>
      <el-table-column prop="remarks" label="备注" min-width="130" show-overflow-tooltip />
      <el-table-column prop="assignedTo" label="来源店铺" width="95" align="center"><template #default="{ row }"><el-tag effect="light" size="small">{{ row.assignedTo || '未分' }}</el-tag></template></el-table-column>
      <el-table-column prop="createdBy" label="录入人姓名" width="100" align="center"><template #default="{ row }"><strong class="user-name-title">{{ row.createdBy || '未知' }}</strong></template></el-table-column>
      <el-table-column label="操作" width="150" align="center" fixed="right"><template #default="{ row }"><RecordLogsPopover record-type="customer" :record-id="row.id" /><el-button v-if="hasPerm('edit')" type="primary" link size="small" @click="openEdit(row)">编辑</el-button><el-button v-if="hasPerm('delete')" type="danger" link size="small" @click="remove(row)">删除</el-button></template></el-table-column>
    </el-table>

    <div class="pager-row" :class="{ 'm-pager-row': isMobile }"><el-pagination v-model:current-page="page" v-model:page-size="pageSize" :layout="isMobile ? 'prev, pager, next' : 'total, sizes, prev, pager, next'" :page-sizes="[15, 30, 50, 100]" :total="total" :size="isMobile ? 'small' : 'default'" background @current-change="load" @size-change="load" /></div>

    <el-dialog v-model="editVisible" title="编辑职称客户" :width="isMobile ? '94%' : '560px'">
      <el-form v-if="editRow" label-position="top"><el-row :gutter="12"><el-col v-for="field in editFields" :key="field.key" :xs="24" :sm="12" :class="{ 'edit-wide-field': field.key === 'remarks' }"><el-form-item :label="field.label"><ConfigSelect v-if="field.config" v-model="editRow[field.key]" :options="configs[field.config]" :label="field.label" @add="value => addConfig(field.config, value)" /><el-input v-else v-model="editRow[field.key]" :type="field.type || 'text'" :rows="field.type === 'textarea' ? 2 : undefined" /></el-form-item></el-col></el-row></el-form>
      <template #footer><el-button @click="editVisible = false">取消</el-button><el-button type="primary" :loading="saving" @click="saveEdit">保存</el-button></template>
    </el-dialog>
  </section>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Refresh, Search } from '@element-plus/icons-vue'
import { customerApi } from '../../services/api'
import { copyText } from '../../utils/clipboard'
import { isExpired, maskPhone, maskWechat } from '../../utils/customerExtract'
import { useResponsive } from '../../composables/useResponsive'
import ConfigSelect from '../../components/ConfigSelect.vue'
import DataTransfer from '../../components/DataTransfer.vue'
import UnifiedDateFilter from '../../components/UnifiedDateFilter.vue'
import RecordLogsPopover from '../../components/RecordLogsPopover.vue'

const props = defineProps({ user: Object, hasPerm: Function, reloadSignal: Number })
const { isMobile } = useResponsive()
const loading = ref(false)
const saving = ref(false)
const rows = ref([])
const selected = ref([])
const stores = ref([])
const configs = ref({ degree: [], major: [], applyLevel: [], store: [] })
const total = ref(0)
const dealtCount = ref(0)
const page = ref(1)
const pageSize = ref(15)
const keyword = ref('')
const storeFilter = ref('')
const dateFilter = ref('all')
const customDateRange = ref([])
const editVisible = ref(false)
const editRow = ref(null)
const editFields = [
  { key: 'phone', label: '联系电话' }, { key: 'wechat', label: '微信号' },
  { key: 'degree', label: '学历', config: 'degree' }, { key: 'major', label: '毕业专业', config: 'major' },
  { key: 'titleLevel', label: '现有职称' }, { key: 'ssCity', label: '社保城市' },
  { key: 'reviewMajor', label: '申报专业', config: 'major' }, { key: 'applyLevel', label: '申报级别', config: 'applyLevel' },
  { key: 'assignedTo', label: '分配店铺', config: 'store' }, { key: 'remarks', label: '备注', type: 'textarea' }
]
let searchTimer = null

function hasPerm(name) { return props.hasPerm ? props.hasPerm(name) : false }
function displayContact(row, field) {
  const value = row[field] || ''
  if (!value || props.user?.isAdmin || !isExpired(row) || hasPerm('viewMasked')) return value
  return field === 'phone' ? maskPhone(value) : maskWechat(value)
}
function exportUrl(range = {}) {
  return customerApi.exportUrl({ keyword: keyword.value.trim(), dateFilter: dateFilter.value, store: storeFilter.value, ...range })
}
function onDateRangeChange(value) {
  dateFilter.value = value?.type || 'all'
  customDateRange.value = value?.startDate && value?.endDate ? [value.startDate, value.endDate] : []
  load()
}
async function load() {
  loading.value = true
  try {
    const params = { page: page.value, pageSize: pageSize.value, keyword: keyword.value.trim(), dateFilter: dateFilter.value, store: storeFilter.value }
    if (dateFilter.value === 'custom' && customDateRange.value.length === 2) { params.startDate = customDateRange.value[0]; params.endDate = customDateRange.value[1] }
    const data = await customerApi.list(params)
    rows.value = data.customers || []
    total.value = data.total || 0
    dealtCount.value = data.dealtCount || 0
    if (data.page) page.value = data.page
    selected.value = []
  } catch (error) { ElMessage.error(error.message || '加载列表失败') }
  finally { loading.value = false }
}
async function loadConfigs() {
  try {
    const [configData, storeData] = await Promise.all([customerApi.configs(), customerApi.stores()])
    configs.value = { degree: configData.degree || [], major: configData.major || [], applyLevel: configData.applyLevel || [], store: configData.store || [] }
    stores.value = storeData.stores || configData.store || []
  } catch (error) { ElMessage.error(error.message || '加载职称配置失败') }
}
async function addConfig(type, value) {
  try { const data = await customerApi.addConfig(type, value); configs.value[type] = data.values || configs.value[type]; if (type === 'store') stores.value = data.values || stores.value } catch (error) { ElMessage.error(error.message || '新增配置失败') }
}
async function copyContact(value, label) { try { await copyText(value); ElMessage.success(`已复制${label}`) } catch (error) { ElMessage.error(error.message || '复制失败') } }
function openEdit(row) { editRow.value = { ...row }; editVisible.value = true }
async function saveEdit() {
  if (!editRow.value) return
  saving.value = true
  try { await customerApi.update(editRow.value.id, editRow.value); ElMessage.success('保存成功'); editVisible.value = false; await load() } catch (error) { ElMessage.error(error.message || '保存失败') } finally { saving.value = false }
}
async function remove(row) {
  try { await ElMessageBox.confirm(`确定删除这条职称客户记录（${row.phone || row.wechat || row.id}）？`, '提示', { type: 'warning' }); await customerApi.remove(row.id); ElMessage.success('已删除'); await load() } catch (error) { if (error !== 'cancel' && error !== 'close') ElMessage.error(error.message || '删除失败') }
}
async function batchRemove() {
  try { await ElMessageBox.confirm(`确定批量删除选中的 ${selected.value.length} 条记录？`, '批量删除', { type: 'warning' }); await customerApi.batchRemove(selected.value.map(row => row.id)); ElMessage.success('批量删除成功'); await load() } catch (error) { if (error !== 'cancel' && error !== 'close') ElMessage.error(error.message || '删除失败') }
}
watch(keyword, () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { page.value = 1; load() }, 300) })
watch(storeFilter, () => { page.value = 1; load() })
watch(() => props.reloadSignal, () => { page.value = 1; load() })
onMounted(() => { load(); loadConfigs() })
</script>
