<template>
  <section class="customers-page finance-page">
    <div class="panel-header">
      <div class="panel-title-group">
        <h2>{{ props.title }}</h2>
        <span class="customer-count">共 {{ total }} 条记录 · 提成总计：<strong class="commission-sum">￥{{ totalCommission }}</strong></span>
      </div>
      <div class="panel-actions">
        <DataTransfer
          scope-label="财税客户"
          :can-export="hasPerm('financeExportExcel') || hasPerm('exportExcel') || hasPerm('financeView')"
          :can-import="canRegister"
          :show-export-dialog="true"
          :allow-empty-export-range="true"
          :export-url="exportUrl"
          :import-request="financeApi.importRows"
          fallback-filename="finance-customers.csv"
          :key-headers="['订单编号', '电话', '微信']"
          import-fields-hint="支持列：订单编号、业务类型、电话、微信、所在城市、分配店铺、成交状态、备注"
          @imported="load"
        />
        <el-button v-if="canRegister" type="primary" @click="openCreate">登记客户</el-button>
        <el-button @click="load">刷新</el-button>
        <el-button v-if="selected.length && canDelete" type="danger" @click="batchRemove">批量删除({{ selected.length }})</el-button>
      </div>
    </div>

    <div class="filter-row-unified">
      <el-input v-model="filters.keyword" clearable placeholder="搜索单号、电话、微信" @keyup.enter="search" />
      <el-select v-model="filters.hasOrder" clearable placeholder="订单号状态" @change="search">
        <el-option label="有订单号" value="yes" />
        <el-option label="无订单号" value="no" />
      </el-select>
      <el-select v-model="filters.serviceType" clearable placeholder="业务类型" @change="search">
        <el-option v-for="item in serviceTypes" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button type="primary" @click="search">查询</el-button>
    </div>

    <el-card v-if="!isMobile" shadow="never" class="tool-panel">
      <el-table size="small" v-loading="loading" :data="rows" stripe class="data-table compact-table" @selection-change="selected = $event">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="seq" label="序号" width="70" />
        <el-table-column prop="date" label="登记时间" width="160" />
        <el-table-column label="订单编号" min-width="150"><template #default="{ row }"><el-input v-if="canEdit" v-model="row.orderNo" size="small" placeholder="填入后按5元提成" clearable @change="updateOrderNo(row)" /><span v-else>{{ row.orderNo || '无订单号' }}</span></template></el-table-column>
        <el-table-column label="提成" width="80">
          <template #default="{ row }">￥{{ row.orderNo ? 5 : 2 }}</template>
        </el-table-column>
        <el-table-column prop="serviceType" label="业务类型" min-width="110" />
        <el-table-column label="联系方式" min-width="160">
          <template #default="{ row }">{{ [row.phone, row.wechat && `微：${row.wechat}`].filter(Boolean).join(' / ') || '-' }}</template>
        </el-table-column>
        <el-table-column prop="city" label="城市" width="100" />
        <el-table-column prop="assignedTo" label="店铺" width="120" />
        <el-table-column label="操作" width="205" fixed="right">
          <template #default="{ row }">
            <RecordLogsPopover record-type="finance" :record-id="row.id" />
            <el-button v-if="canEdit" link type="primary" @click="openEdit(row)">编辑</el-button>
            <el-button v-if="canDelete" link type="danger" @click="remove(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div v-else class="mobile-list app-m-card-flow">
      <article v-for="row in rows" :key="row.id" class="finance-mobile-card">
        <div class="fmc-head">
          <div>
            <strong class="fmc-title">{{ row.serviceType || '财税客户' }}</strong>
            <div class="fmc-date">{{ row.date || '-' }}</div>
          </div>
          <el-tag :type="row.orderNo ? 'success' : 'warning'" size="small">提成 ￥{{ row.orderNo ? 5 : 2 }}</el-tag>
        </div>
        <div class="fmc-body">
          <p>订单编号：<span class="order-tag">{{ row.orderNo || '无订单号' }}</span></p>
          <p>联系方式：{{ [row.phone, row.wechat && ('微：' + row.wechat)].filter(Boolean).join(' / ') || '-' }}</p>
          <p>店铺：{{ row.assignedTo || '未分配' }} · {{ row.city || '未填写城市' }}</p>
        </div>
        <div class="fmc-actions">
          <RecordLogsPopover record-type="finance" :record-id="row.id" />
          <el-button v-if="canEdit" link type="primary" @click="openEdit(row)">编辑</el-button>
          <el-button v-if="canDelete" link type="danger" @click="remove(row)">删除</el-button>
        </div>
      </article>
    </div>

    <el-pagination v-if="!isMobile || rows.length" v-model:current-page="page" v-model:page-size="pageSize" class="pager-row" layout="total, sizes, prev, pager, next" :page-sizes="[20, 50, 100]" :total="total" @change="load" />

    <el-dialog v-model="dialogVisible" :title="editing ? '编辑财税客户' : '登记财税客户'" :width="isMobile ? '94%' : '560px'">
      <el-form v-if="form" label-position="top">
        <el-row :gutter="12">
          <el-col :xs="24" :sm="12"><el-form-item label="订单编号"><el-input v-model="form.orderNo" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="业务类型"><el-select v-model="form.serviceType" style="width:100%"><el-option v-for="item in serviceTypes" :key="item" :label="item" :value="item" /></el-select></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="电话"><el-input v-model="form.phone" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="微信"><el-input v-model="form.wechat" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="所在城市"><el-input v-model="form.city" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="分配店铺"><el-select v-model="form.assignedTo" filterable allow-create style="width:100%"><el-option v-for="item in stores" :key="item" :label="item" :value="item" /></el-select></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="成交状态"><el-select v-model="form.dealStatus" style="width:100%"><el-option label="跟进中" value="" /><el-option label="已成交" value="已成交" /></el-select></el-form-item></el-col>
          <el-col :xs="24"><el-form-item label="备注"><el-input v-model="form.remarks" type="textarea" :rows="3" /></el-form-item></el-col>
        </el-row>
      </el-form>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" :loading="saving" @click="save">保存</el-button></template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { financeApi } from '../services/api'
