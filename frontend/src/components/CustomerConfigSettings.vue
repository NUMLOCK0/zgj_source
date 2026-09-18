<template>
  <section class="customer-config-page">
    <div class="settings-section-title">客户配置</div>
    <el-card shadow="never" class="settings-card">
      <template #header>
        <div class="panel-head">
          <div>
            <div class="settings-row-label">客户字段选项</div>
            <div class="settings-row-desc">维护登记表中学历、专业、申报级别和店铺的下拉选项</div>
          </div>
        </div>
      </template>
      <el-tabs v-model="activeType" class="customer-config-tabs" stretch>
        <el-tab-pane v-for="item in configTypes" :key="item.key" :label="item.label" :name="item.key">
          <div class="config-add-row mobile-config-add-row">
            <el-input v-model="newValue" :placeholder="`新增${item.label}`" @keyup.enter="addValue" />
            <el-button type="primary" :disabled="!newValue.trim()" @click="addValue">新增</el-button>
          </div>
          <div v-if="values.length" class="config-value-list">
            <el-tag v-for="value in values" :key="value" closable @close="removeValue(value)">{{ value }}</el-tag>
          </div>
          <el-empty v-else description="暂无配置项" :image-size="72" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { customerApi } from '../services/api'

const activeType = ref('degree')
const newValue = ref('')
const configs = ref({ degree: [], major: [], applyLevel: [], store: [] })
const configTypes = [
  { key: 'degree', label: '学历' },
  { key: 'major', label: '专业' },
  { key: 'applyLevel', label: '申报级别' },
  { key: 'store', label: '店铺' }
]
const values = computed(() => configs.value[activeType.value] || [])

async function load() {
  const data = await customerApi.configs()
  configs.value = {
    degree: data.degree || [],
    major: data.major || [],
    applyLevel: data.applyLevel || [],
    store: data.store || []
  }
}

async function addValue() {
  const value = newValue.value.trim()
  if (!value) return
  try {
    const data = await customerApi.addConfig(activeType.value, value)
    configs.value[activeType.value] = data.values || []
    newValue.value = ''
    ElMessage.success('已新增配置')
  } catch (err) {
    ElMessage.error(err.message || '新增失败')
  }
}

async function removeValue(value) {
  try {
    await ElMessageBox.confirm(`确定删除配置“${value}”？`, '删除配置', { type: 'warning' })
    const data = await customerApi.removeConfig(activeType.value, value)
    configs.value[activeType.value] = data.values || []
    ElMessage.success('已删除')
  } catch (err) {
    if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '删除失败')
  }
}

onMounted(() => load().catch(err => ElMessage.error(err.message || '加载配置失败')))
</script>
