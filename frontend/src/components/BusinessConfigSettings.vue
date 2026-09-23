<template>
  <section class="business-config-page">
    <div class="settings-section-title">客户与财税配置</div>

    <el-card shadow="never" class="settings-card config-group-card">
      <template #header>
        <div class="panel-head">
          <div>
            <div class="settings-row-label">客户配置</div>
            <div class="settings-row-desc">维护职称登记表中的学历、专业、申报级别和来源店铺选项</div>
          </div>
        </div>
      </template>
      <el-tabs v-model="customerType" class="customer-config-tabs" stretch>
        <el-tab-pane v-for="item in customerTypes" :key="item.key" :label="item.label" :name="item.key">
          <div class="config-add-row mobile-config-add-row">
            <el-input v-model="customerValue" :placeholder="`新增${item.label}`" @keyup.enter="addCustomerValue" />
            <el-button type="primary" :disabled="!customerValue.trim()" @click="addCustomerValue">新增</el-button>
          </div>
          <div v-if="customerValues.length" class="config-value-list">
            <el-tag v-for="value in customerValues" :key="value" closable @close="removeCustomerValue(value)">{{ value }}</el-tag>
          </div>
          <el-empty v-else description="暂无配置项" :image-size="72" />
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-card shadow="never" class="settings-card config-group-card">
      <template #header>
        <div class="panel-head">
          <div>
            <div class="settings-row-label">财税配置</div>
            <div class="settings-row-desc">维护财税登记表中的来源店铺、业务类型和纳税性质选项</div>
          </div>
        </div>
      </template>
      <el-tabs v-model="financeType" class="customer-config-tabs" stretch>
        <el-tab-pane v-for="item in financeTypes" :key="item.key" :label="item.label" :name="item.key">
          <div class="config-add-row mobile-config-add-row">
            <el-input v-model="financeValue" :placeholder="`新增${item.label}`" @keyup.enter="addFinanceValue" />
            <el-button type="primary" :disabled="!financeValue.trim()" @click="addFinanceValue">新增</el-button>
          </div>
          <div v-if="financeValues.length" class="config-value-list">
            <el-tag v-for="value in financeValues" :key="value" closable @close="removeFinanceValue(value)">{{ value }}</el-tag>
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
import { customerApi, financeApi } from '../services/api'

const customerType = ref('degree')
const customerValue = ref('')
const customerConfigs = ref({ degree: [], major: [], applyLevel: [], store: [] })
const customerTypes = [
  { key: 'degree', label: '学历' },
  { key: 'major', label: '专业' },
  { key: 'applyLevel', label: '申报级别' },
  { key: 'store', label: '来源店铺' }
]
const customerValues = computed(() => customerConfigs.value[customerType.value] || [])

const financeType = ref('stores')
const financeValue = ref('')
const financeConfigs = ref({ stores: [], serviceTypes: [], taxpayerTypes: [] })
const financeTypes = [
  { key: 'stores', label: '来源店铺' },
  { key: 'serviceTypes', label: '业务类型' },
  { key: 'taxpayerTypes', label: '纳税性质' }
]
const financeValues = computed(() => financeConfigs.value[financeType.value] || [])

async function load() {
  const [customerData, financeData] = await Promise.all([customerApi.configs(), financeApi.configs()])
  customerConfigs.value = {
    degree: customerData.degree || [],
    major: customerData.major || [],
    applyLevel: customerData.applyLevel || [],
    store: customerData.store || []
  }
  financeConfigs.value = {
    stores: financeData.stores || [],
    serviceTypes: financeData.configs?.serviceTypes || [],
    taxpayerTypes: financeData.configs?.taxpayerTypes || []
  }
}

async function addCustomerValue() {
  const value = customerValue.value.trim()
  if (!value) return
  try {
    const data = await customerApi.addConfig(customerType.value, value)
    customerConfigs.value[customerType.value] = data.values || []
    customerValue.value = ''
    ElMessage.success('已新增客户配置')
  } catch (err) {
    ElMessage.error(err.message || '新增失败')
  }
}

async function removeCustomerValue(value) {
  try {
    await ElMessageBox.confirm(`确定删除配置“${value}”？`, '删除客户配置', { type: 'warning' })
    const data = await customerApi.removeConfig(customerType.value, value)
    customerConfigs.value[customerType.value] = data.values || []
    ElMessage.success('已删除客户配置')
  } catch (err) {
    if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '删除失败')
  }
}

async function addFinanceValue() {
  const value = financeValue.value.trim()
  if (!value) return
  try {
    const data = await financeApi.addConfig(financeType.value, value)
    financeConfigs.value[financeType.value] = data.values || []
    financeValue.value = ''
    ElMessage.success('已新增财税配置')
  } catch (err) {
    ElMessage.error(err.message || '新增失败')
  }
}

async function removeFinanceValue(value) {
  try {
    await ElMessageBox.confirm(`确定删除配置“${value}”？`, '删除财税配置', { type: 'warning' })
    const data = await financeApi.removeConfig(financeType.value, value)
    financeConfigs.value[financeType.value] = data.values || []
    ElMessage.success('已删除财税配置')
  } catch (err) {
    if (err !== 'cancel' && err !== 'close') ElMessage.error(err.message || '删除失败')
  }
}

onMounted(() => load().catch(err => ElMessage.error(err.message || '加载配置失败')))
</script>
