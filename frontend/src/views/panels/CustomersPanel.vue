<template>
  <section class="stack-page customers-panel">
    <div class="toolbar">
      <div class="title-block">
        <h2>客户登记表</h2>
        <p>{{ keyword ? '找到' : '共' }} {{ total }} 条，已成交 {{ dealtCount }} 条</p>
      </div>
      <div class="toolbar-actions">
        <el-input v-model="keyword" size="small" clearable :prefix-icon="Search" inputmode="search" placeholder="搜索姓名/电话/微信" />
        <el-date-picker
          v-model="customDateRange"
          size="small"
          class="date-range-filter"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
          @change="onDateRangeChange"
        />
        <el-select v-if="user?.isAdmin" v-model="employeeFilter" size="small" clearable placeholder="全部员工">
          <el-option v-for="employee in employees" :key="employee" :label="employee" :value="employee" />
        </el-select>
        <el-select v-model="storeFilter" size="small" clearable placeholder="全部店铺">
          <el-option v-for="store in configs.store" :key="store" :label="store" :value="store" />
        </el-select>
      </div>
      <div v-if="!isMobile && searchHistory.length && !keyword" class="search-history">
        <span v-for="h in searchHistory" :key="h" class="search-history-tag" @click="useHistoryTag(h)">{{ h }}</span>
      </div>
    </div>

    <div v-if="!isMobile" class="action-row">
      <el-button :icon="Plus" :disabled="!hasPerm('addRow')" @click="addEmpty">手动添加行</el-button>
      <el-divider direction="vertical" class="action-divider" />
      <el-button :icon="DocumentCopy" :disabled="!hasPerm('copyData')" @click="copyTSV">复制表格</el-button>
      <el-button :icon="DocumentCopy" :disabled="!hasPerm('copyData')" @click="copyPlainText">复制文本</el-button>
      <el-button :icon="Download" :disabled="!hasPerm('exportExcel')" @click="openExportDialog">导出 Excel</el-button>
      <el-divider direction="vertical" class="action-divider" />
      <el-button type="danger" :icon="Delete" :disabled="!hasPerm('clearTable')" @click="clearAll">清空</el-button>
    </div>

    <div v-else class="mobile-table-tools">
      <span class="mobile-result-count">{{ keyword ? '找到' : '共' }} {{ total }} 条</span>
      <el-dropdown trigger="click" @command="runMobileAction">
        <el-button :icon="MoreFilled" circle aria-label="更多操作" title="更多操作" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="add" :disabled="!hasPerm('addRow')">手动添加行</el-dropdown-item>
            <el-dropdown-item command="copy-table" :disabled="!hasPerm('copyData')">复制表格</el-dropdown-item>
            <el-dropdown-item command="copy-text" :disabled="!hasPerm('copyData')">复制文本</el-dropdown-item>
            <el-dropdown-item command="export-csv" :disabled="!hasPerm('exportExcel')">导出 Excel</el-dropdown-item>
            <el-dropdown-item command="clear" divided :disabled="!hasPerm('clearTable')">清空客户登记表</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <el-table v-if="!isMobile" :data="displayRows" stripe border class="data-table" @selection-change="selected = $event">
      <el-table-column type="selection" width="44" :selectable="row => !row._draft" />
      <el-table-column prop="seq" label="序号" width="70" />
      <el-table-column prop="date" label="日期" min-width="150">
        <template #default="{ row }">
          <el-input v-if="isRowEditing(row)" v-model="editDraft.date" size="small" />
          <span v-else>{{ row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" min-width="110">
        <template #default="{ row }">
          <el-input v-if="isRowEditing(row)" v-model="editDraft.name" size="small" />
          <span v-else>{{ row.name || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话" min-width="130">
        <template #default="{ row }">
          <el-input v-if="isRowEditing(row)" v-model="editDraft.phone" size="small" />
          <span v-else>{{ secureValue(row.phone, row, 'phone') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信" min-width="130">
        <template #default="{ row }">
          <el-input v-if="isRowEditing(row)" v-model="editDraft.wechat" size="small" />
          <span v-else>{{ secureValue(row.wechat, row, 'wechat') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="degree" label="学历" min-width="100">
        <template #default="{ row }">
          <ConfigSelect v-if="isRowEditing(row)" v-model="editDraft.degree" :options="configs.degree" label="学历" @add="value => addConfig('degree', value)" />
          <span v-else>{{ row.degree || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="major" label="专业" min-width="120">
        <template #default="{ row }">
          <ConfigSelect v-if="isRowEditing(row)" v-model="editDraft.major" :options="configs.major" label="专业" @add="value => addConfig('major', value)" />
          <span v-else>{{ row.major || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="reviewMajor" label="申报专业" min-width="120">
        <template #default="{ row }">
          <ConfigSelect v-if="isRowEditing(row)" v-model="editDraft.reviewMajor" :options="configs.major" label="专业" @add="value => addConfig('major', value)" />
          <span v-else>{{ row.reviewMajor || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="applyLevel" label="申报级别" min-width="100">
        <template #default="{ row }">
          <ConfigSelect v-if="isRowEditing(row)" v-model="editDraft.applyLevel" :options="configs.applyLevel" label="申报级别" @add="value => addConfig('applyLevel', value)" />
          <span v-else>{{ row.applyLevel || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="assignedTo" label="分配" min-width="110">
        <template #default="{ row }">
          <ConfigSelect v-if="isRowEditing(row)" v-model="editDraft.assignedTo" :options="configs.store" label="店铺" @add="value => addConfig('store', value)" />
          <span v-else>{{ row.assignedTo || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="成交" width="120">
        <template #default="{ row }">
          <div class="deal-switch-cell">
            <el-switch
              :model-value="row.dealStatus === '已成交'"
              :disabled="!hasPerm('edit')"
              @change="v => toggleDeal(row, v)"
            />
            <span :class="{ done: row.dealStatus === '已成交' }">{{ row.dealStatus === '已成交' ? '已成交' : '未成交' }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="remarks" label="备注" min-width="180" show-overflow-tooltip>
        <template #default="{ row }">
          <el-input v-if="isRowEditing(row)" v-model="editDraft.remarks" size="small" />
          <span v-else>{{ row.remarks || '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="156" fixed="right" class-name="operation-column">
        <template #default="{ row }">
          <div class="table-operation-actions">
            <template v-if="isRowEditing(row)">
              <a href="#" class="table-action-link primary" @click.prevent="confirmRowEdit(row)">确定</a>
              <a href="#" class="table-action-link" @click.prevent="cancelRowEdit">取消</a>
            </template>
            <template v-else>
              <a href="#" class="table-action-link" :class="{ disabled: !hasPerm('edit') }" @click.prevent="hasPerm('edit') && startRowEdit(row)">编辑</a>
              <a href="#" class="table-action-link" :class="{ disabled: row._draft || !hasPerm('copyData') }" @click.prevent="!row._draft && hasPerm('copyData') && copyCustomerInfo(row)">复制信息</a>
              <a href="#" class="table-action-link danger" :class="{ disabled: !hasPerm('delete') }" @click.prevent="hasPerm('delete') && remove(row)">删除</a>
            </template>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-else class="mobile-list">
      <article v-for="row in displayRows" :key="row.id" class="customer-card customer-mobile-card" :class="{ expanded: expandedCustomerId === row.id }">
        <button class="customer-mobile-summary" @click="toggleCustomerDetails(row.id)">
          <span class="customer-summary-date">{{ shortDate(row.date) }}</span>
          <span class="customer-summary-phone">{{ secureValue(row.phone, row, 'phone') || '-' }}</span>
          <span class="customer-summary-info">{{ mobileSummary(row) }}</span>
          <strong class="customer-summary-store">{{ row.assignedTo || '未分配' }}</strong>
          <el-icon class="customer-summary-arrow"><CaretBottom v-if="expandedCustomerId === row.id" /><CaretRight v-else /></el-icon>
        </button>
        <div v-if="expandedCustomerId === row.id" class="customer-mobile-details">
          <div class="customer-detail-grid">
            <div><span>姓名</span><strong>{{ row.name || '-' }}</strong></div>
            <button class="customer-detail-deal" :class="{ done: row.dealStatus === '已成交' }" :disabled="!hasPerm('edit')" @click="toggleDeal(row, row.dealStatus !== '已成交')">
              <span>成交状态</span>
              <el-tag :type="row.dealStatus === '已成交' ? 'success' : 'info'" size="small">{{ row.dealStatus || '未成交' }}</el-tag>
            </button>
            <div><span>电话</span><strong>{{ secureValue(row.phone, row, 'phone') || '-' }}</strong></div>
            <div><span>微信</span><strong>{{ secureValue(row.wechat, row, 'wechat') || '-' }}</strong></div>
            <div><span>学历</span><strong>{{ row.degree || '-' }}</strong></div>
            <div><span>专业</span><strong>{{ row.major || '-' }}</strong></div>
            <div><span>申报专业</span><strong>{{ row.reviewMajor || '-' }}</strong></div>
            <div><span>申报级别</span><strong>{{ row.applyLevel || '-' }}</strong></div>
            <div><span>录入员工</span><strong>{{ row.createdBy || '-' }}</strong></div>
            <div><span>录入时间</span><strong>{{ row.date || '-' }}</strong></div>
            <div class="customer-detail-wide"><span>备注</span><strong>{{ row.remarks || '-' }}</strong></div>
          </div>
          <div class="mobile-card-actions">
            <a href="#" class="mobile-action-link" :class="{ disabled: !hasPerm('edit') }" @click.prevent="hasPerm('edit') && openEdit(row)">编辑</a>
            <a href="#" class="mobile-action-link" :class="{ disabled: row._draft || !hasPerm('copyData') }" @click.prevent="!row._draft && hasPerm('copyData') && copyCustomerInfo(row)">复制</a>
            <a href="#" class="mobile-action-link danger" :class="{ disabled: !hasPerm('delete') }" @click.prevent="hasPerm('delete') && remove(row)">删除</a>
          </div>
        </div>
      </article>
      <div v-if="hasMoreMobile || mobileLoading" class="mobile-load-more">
        <el-icon v-if="mobileLoading" class="is-loading"><Loading /></el-icon>
        <span>{{ mobileLoading ? '正在加载更多客户' : '继续下拉加载更多' }}</span>
      </div>
      <div v-else-if="rows.length" class="mobile-load-more muted-text">已加载全部客户</div>
    </div>

    <div class="batch-row" v-if="selected.length">
      <span>已选 {{ selected.length }} 条</span>
      <el-button type="danger" :disabled="!hasPerm('delete')" @click="batchRemove">批量删除</el-button>
      <el-button :disabled="!hasPerm('edit')" @click="batchAssign">批量分配</el-button>
    </div>

    <el-pagination
      v-if="!isMobile"
      v-model:current-page="page"
      layout="total, sizes, prev, pager, next"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      background
      class="pager"
    />

    <el-tooltip v-if="isMobile" content="手动添加客户" placement="right">
      <button class="mobile-add-fab" :disabled="!hasPerm('addRow')" @click="addEmpty">
        <el-icon><Plus /></el-icon>
      </button>
    </el-tooltip>

    <el-dialog
      v-model="editVisible"
      :title="mobileEdit?._draft ? '新增客户' : '编辑客户'"
      class="mobile-customer-dialog"
      width="94%"
      top="5vh"
      :close-on-click-modal="false"
      :before-close="closeMobileEdit"
    >
      <el-form v-if="mobileEdit" class="mobile-customer-form" label-position="top" size="large">
        <el-form-item v-for="f in editableFields" :key="f.key" :label="f.label" :class="{ 'form-item-wide': f.type === 'textarea' }">
          <ConfigSelect v-if="configField(f.key)" v-model="mobileEdit[f.key]" :options="configs[configField(f.key).type]" :label="configField(f.key).label" @add="value => addConfig(configField(f.key).type, value)" />
          <el-input v-else v-model="mobileEdit[f.key]" :type="f.type || 'text'" :rows="f.type === 'textarea' ? 3 : undefined" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="mobile-dialog-actions">
          <el-button size="large" @click="cancelMobileEdit">取消</el-button>
          <el-button size="large" type="primary" @click="saveEdit">保存客户</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="exportVisible" title="导出 Excel" width="420px" class="export-dialog">
      <div class="export-dialog-content">
        <p>选择要导出的客户登记日期范围，留空则导出当前查询条件下的全部数据。</p>
        <el-date-picker
          v-model="exportDateRange"
          type="daterange"
          value-format="YYYY-MM-DD"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          clearable
          style="width: 100%"
        />
      </div>
      <template #footer>
        <el-button @click="exportVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmExport">导出</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { CaretBottom, CaretRight, Delete, DocumentCopy, Download, Loading, MoreFilled, Plus, Search } from '@element-plus/icons-vue'
import { customerApi } from '../../services/api'
import { exportFields, exportHeaders } from '../../constants'
import { copyText } from '../../utils/clipboard'
import { isExpired, maskPhone, maskWechat } from '../../utils/customerExtract'
import { useResponsive } from '../../composables/useResponsive'
import ConfigSelect from '../../components/ConfigSelect.vue'

const props = defineProps({ user: Object, hasPerm: Function, reloadSignal: Number })
const { isMobile } = useResponsive()
const rows = ref([])
const keyword = ref('')
const dateFilter = ref('all')
const customDateRange = ref([])

function onDateRangeChange(value) {
  dateFilter.value = value?.length === 2 ? 'custom' : 'all'
  load()
}
const employeeFilter = ref('')
const storeFilter = ref('')
const page = ref(1)
const pageSize = ref(20)
const pageSizes = [10, 20, 50, 100]
const total = ref(0)
const dealtCount = ref(0)
const mobileLoading = ref(false)
const expandedCustomerId = ref(null)
const searchHistory = ref([])

const selected = ref([])
const editVisible = ref(false)
const exportVisible = ref(false)
const exportDateRange = ref([])
const mobileEdit = ref(null)
const editingRowId = ref(null)
const editDraft = ref({})
const draftRow = ref(null)
const configs = ref({ degree: [], major: [], applyLevel: [], store: [] })
const employees = ref([])

const editableFields = [
  { key: 'name', label: '姓名' }, { key: 'phone', label: '电话' }, { key: 'wechat', label: '微信' },
  { key: 'date', label: '日期' }, { key: 'degree', label: '学历' }, { key: 'major', label: '专业' },
  { key: 'titleLevel', label: '现有职称' }, { key: 'ssCity', label: '社保城市' }, { key: 'reviewMajor', label: '申报专业' },
  { key: 'applyLevel', label: '申报级别' }, { key: 'assignedTo', label: '分配店铺' }, { key: 'conclusion', label: '结论', type: 'textarea' },
  { key: 'dealStatus', label: '成交状态' }, { key: 'remarks', label: '备注', type: 'textarea' }
]
const rowEditFields = ['date','name','phone','wechat','degree','major','reviewMajor','applyLevel','assignedTo','remarks']

function hasPerm(perm) { return props.hasPerm ? props.hasPerm(perm) : false }

async function load(options = {}) {
  const append = Boolean(options.append)
  const targetPage = options.page || page.value
  if (isMobile.value) mobileLoading.value = true
  try {
    const params = { page: targetPage, pageSize: pageSize.value, keyword: keyword.value.trim(), dateFilter: dateFilter.value, employee: employeeFilter.value, store: storeFilter.value }
    if (dateFilter.value === 'custom' && customDateRange.value?.length === 2) {
      params.startDate = customDateRange.value[0]
      params.endDate = customDateRange.value[1]
    }
    const data = await customerApi.list(params)
    const customers = data.customers || []
    rows.value = append ? [...rows.value, ...customers] : customers
    total.value = data.total || 0
    dealtCount.value = data.dealtCount || 0
    if (data.page && data.page !== page.value) page.value = data.page
    if (!append) selected.value = []
    return rows.value
  } catch (err) {
    ElMessage.error(err.message || '加载客户失败')
    return []
  } finally {
    mobileLoading.value = false
  }
}

async function loadConfigs() {
  try {
    const data = await customerApi.configs()
    configs.value = {
      degree: data.degree || [],
      major: data.major || [],
      applyLevel: data.applyLevel || [],
      store: data.store || []
    }
  } catch (err) {
    ElMessage.error(err.message || '加载客户配置失败')
  }
}

async function loadEmployees() {
  if (!props.user?.isAdmin) return
  try {
    const data = await customerApi.creators()
    employees.value = Object.keys(data.creators || {}).sort()
  } catch (err) {
    ElMessage.error(err.message || '加载员工筛选失败')
  }
}

function configField(key) {
  const map = {
    degree: { type: 'degree', label: '学历' },
    major: { type: 'major', label: '专业' },
    reviewMajor: { type: 'major', label: '专业' },
    applyLevel: { type: 'applyLevel', label: '申报级别' },
    assignedTo: { type: 'store', label: '店铺' }
  }
  return map[key] || null
}

async function addConfig(type, value) {
  try {
    const data = await customerApi.addConfig(type, value)
    configs.value[type] = data.values || configs.value[type]
    ElMessage.success('配置已新增')
  } catch (err) {
    ElMessage.error(err.message || '新增配置失败')
  }
}

const displayRows = computed(() => draftRow.value && (isMobile.value || page.value === 1) ? [draftRow.value, ...rows.value] : rows.value)
const hasMoreMobile = computed(() => isMobile.value && rows.value.length < total.value)

function shortDate(value) {
  const match = String(value || '').match(/(\d{4})-(\d{2})-(\d{2})/)
  return match ? `${match[2]}-${match[3]}` : String(value || '-').slice(0, 5)
}

function mobileSummary(row) {
  return [row.applyLevel, row.reviewMajor || row.major].filter(Boolean).join(' · ') || '-'
}

function toggleCustomerDetails(id) {
  expandedCustomerId.value = expandedCustomerId.value === id ? null : id
}

function secureValue(value, row, field) {
  if (!value || props.user?.isAdmin || !isExpired(row) || hasPerm('viewMasked')) return value || ''
  return field === 'phone' ? maskPhone(value) : maskWechat(value)
}

async function update(row, field, value) {
  row[field] = String(value || '').trim()
  await customerApi.update(row.id, { [field]: row[field] }).catch(err => ElMessage.error(err.message || '保存失败'))
}

async function toggleDeal(row, checked) {
  const oldValue = row.dealStatus || ''
  const nextValue = checked ? '已成交' : ''
  row.dealStatus = nextValue
  if (row._draft) return
  try {
    await customerApi.update(row.id, { dealStatus: nextValue })
    ElMessage.success(nextValue || '已标记未成交')
  } catch (err) {
    row.dealStatus = oldValue
    ElMessage.error(err.message || '保存失败')
  }
}

function isRowEditing(row) {
  return editingRowId.value === row.id
}

function startRowEdit(row) {
  editingRowId.value = row.id
  editDraft.value = {}
  rowEditFields.forEach(field => { editDraft.value[field] = row[field] || '' })
}

function cancelRowEdit() {
  if (draftRow.value && editingRowId.value === draftRow.value.id) draftRow.value = null
  editingRowId.value = null
  editDraft.value = {}
}

async function confirmRowEdit(row) {
  const payload = {}
  rowEditFields.forEach(field => { payload[field] = String(editDraft.value[field] || '').trim() })
  if (row._draft) {
    payload.dealStatus = row.dealStatus || ''
    await customerApi.create({ ...payload, _manualAdd: true })
    draftRow.value = null
    editingRowId.value = null
    editDraft.value = {}
    await load()
    ElMessage.success('客户已新增')
    return
  }
  await customerApi.update(row.id, payload)
  Object.assign(row, payload)
  editingRowId.value = null
  editDraft.value = {}
  ElMessage.success('已保存')
}

async function addEmpty() {
  if (draftRow.value) return ElMessage.warning('请先保存或取消当前新增行')
  const d = new Date()
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
  keyword.value = ''
  dateFilter.value = 'all'
  customDateRange.value = []
  employeeFilter.value = ''
  storeFilter.value = ''
  page.value = 1
  await load({ page: 1 })
  draftRow.value = { id: `draft-${Date.now()}`, seq: '新增', date, name: '', phone: '', wechat: '', degree: '', major: '', reviewMajor: '', applyLevel: '', assignedTo: '', remarks: '', dealStatus: '', _draft: true }
  startRowEdit(draftRow.value)
  if (isMobile.value) openEdit(draftRow.value)
}

async function remove(row) {
  await ElMessageBox.confirm(`确定删除 ${row.name || row.id}？`, '删除客户', { type: 'warning' })
  await customerApi.remove(row.id)
  ElMessage.success('已删除')
  await load()
}

async function batchRemove() {
  await ElMessageBox.confirm(`确定删除选中的 ${selected.value.length} 条记录？`, '批量删除', { type: 'warning' })
  const data = await customerApi.batchRemove(selected.value.map(r => r.id))
  ElMessage.success(`已删除 ${data.deleted || 0} 条`)
  selected.value = []
  load()
}

async function batchAssign() {
  const { value } = await ElMessageBox.prompt('输入分配的销售姓名，留空则清除', '批量分配')
  await customerApi.batchAssign(selected.value.map(r => r.id), value || '')
  ElMessage.success('已分配')
  selected.value = []
  load()
}

async function clearAll() {
  await ElMessageBox.confirm('确定清空整个客户登记表？此操作不可恢复。', '清空登记表', { type: 'error' })
  const data = await customerApi.clear()
  ElMessage.success(`已清空 ${data.deleted || 0} 条`)
  load()
}

function rowText(row) {
  return exportFields.map(f => secureValue(row[f], row, f)).join('\t')
}

async function copyTSV() {
  const allRows = await loadAllForActions()
  try {
    await copyText([exportHeaders.join('\t'), ...allRows.map(rowText)].join('\n'))
    ElMessage.success('已复制表格')
  } catch (err) {
    ElMessage.error(err.message || '复制失败')
  }
}

function plainText(row) {
  return [
    `姓名：${row.name || ''}`,
    `电话：${secureValue(row.phone, row, 'phone')}`,
    `微信：${secureValue(row.wechat, row, 'wechat')}`,
    `学历：${row.degree || ''}`,
    `专业：${row.major || ''}`,
    `申报专业：${row.reviewMajor || ''}`,
    `申报级别：${row.applyLevel || ''}`,
    `分配店铺：${row.assignedTo || ''}`,
    `结论：${row.conclusion || ''}`,
    `备注：${row.remarks || ''}`
  ].join('\n')
}

async function copyCustomerInfo(row) {
  try {
    await copyText(plainText(row))
    ElMessage.success('客户信息已复制')
  } catch (err) {
    ElMessage.error(err.message || '复制失败')
  }
}

async function copyPlainText() {
  const allRows = await loadAllForActions()
  try {
    await copyText(allRows.map(plainText).join('\n\n'))
    ElMessage.success('已复制文本')
  } catch (err) {
    ElMessage.error(err.message || '复制失败')
  }
}

function csvEscape(value) {
  const text = String(value || '')
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function openExportDialog() {
  exportDateRange.value = customDateRange.value?.length === 2 ? [...customDateRange.value] : []
  exportVisible.value = true
}

async function confirmExport() {
  const allRows = await loadAllForActions(exportDateRange.value)
  const lines = [exportHeaders.join(',')]
  allRows.forEach(row => {
    lines.push(exportFields.map(f => csvEscape(secureValue(row[f], row, f))).join(','))
  })
  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `customers_${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
  exportVisible.value = false
  ElMessage.success(`已导出 ${allRows.length} 条客户记录`)
}

function runMobileAction(command) {
  const actions = {
    add: addEmpty,
    'copy-table': copyTSV,
    'copy-text': copyPlainText,
    'export-csv': openExportDialog,
    clear: clearAll
  }
  actions[command]?.()
}

function openEdit(row) {
  if (!isMobile.value) {
    startRowEdit(row)
    return
  }
  mobileEdit.value = { ...row }
  editVisible.value = true
}

function clearMobileEdit() {
  if (mobileEdit.value?._draft) {
    draftRow.value = null
    editingRowId.value = null
    editDraft.value = {}
  }
  mobileEdit.value = null
}

function closeMobileEdit(done) {
  clearMobileEdit()
  done()
}

function cancelMobileEdit() {
  editVisible.value = false
  clearMobileEdit()
}

async function saveEdit() {
  const id = mobileEdit.value.id
  const isDraft = Boolean(mobileEdit.value._draft)
  const payload = {}
  editableFields.forEach(f => { payload[f.key] = mobileEdit.value[f.key] || '' })
  if (isDraft) {
    await customerApi.create({ ...payload, _manualAdd: true })
    draftRow.value = null
    editingRowId.value = null
  } else {
    await customerApi.update(id, payload)
  }
  editVisible.value = false
  mobileEdit.value = null
  ElMessage.success(isDraft ? '客户已新增' : '已保存')
  await load()
}

async function loadAllForActions(range = customDateRange.value) {
  const hasRange = Array.isArray(range) && range.length === 2
  const params = { keyword: keyword.value.trim(), dateFilter: hasRange ? 'custom' : 'all', employee: employeeFilter.value, store: storeFilter.value, all: true }
  if (hasRange) {
    params.startDate = range[0]
    params.endDate = range[1]
  }
  const data = await customerApi.list(params)
  return data.customers || []
}

function handleMobileScroll() {
  if (!isMobile.value || mobileLoading.value || !hasMoreMobile.value) return
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 180
  if (nearBottom) load({ page: page.value + 1, append: true })
}

watch(() => props.reloadSignal, () => {
  draftRow.value = null
  page.value = 1
  load({ page: 1 })
})
let _searchTimer = null
function saveFilters() {
  try {
    sessionStorage.setItem('customers_filters', JSON.stringify({
      keyword: keyword.value, dateFilter: dateFilter.value,
      employeeFilter: employeeFilter.value, storeFilter: storeFilter.value,
      customDateRange: customDateRange.value
    }))
  } catch (e) {}
}
function restoreFilters() {
  try {
    const saved = sessionStorage.getItem('customers_filters')
    if (saved) {
      const f = JSON.parse(saved)
      keyword.value = f.keyword || ''
      dateFilter.value = f.dateFilter || 'all'
    if (f.customDateRange) customDateRange.value = f.customDateRange
      employeeFilter.value = f.employeeFilter || ''
      storeFilter.value = f.storeFilter || ''
    }
  } catch (e) {}
}

function loadSearchHistory() {
  try {
    const h = localStorage.getItem('customers_search_history')
    searchHistory.value = h ? JSON.parse(h) : []
  } catch (e) { searchHistory.value = [] }
}

function saveSearchHistory(term) {
  term = term.trim()
  if (!term) return
  searchHistory.value = [term, ...searchHistory.value.filter(t => t !== term)].slice(0, 5)
  try { localStorage.setItem('customers_search_history', JSON.stringify(searchHistory.value)) } catch (e) {}
}

function useHistoryTag(tag) {
  keyword.value = tag
}




watch([keyword, dateFilter, employeeFilter, storeFilter, customDateRange], () => {
  page.value = 1
  clearTimeout(_searchTimer)
  _searchTimer = setTimeout(() => load({ page: 1 }), 300)
  saveFilters()
  if (keyword.value.trim()) saveSearchHistory(keyword.value)
})
watch(pageSize, () => {
  page.value = 1
  load({ page: 1 })
})
watch(page, () => {
  if (!isMobile.value) load()
})
watch(isMobile, () => {
  page.value = 1
  load({ page: 1 })
})
onMounted(() => {
  restoreFilters()
  loadSearchHistory()
  load()
  loadConfigs()
  loadEmployees()
  window.addEventListener('scroll', handleMobileScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', handleMobileScroll))
</script>