import { useResponsive } from '../composables/useResponsive'
import DataTransfer from '../components/DataTransfer.vue'
import RecordLogsPopover from '../components/RecordLogsPopover.vue'

const props = defineProps({ user: Object, hasPerm: Function, reloadSignal: Number, title: { type: String, default: '财税客户登记表' }, serviceTypeOptions: { type: Array, default: () => [] } })
const { isMobile } = useResponsive()
const rows = ref([])
const stores = ref([])
const serviceTypes = ref([])
const loading = ref(false)
const saving = ref(false)
const dialogVisible = ref(false)
const editing = ref(false)
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalCommission = ref(0)
const selected = ref([])
const filters = reactive({ keyword: '', hasOrder: '', serviceType: '' })
const form = ref(null)

function hasPerm(name) { return props.hasPerm ? props.hasPerm(name) : false }
const canRegister = computed(() => props.hasPerm?.('financeRegister') || props.hasPerm?.('register'))
const canEdit = computed(() => props.hasPerm?.('financeEdit') || props.hasPerm?.('edit'))
const canDelete = computed(() => props.hasPerm?.('financeDelete') || props.hasPerm?.('delete'))

async function load() {
  loading.value = true
  try {
    const data = await financeApi.list({ ...filters, page: page.value, pageSize: pageSize.value })
    rows.value = data.customers || []
    total.value = data.total || 0
    totalCommission.value = data.totalCommission || 0
  } catch (err) { ElMessage.error(err.message || '加载财税客户失败') } finally { loading.value = false }
}

async function loadConfigs() {
  try {
    const data = await financeApi.configs()
    stores.value = data.stores || []
    serviceTypes.value = props.serviceTypeOptions.length ? props.serviceTypeOptions : data.configs?.serviceTypes || []
  } catch (err) {}
}

function search() { page.value = 1; load() }
function exportUrl(range = {}) { return financeApi.exportUrl({ keyword: filters.keyword.trim(), hasOrder: filters.hasOrder, serviceType: filters.serviceType, ...range }) }
function blank() { return { orderNo: '', serviceType: serviceTypes.value[0] || '', phone: '', wechat: '', city: '', assignedTo: '', dealStatus: '', remarks: '' } }
function openCreate() { editing.value = false; form.value = blank(); dialogVisible.value = true }
function openEdit(row) { editing.value = true; form.value = { ...blank(), ...row }; dialogVisible.value = true }

async function save() {
  if (!form.value) return
  saving.value = true
  try {
    const payload = {
      orderNo: form.value.orderNo || '', serviceType: form.value.serviceType || '', phone: form.value.phone || '',
      wechat: form.value.wechat || '', city: form.value.city || '', assignedTo: form.value.assignedTo || '',
      dealStatus: form.value.dealStatus || '', remarks: form.value.remarks || ''
    }
    if (editing.value) await financeApi.update(form.value.id, payload)
    else await financeApi.create(payload)
    ElMessage.success(editing.value ? '保存成功' : '登记成功')
    dialogVisible.value = false
    await load()
  } catch (err) { ElMessage.error(err.message || '保存失败') } finally { saving.value = false }
}

async function updateOrderNo(row) {
  try { await financeApi.update(row.id, { orderNo: row.orderNo || '' }); ElMessage.success(row.orderNo ? '订单号已保存，按有单提成核算' : '已清空订单号，按无单提成核算'); await load() } catch (err) { ElMessage.error(err.message || '订单号保存失败'); await load() }
}

async function remove(row) {
  try {
    await ElMessageBox.confirm(`确定删除这条财税客户记录？`, '提示', { type: 'warning' })
    await financeApi.remove(row.id)
    ElMessage.success('删除成功')
    await load()
  } catch (err) { if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '删除失败') }
}

async function batchRemove() {
  try { await ElMessageBox.confirm(`确定批量删除选中的 ${selected.value.length} 条记录？`, '批量删除', { type: 'warning' }); await financeApi.batchRemove(selected.value.map(row => row.id)); selected.value = []; ElMessage.success('批量删除成功'); await load() } catch (err) { if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '批量删除失败') }
}

watch(() => props.reloadSignal, () => { page.value = 1; load() })
onMounted(() => { loadConfigs(); load() })
</script>
