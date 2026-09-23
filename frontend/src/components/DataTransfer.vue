<template>
  <span class="data-transfer">
    <el-button :icon="Download" :loading="exporting" :disabled="!canExport || exporting" @click="openExport">导出</el-button>
    <el-button :icon="Upload" :disabled="!canImport" @click="pickFile">导入</el-button>
    <input ref="fileInput" type="file" accept=".csv,text/csv,text/plain" class="dt-file-input" @change="readFile" />

    <el-dialog v-model="previewVisible" :title="stage === 'preview' ? `导入${scopeLabel} · 导入前确认` : `导入${scopeLabel} · 导入结果`" :width="isMobile ? '94%' : '760px'" :close-on-click-modal="false" class="dt-dialog">
      <template v-if="stage === 'preview'">
        <p class="dt-file-name">文件：<strong>{{ fileName }}</strong>（共读取 {{ preview.total }} 行）</p>
        <div class="dt-summary">
          <div class="dt-sum-item dt-add"><span>新增</span><strong>{{ preview.created }}</strong></div>
          <div class="dt-sum-item dt-update"><span>更新</span><strong>{{ preview.updated }}</strong></div>
          <div class="dt-sum-item dt-skip"><span>跳过</span><strong>{{ duplicateCount }}</strong></div>
          <div class="dt-sum-item dt-fail"><span>校验失败</span><strong>{{ preview.failed }}</strong></div>
          <div class="dt-sum-item dt-actual"><span>实际写入</span><strong>{{ writeCount }}</strong></div>
        </div>
        <div class="dt-option-row"><span class="dt-option-label">重复数据：</span><el-radio-group v-model="onDuplicate" size="small"><el-radio-button label="overwrite">覆盖已有</el-radio-button><el-radio-button label="skip">跳过保留</el-radio-button></el-radio-group></div>
        <el-alert v-if="preview.failed" type="warning" :title="`有 ${preview.failed} 行未通过校验，导入时将自动跳过`" :closable="false" show-icon class="dt-alert" />
        <div v-if="preview.errors?.length" class="dt-error-block"><div class="dt-error-title">失败行明细</div><el-table :data="preview.errors" size="small" border max-height="200"><el-table-column prop="line" label="文件行号" width="100" /><el-table-column prop="reason" label="失败原因" /></el-table></div>
        <p v-if="importFieldsHint" class="dt-hint">{{ importFieldsHint }}</p>
        <p v-if="!preview.valid" class="dt-hint dt-hint-error">没有可写入的有效数据，请检查文件内容或表头。</p>
      </template>
      <template v-else>
        <div class="dt-summary"><div class="dt-sum-item dt-add"><span>新增成功</span><strong>{{ result.created }}</strong></div><div class="dt-sum-item dt-update"><span>更新成功</span><strong>{{ result.updated }}</strong></div><div class="dt-sum-item dt-skip"><span>跳过重复</span><strong>{{ result.skipped }}</strong></div><div class="dt-sum-item dt-fail"><span>失败</span><strong>{{ result.failed }}</strong></div></div>
        <div v-if="result.errors?.length" class="dt-error-block"><div class="dt-error-title">失败行明细</div><el-table :data="result.errors" size="small" border max-height="200"><el-table-column prop="line" label="文件行号" width="100" /><el-table-column prop="reason" label="失败原因" /></el-table></div>
        <p v-else class="dt-hint">全部数据已处理完成，没有失败行。</p>
      </template>
      <template #footer>
        <template v-if="stage === 'preview'"><el-button @click="previewVisible = false">取消</el-button><el-button type="primary" :loading="importing" :disabled="!preview.valid" @click="confirmImport">确认导入 {{ writeCount }} 条</el-button></template>
        <el-button v-else type="primary" @click="previewVisible = false">完成</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="exportVisible" title="选择导出日期" :width="isMobile ? '94%' : '460px'" :close-on-click-modal="false" class="dt-export-dialog">
      <div class="dt-export-body"><div class="dt-export-label">选择日期：</div><el-date-picker v-model="exportRange" type="daterange" value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" clearable class="dt-export-picker" /><div class="dt-export-label dt-export-label-sub">快捷日期：</div><div class="dt-export-shortcuts"><button v-for="item in shortcuts" :key="item.label" type="button" class="dt-shortcut" :class="{ 'is-active': exportRange?.[0] === item.range[0] && exportRange?.[1] === item.range[1] }" @click="exportRange = [...item.range]">{{ item.label }}</button></div><p v-if="exportHint" class="dt-export-hint">{{ exportHint }}</p></div>
      <template #footer><el-button @click="exportVisible = false">取消</el-button><el-button type="primary" :loading="exporting" @click="confirmExport">确定</el-button></template>
    </el-dialog>
  </span>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Download, Upload } from '@element-plus/icons-vue'
import { useResponsive } from '../composables/useResponsive'

