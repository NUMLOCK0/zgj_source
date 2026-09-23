<template>
  <section class="ledger-page-container">
    <div class="ledger-hero-card">
      <div><span class="ledger-kicker">备用金与个人收支台账</span><h2>个人记账本</h2><p>收支记录、用途分类与凭证核销</p></div>
      <div class="ledger-hero-actions"><el-button type="primary" :icon="Plus" @click="openCreate">记一笔收支</el-button><el-button :icon="Download" @click="exportRecords">导出收支明细</el-button><el-button :icon="Refresh" :loading="loading" @click="load">刷新</el-button></div>
    </div>

    <div class="ledger-summary-grid"><article class="ledger-summary-card income"><span>累计收入</span><strong>￥{{ money(summary.totalIncome) }}</strong></article><article class="ledger-summary-card expense"><span>累计支出</span><strong>￥{{ money(summary.totalExpense) }}</strong></article><article class="ledger-summary-card balance"><span>当前结余</span><strong>￥{{ money(summary.balance) }}</strong></article></div>

    <div class="ledger-filter-bar">
      <el-select v-model="filters.type" clearable placeholder="全部收支" @change="search"><el-option label="收入" value="income" /><el-option label="支出" value="expense" /></el-select>
      <el-select v-model="filters.category" clearable filterable allow-create default-first-option placeholder="全部分类" @change="search"><el-option v-for="item in categoryOptions" :key="item" :label="item" :value="item" /></el-select>
      <UnifiedDateFilter default-type="thisMonth" @change="onDateRangeChange" />
    </div>

    <el-card shadow="never" class="ledger-table-card">
      <div v-if="isMobile" v-loading="loading" class="ledger-mobile-list">
        <article v-for="row in rows" :key="row.id" class="ledger-mobile-card"><div class="ledger-card-top"><span class="ledger-date">{{ row.date || '-' }}</span><el-tag :type="row.type === 'income' ? 'success' : 'danger'" size="small">{{ row.type === 'income' ? '收入' : '支出' }}</el-tag></div><div class="ledger-card-amount" :class="row.type">{{ row.type === 'income' ? '+' : '-' }}￥{{ money(row.amount) }}</div><div class="ledger-card-meta"><span>{{ row.category || '其他' }}</span><span>{{ row.creatorName || row.createdBy || '-' }}</span></div><p v-if="row.remarks" class="ledger-card-remarks">{{ row.remarks }}</p><div v-if="row.receiptUrl" class="ledger-receipt-mobile"><el-image :src="receiptSrc(row.receiptUrl)" :preview-src-list="[receiptSrc(row.receiptUrl)]" fit="cover" preview-teleported /><span>已有凭证</span></div><div class="ledger-card-actions"><el-button link type="primary" @click="openEdit(row)">编辑</el-button><el-button link type="danger" @click="remove(row)">删除</el-button></div></article>
        <el-empty v-if="!rows.length && !loading" description="暂无记账记录" :image-size="56" />
      </div>

      <el-table size="small" v-else v-loading="loading" :data="rows" stripe class="ledger-data-table"><el-table-column prop="date" label="发生时间" width="170" /><el-table-column label="收支类型" width="100"><template #default="{ row }"><el-tag :type="row.type === 'income' ? 'success' : 'danger'" size="small">{{ row.type === 'income' ? '收入' : '支出' }}</el-tag></template></el-table-column><el-table-column label="金额" width="130"><template #default="{ row }"><strong :class="['ledger-amount', row.type]">{{ row.type === 'income' ? '+' : '-' }}￥{{ money(row.amount) }}</strong></template></el-table-column><el-table-column prop="category" label="分类" width="150" /><el-table-column prop="remarks" label="备注用途" min-width="220" show-overflow-tooltip /><el-table-column label="凭证" width="90" align="center"><template #default="{ row }"><el-image v-if="row.receiptUrl" class="ledger-receipt-thumb" :src="receiptSrc(row.receiptUrl)" :preview-src-list="[receiptSrc(row.receiptUrl)]" fit="cover" preview-teleported /><span v-else class="muted-text">无</span></template></el-table-column><el-table-column prop="creatorName" label="记账员工" width="110" /><el-table-column label="操作" width="130" fixed="right"><template #default="{ row }"><el-button link type="primary" @click="openEdit(row)">编辑</el-button><el-button link type="danger" @click="remove(row)">删除</el-button></template></el-table-column></el-table>
      <div class="pager-row"><el-pagination v-model:current-page="page" v-model:page-size="pageSize" :layout="isMobile ? 'prev, pager, next' : 'total, sizes, prev, pager, next'" :page-sizes="[20, 50, 100]" :total="total" :size="isMobile ? 'small' : 'default'" background @change="load" /></div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="editing ? '编辑收支记录' : '记一笔收支'" :width="isMobile ? '94%' : '560px'" class="ledger-dialog" :close-on-click-modal="false">
      <el-form v-if="form" label-position="top" class="ledger-entry-form" @paste="handlePaste"><div class="ledger-type-switch"><button type="button" :class="{ active: form.type === 'income' }" @click="form.type = 'income'">收入</button><button type="button" :class="{ active: form.type === 'expense' }" @click="form.type = 'expense'">支出</button></div><el-row :gutter="12"><el-col :xs="24" :sm="12"><el-form-item label="金额"><el-input-number v-model="form.amount" :min="0.01" :precision="2" controls-position="right" style="width:100%" /></el-form-item></el-col><el-col :xs="24" :sm="12"><el-form-item label="发生时间"><el-date-picker v-model="form.date" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" style="width:100%" /></el-form-item></el-col><el-col :xs="24"><el-form-item label="分类"><el-select v-model="form.category" filterable allow-create default-first-option style="width:100%"><el-option v-for="item in categoryOptions" :key="item" :label="item" :value="item" /></el-select></el-form-item></el-col><el-col :xs="24"><el-form-item label="凭证"><div class="ledger-upload-line"><el-button :loading="uploading" @click="receiptInput?.click()">{{ form.receiptUrl ? '重新上传凭证' : '上传凭证图片' }}</el-button><input ref="receiptInput" type="file" accept="image/*" hidden @change="uploadReceipt"><el-image v-if="form.receiptUrl" class="ledger-upload-preview" :src="receiptSrc(form.receiptUrl)" :preview-src-list="[receiptSrc(form.receiptUrl)]" fit="cover" preview-teleported /><el-button v-if="form.receiptUrl" link type="danger" @click="form.receiptUrl = ''">移除</el-button><span class="muted-text">也可直接粘贴图片</span></div></el-form-item></el-col><el-col :xs="24"><el-form-item label="备注用途"><el-input v-model="form.remarks" type="textarea" :rows="3" maxlength="200" show-word-limit placeholder="填写款项用途或补充说明" /></el-form-item></el-col></el-row></el-form>
      <template #footer><el-button @click="dialogVisible = false">取消</el-button><el-button type="primary" :loading="saving || uploading" @click="save">保存</el-button></template>
    </el-dialog>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Download, Plus, Refresh } from '@element-plus/icons-vue'
import { ledgerApi } from '../services/api'
import { useResponsive } from '../composables/useResponsive'
import UnifiedDateFilter from '../components/UnifiedDateFilter.vue'

const { isMobile } = useResponsive()
const rows = ref([]); const summary = ref({ totalIncome: 0, totalExpense: 0, balance: 0 }); const loading = ref(false); const saving = ref(false); const uploading = ref(false); const dialogVisible = ref(false); const editing = ref(false); const form = ref(null); const receiptInput = ref(null); const page = ref(1); const pageSize = ref(20); const total = ref(0)
const filters = reactive({ type: '', category: '', startDate: '', endDate: '' })
const categoryOptions = ['公司打款', '买号花费', '平台推广', '客户退款/红包', '物料采购', '办公杂费', '其他']
const money = value => Number(value || 0).toFixed(2)
const receiptSrc = value => value?.startsWith('http') ? value : value || ''
function localDateTime() { const date = new Date(); const pad = value => String(value).padStart(2, '0'); return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}` }
function requestParams() { const params = { type: filters.type, category: filters.category, page: page.value, pageSize: pageSize.value }; if (filters.startDate && filters.endDate) { params.startDate = filters.startDate; params.endDate = filters.endDate } return params }
async function load() { loading.value = true; try { const data = await ledgerApi.records(requestParams()); rows.value = data.records || []; summary.value = data; total.value = data.total || 0 } catch (err) { ElMessage.error(err.message || '加载账目失败') } finally { loading.value = false } }
function search() { page.value = 1; load() }
function onDateRangeChange(value) { filters.startDate = value?.startDate || ''; filters.endDate = value?.endDate || ''; search() }
function exportRecords() { window.open(ledgerApi.exportUrl({ type: filters.type, category: filters.category, startDate: filters.startDate, endDate: filters.endDate }), '_blank') }
function blank() { return { type: 'expense', amount: 0, category: '其他', date: localDateTime(), receiptUrl: '', remarks: '' } }
function openCreate() { editing.value = false; form.value = blank(); dialogVisible.value = true }
function openEdit(row) { editing.value = true; form.value = { ...blank(), ...row }; dialogVisible.value = true }
function readFile(file) { return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file) }) }
async function saveReceipt(file) { if (!file || !file.type.startsWith('image/')) return; uploading.value = true; try { const imageBase64 = await readFile(file); const data = await ledgerApi.uploadReceipt({ imageBase64, filename: file.name }); form.value.receiptUrl = data.url || ''; ElMessage.success('凭证上传成功') } catch (err) { ElMessage.error(err.message || '凭证上传失败') } finally { uploading.value = false } }
function uploadReceipt(event) { const file = event.target.files?.[0]; event.target.value = ''; saveReceipt(file) }
function handlePaste(event) { const file = [...(event.clipboardData?.items || [])].map(item => item.getAsFile?.()).find(Boolean); if (file) { event.preventDefault(); saveReceipt(file) } }
async function save() { if (!form.value || Number(form.value.amount) <= 0) { ElMessage.warning('请填写正确的金额'); return } saving.value = true; try { if (editing.value) await ledgerApi.update(form.value.id, form.value); else await ledgerApi.create(form.value); dialogVisible.value = false; ElMessage.success('保存成功'); await load() } catch (err) { ElMessage.error(err.message || '保存失败') } finally { saving.value = false } }
async function remove(row) { try { await ElMessageBox.confirm('确定删除这条账目？', '提示', { type: 'warning' }); await ledgerApi.remove(row.id); ElMessage.success('删除成功'); await load() } catch (err) { if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '删除失败') } }
onMounted(load)
</script>
