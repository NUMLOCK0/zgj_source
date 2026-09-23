<template>
  <el-popover trigger="hover" placement="top-end" width="360" :show-after="120" @show="load">
    <template #reference>
      <el-button link type="info" size="small" class="record-log-trigger">日志</el-button>
    </template>

    <div class="record-log-popover">
      <div class="record-log-title">操作日志</div>
      <div v-if="loading" class="record-log-state">正在加载...</div>
      <div v-else-if="!logs.length" class="record-log-state">暂无操作日志</div>
      <ul v-else class="record-log-list">
        <li v-for="log in logs" :key="log.id">
          <div class="record-log-meta">
            <strong>{{ log.username || '未知用户' }}</strong>
            <span>{{ formatTime(log.timestamp) }}</span>
          </div>
          <div class="record-log-detail">{{ log.detail || actionText(log.action) }}</div>
        </li>
      </ul>
    </div>
  </el-popover>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { auditApi } from '../services/api'

const props = defineProps({ recordType: { type: String, required: true }, recordId: { type: [String, Number], required: true } })
const logs = ref([])
const loading = ref(false)
const loaded = ref(false)

function formatTime(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value || '-' : date.toLocaleString('zh-CN', { hour12: false })
}

function actionText(action) {
  return ({ register: '登记', edit: '编辑', delete: '删除' })[action] || action || '操作'
}

async function load() {
  if (loaded.value || loading.value) return
  loading.value = true
  try {
    const data = await auditApi.recordLogs(props.recordType, props.recordId)
    logs.value = data.logs || []
    loaded.value = true
  } catch (error) {
    ElMessage.error(error.message || '加载操作日志失败')
  } finally {
    loading.value = false
  }
}
</script>