const props = defineProps({
  scopeLabel: { type: String, default: '数据' },
  canExport: Boolean,
  canImport: Boolean,
  exportUrl: { type: Function, required: true },
  fallbackFilename: { type: String, default: 'export.csv' },
  importRequest: { type: Function, required: true },
  showExportDialog: Boolean,
  defaultExportRange: { type: Array, default: () => [] },
  allowEmptyExportRange: Boolean,
  exportHint: { type: String, default: '' },
  keyHeaders: { type: Array, default: () => [] },
  importFieldsHint: { type: String, default: '' }
})
const emit = defineEmits(['imported'])
const { isMobile } = useResponsive()
const fileInput = ref(null)
const fileName = ref('')
const records = ref([])
const previewVisible = ref(false)
const exportVisible = ref(false)
const stage = ref('preview')
const importing = ref(false)
const exporting = ref(false)
const onDuplicate = ref('overwrite')
const exportRange = ref([])
const preview = ref({ total: 0, valid: 0, created: 0, updated: 0, skipped: 0, failed: 0, errors: [] })
const result = ref({ created: 0, updated: 0, skipped: 0, failed: 0, errors: [] })
const shortcuts = computed(() => {
  const today = new Date()
  const fmt = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  const range = days => { const start = new Date(today); start.setDate(start.getDate() - days); return [fmt(start), fmt(today)] }
  return [{ label: '今日', range: [fmt(today), fmt(today)] }, { label: '过去 7 天', range: range(6) }, { label: '过去 15 天', range: range(14) }, { label: '本月', range: [fmt(new Date(today.getFullYear(), today.getMonth(), 1)), fmt(today)] }]
})
const duplicateCount = computed(() => onDuplicate.value === 'skip' ? preview.value.updated : 0)
const writeCount = computed(() => onDuplicate.value === 'skip' ? preview.value.created : preview.value.valid)

function parseCsv(text) {
  const rows = []
  let row = [], value = '', quoted = false
  text = String(text || '').replace(/^\uFEFF/, '')
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') { value += '"'; i += 1 } else if (char === '"') quoted = false
      else value += char
    } else if (char === '"') quoted = true
    else if (char === ',') { row.push(value); value = '' }
    else if (char === '\n') { row.push(value); rows.push(row); row = []; value = '' }
    else if (char !== '\r') value += char
  }
  if (value || row.length) { row.push(value); rows.push(row) }
  const clean = rows.filter(item => item.some(value => String(value).trim()))
  const headers = clean.shift()?.map(value => String(value).trim()) || []
  return { headers, records: clean.map((values, index) => Object.fromEntries(headers.map((header, column) => [header, String(values[column] ?? '').trim()]).concat([['_line', index + 2]]))) }
}
function pickFile() { fileInput.value?.click() }
async function readFile(event) {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return
  fileName.value = file.name
  try {
    const { headers, records: parsed } = parseCsv(await file.text())
    if (!parsed.length) return ElMessage.warning('文件里没有数据行，请确认表头下方存在内容')
    if (props.keyHeaders.length && !props.keyHeaders.some(header => headers.includes(header))) return ElMessage.error(`表头不匹配，至少要包含「${props.keyHeaders.join(' / ')}」中的一列`)
    records.value = parsed
    const data = await props.importRequest({ rows: parsed, preview: true, onDuplicate: onDuplicate.value })
    preview.value = { ...preview.value, ...data, errors: data.errors || [] }
    stage.value = 'preview'
    previewVisible.value = true
  } catch (error) { ElMessage.error(error.message || '文件解析失败') }
}
async function confirmImport() {
  importing.value = true
  try {
    const data = await props.importRequest({ rows: records.value, preview: false, onDuplicate: onDuplicate.value })
    result.value = { ...result.value, ...data, errors: data.errors || [] }
    stage.value = 'done'
    emit('imported', result.value)
  } catch (error) { ElMessage.error(error.message || '导入失败') }
  finally { importing.value = false }
}
function openExport() {
  if (!props.showExportDialog) return confirmExport()
  exportRange.value = props.defaultExportRange?.length === 2 ? [...props.defaultExportRange] : []
  exportVisible.value = true
}
async function confirmExport() {
  if (!props.allowEmptyExportRange && exportRange.value.length !== 2) return ElMessage.warning('请先选择导出日期范围')
  exporting.value = true
  try {
    const params = exportRange.value.length === 2 ? { startDate: exportRange.value[0], endDate: exportRange.value[1] } : {}
    const response = await fetch(props.exportUrl(params), { credentials: 'same-origin' })
    if (!response.ok) throw new Error(`导出失败(${response.status})`)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = props.fallbackFilename
    link.click()
    URL.revokeObjectURL(url)
    exportVisible.value = false
    ElMessage.success('导出完成，文件已开始下载')
  } catch (error) { ElMessage.error(error.message || '导出失败') }
  finally { exporting.value = false }
}
</script>
