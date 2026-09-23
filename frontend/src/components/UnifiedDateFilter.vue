<template>
  <div class="compact-date-container">
    <div class="date-outer-bar-compact">
      <button
        v-for="item in compactOptions"
        :key="item.value"
        type="button"
        class="date-pill-compact"
        :class="{ active: selectedType === item.value }"
        @click="applyType(item.value)"
      >{{ item.label }}</button>
      <button type="button" class="date-pill-compact btn-custom-compact" :class="{ active: customActive }" @click="openDialog">
        <span>{{ customLabel }}</span>
        <el-icon><Calendar /></el-icon>
      </button>
    </div>

    <el-dialog v-model="dialogVisible" title="选择查询日期范围" :width="isMobile ? '94%' : '480px'" class="date-modal-dialog" append-to-body>
      <div class="modal-section-title">快捷日期选项</div>
      <div class="modal-shortcuts-grid">
        <button v-for="item in dialogOptions" :key="item.value" type="button" class="modal-shortcut-btn" :class="{ active: selectedType === item.value && !customDraft }" @click="selectDraft(item.value)">{{ item.label }}</button>
      </div>
      <div class="modal-section-title mt-16">自定义日期区间</div>
      <el-date-picker v-model="customDraft" type="daterange" value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="large" class="modal-range-picker" @change="markCustom" />
      <template #footer>
        <div class="date-modal-footer">
          <el-button size="large" @click="dialogVisible = false">取消</el-button>
          <el-button size="large" type="primary" @click="confirmDialog">确定应用</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import { useResponsive } from '../composables/useResponsive'

const props = defineProps({
  defaultType: { type: String, default: 'today' },
  modelValue: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue', 'change'])
const { isMobile } = useResponsive()
const compactOptions = [
  { label: '今日', value: 'today' },
  { label: '昨日', value: 'yesterday' },
  { label: '7天', value: '7' },
  { label: '15天', value: '15' }
]
const dialogOptions = [
  ...compactOptions.map(item => ({ ...item, label: item.value === '7' ? '过去 7 天' : item.value === '15' ? '过去 15 天' : item.label })),
  { label: '过去 30 天', value: '30' },
  { label: '本月', value: 'thisMonth' },
  { label: '上月', value: 'lastMonth' }
]
const selectedType = ref(props.defaultType || 'today')
const selectedRange = ref([])
const customDraft = ref([])
const dialogVisible = ref(false)
const customActive = computed(() => selectedType.value === 'custom' || ['30', 'thisMonth', 'lastMonth'].includes(selectedType.value))
const customLabel = computed(() => {
  if (selectedType.value === 'custom' && customDraft.value?.length === 2) return `${customDraft.value[0].slice(5)}~${customDraft.value[1].slice(5)}`
  return dialogOptions.find(item => item.value === selectedType.value)?.label || '自定义'
})

function formatDate(date) {
  const pad = value => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
function getRange(type) {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const move = days => { const date = new Date(start); date.setDate(date.getDate() + days); return date }
  if (type === 'today') return [formatDate(start), formatDate(start)]
  if (type === 'yesterday') return [formatDate(move(-1)), formatDate(move(-1))]
  if (type === '7') return [formatDate(move(-6)), formatDate(start)]
  if (type === '15') return [formatDate(move(-14)), formatDate(start)]
  if (type === '30') return [formatDate(move(-29)), formatDate(start)]
  if (type === 'thisMonth') return [formatDate(new Date(start.getFullYear(), start.getMonth(), 1)), formatDate(start)]
  if (type === 'lastMonth') return [formatDate(new Date(start.getFullYear(), start.getMonth() - 1, 1)), formatDate(new Date(start.getFullYear(), start.getMonth(), 0))]
  return ['', '']
}
function emitRange(type, range) {
  selectedType.value = type
  selectedRange.value = range
  emit('update:modelValue', range)
  emit('change', { type, startDate: range[0], endDate: range[1] })
}
function applyType(type) { emitRange(type, getRange(type)) }
function openDialog() {
  customDraft.value = selectedType.value === 'custom' && selectedRange.value.length === 2 ? [...selectedRange.value] : getRange(selectedType.value)
  dialogVisible.value = true
}
function selectDraft(type) { selectedType.value = type; customDraft.value = getRange(type) }
function markCustom(value) { if (value?.length === 2) { selectedType.value = 'custom' } }
function confirmDialog() {
  const range = customDraft.value?.length === 2 ? [...customDraft.value] : getRange(selectedType.value)
  emitRange(selectedType.value === 'custom' ? 'custom' : selectedType.value, range)
  dialogVisible.value = false
}
watch(() => props.defaultType, value => { if (value && value !== 'custom') applyType(value) }, { immediate: true })
</script>
