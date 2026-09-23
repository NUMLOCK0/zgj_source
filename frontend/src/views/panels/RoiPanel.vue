<template>
  <section class="stack-page roi-page">
    <el-tabs v-model="tab" class="page-tabs">
      <!-- 数据录入 -->
      <el-tab-pane v-if="hasPerm('roiView')" label="数据录入" name="entry">
        <div class="toolbar">
          <div class="title-block">
            <h2>每日运营登记</h2>
            <p>{{ entryDate }} 的运营数据</p>
          </div>
          <div class="toolbar-actions">
            <el-button :icon="ArrowLeft" circle @click="changeDate(-1)" />
            <el-date-picker v-model="entryDate" type="date" value-format="YYYY-MM-DD" @change="loadEntryData" style="width:140px" />
            <el-button :icon="ArrowRight" circle @click="changeDate(1)" />
            <el-button @click="entryDate = today(); loadEntryData()">今天</el-button>
          </div>
        </div>

        <div class="roi-product-bar" v-if="products.length">
          <button v-for="p in products" :key="p.id" :class="['roi-product-chip', { active: selectedProduct === p.id }]" @click="selectProduct(p.id)">
            <img v-if="p.imageUrl" :src="p.imageUrl" class="roi-product-img" />
            <span>{{ p.name }}</span>
          </button>
          <el-button v-if="hasPerm('roiManage')" :icon="Plus" size="small" @click="productDialog = true" circle />
        </div>
        <el-empty v-else description="暂无产品，请先添加" :image-size="60">
          <el-button v-if="hasPerm('roiManage')" type="primary" @click="productDialog = true">添加产品</el-button>
        </el-empty>

        <el-card v-if="selectedProduct && products.length" shadow="never" class="tool-panel">
          <template #header>
            <div class="panel-head">
              <strong>{{ currentProductName }} — 数据录入</strong>
              <el-button v-if="hasPerm('roiEntry')" type="primary" :loading="saving" @click="saveEntry">保存数据</el-button>
            </div>
          </template>
          <el-form label-position="top" class="roi-entry-form">
            <el-row :gutter="12">
              <el-col :xs="12" :sm="6"><el-form-item label="访客数"><el-input-number v-model="entryForm.visitors" :min="0" controls-position="right" style="width:100%" /></el-form-item></el-col>
              <el-col :xs="12" :sm="6"><el-form-item label="买家数"><el-input-number v-model="entryForm.buyers" :min="0" controls-position="right" style="width:100%" /></el-form-item></el-col>
              <el-col :xs="12" :sm="6"><el-form-item label="订单数"><el-input-number v-model="entryForm.orders" :min="0" controls-position="right" style="width:100%" /></el-form-item></el-col>
              <el-col :xs="12" :sm="6"><el-form-item label="GMV(元)"><el-input-number v-model="entryForm.gmv" :min="0" :precision="2" controls-position="right" style="width:100%" /></el-form-item></el-col>
              <el-col :xs="12" :sm="6"><el-form-item label="补单数"><el-input-number v-model="entryForm.patchOrders" :min="0" controls-position="right" style="width:100%" /></el-form-item></el-col>
              <el-col :xs="12" :sm="6"><el-form-item label="推广费"><el-input-number v-model="entryForm.promoCost" :min="0" :precision="2" controls-position="right" style="width:100%" /></el-form-item></el-col>
              <el-col :xs="12" :sm="6"><el-form-item label="佣金"><el-input-number v-model="entryForm.commission" :min="0" :precision="2" controls-position="right" style="width:100%" /></el-form-item></el-col>
              <el-col :xs="12" :sm="6"><el-form-item label="其他支出"><el-input-number v-model="entryForm.otherCost" :min="0" :precision="2" controls-position="right" style="width:100%" /></el-form-item></el-col>
            </el-row>
            <el-alert v-if="entryCalc" :type="entryCalc.realRoi >= roiThreshold ? 'success' : 'warning'" show-icon :closable="false">
              真实GMV: ¥{{ entryCalc.realGmv }} | 真实ROI: {{ entryCalc.realRoi }} | 表面ROI: {{ entryCalc.surfaceRoi }} | 补单占比: {{ entryCalc.patchRatio }}% | 转化率: {{ entryCalc.convRate }}%
            </el-alert>
          </el-form>
        </el-card>
      </el-tab-pane>

      <!-- 看板 -->
      <el-tab-pane v-if="hasPerm('roiView')" label="数据看板" name="dashboard">
        <div class="toolbar">
          <div class="title-block">
            <h2>运营看板</h2>
            <p>{{ periodLabel }}</p>
          </div>
          <div class="toolbar-actions">
            <el-segmented v-model="dashboardPeriod" :options="periodOptions" @change="loadDashboard" />
            <el-button :icon="ArrowLeft" circle @click="changeDashboardDate(-1)" />
            <el-date-picker v-model="dashboardDate" type="date" value-format="YYYY-MM-DD" @change="loadDashboard" style="width:140px" />
            <el-button :icon="ArrowRight" circle @click="changeDashboardDate(1)" />
            <el-button v-if="user?.isAdmin" :type="showAll ? 'primary' : ''" @click="showAll = !showAll; loadDashboard()">{{ showAll ? '全部员工' : '仅自己' }}</el-button>
            <el-button :icon="Download" @click="exportRoi">导出</el-button>
          </div>
        </div>

        <div v-if="dashboard" class="lead-overview">
          <div class="lead-stat-card"><div class="lead-label">GMV</div><div class="lead-num">¥{{ fmt(dashboard.totals.gmv) }}</div></div>
          <div class="lead-stat-card"><div class="lead-label">真实GMV</div><div class="lead-num">¥{{ fmt(dashboard.totals.realGmv) }}</div></div>
          <div class="lead-stat-card"><div class="lead-label">推广费</div><div class="lead-num">¥{{ fmt(dashboard.totals.promoCost) }}</div></div>
          <div class="lead-stat-card"><div class="lead-label">真实ROI</div><div class="lead-num" :class="dashboard.totals.realRoi >= roiThreshold ? 'success-text' : 'danger-text'">{{ dashboard.totals.realRoi }}</div></div>
          <div class="lead-stat-card"><div class="lead-label">表面ROI</div><div class="lead-num">{{ dashboard.totals.surfaceRoi }}</div></div>
          <div class="lead-stat-card"><div class="lead-label">总支出</div><div class="lead-num">¥{{ fmt(dashboard.totals.totalCost) }}</div></div>
          <div class="lead-stat-card"><div class="lead-label">订单数</div><div class="lead-num">{{ dashboard.totals.orders }}</div></div>
          <div class="lead-stat-card"><div class="lead-label">转化率</div><div class="lead-num">{{ dashboard.totals.convRate }}%</div></div>
        </div>

        <el-table size="small" v-if="dashboard?.products?.length" :data="dashboard.products" border class="data-table mt-12">
          <el-table-column prop="productName" label="产品" min-width="120" />
          <el-table-column prop="gmv" label="GMV" min-width="100"><template #default="{ row }">¥{{ fmt(row.gmv) }}</template></el-table-column>
          <el-table-column prop="realGmv" label="真实GMV" min-width="100"><template #default="{ row }">¥{{ fmt(row.realGmv) }}</template></el-table-column>
          <el-table-column prop="realRoi" label="真实ROI" min-width="90"><template #default="{ row }"><span :class="row.realRoi >= roiThreshold ? 'success-text' : 'danger-text'">{{ row.realRoi }}</span></template></el-table-column>
          <el-table-column prop="surfaceRoi" label="表面ROI" min-width="90" />
          <el-table-column prop="orders" label="订单" width="70" />
          <el-table-column prop="visitors" label="访客" width="70" />
          <el-table-column prop="convRate" label="转化率" width="80"><template #default="{ row }">{{ row.convRate }}%</template></el-table-column>
          <el-table-column prop="patchRatio" label="补单占比" width="90"><template #default="{ row }">{{ row.patchRatio }}%</template></el-table-column>
          <el-table-column prop="records" label="记录数" width="70" />
        </el-table>
      </el-tab-pane>

      <!-- 薪资计算 -->
      <el-tab-pane v-if="hasPerm('roiManage')" label="薪资计算" name="salary">
        <div class="toolbar">
          <div class="title-block">
            <h2>薪资计算</h2>
            <p>{{ salaryPeriodLabel }}</p>
          </div>
          <div class="toolbar-actions">
            <el-segmented v-model="salaryPeriod" :options="periodOptions" @change="loadSalary" />
            <el-button :icon="ArrowLeft" circle @click="changeSalaryDate(-1)" />
            <el-date-picker v-model="salaryDate" type="date" value-format="YYYY-MM-DD" @change="loadSalary" style="width:140px" />
            <el-button :icon="ArrowRight" circle @click="changeSalaryDate(1)" />
          </div>
        </div>

        <el-card v-if="salaryData" shadow="never" class="tool-panel">
          <div class="lead-overview">
            <div class="lead-stat-card"><div class="lead-label">绩效基准</div><div class="lead-num">¥{{ salaryData.settings.perfUnit }}</div></div>
            <div class="lead-stat-card"><div class="lead-label">每单位绩效</div><div class="lead-num">¥{{ salaryData.settings.perfPerUnit }}</div></div>
            <div class="lead-stat-card"><div class="lead-label">绩效上限</div><div class="lead-num">¥{{ salaryData.settings.perfCap }}</div></div>
            <div class="lead-stat-card"><div class="lead-label">ROI阈值</div><div class="lead-num">{{ salaryData.settings.roiThreshold }}</div></div>
          </div>

          <el-table size="small" :data="salaryData.users" border class="data-table mt-12">
            <el-table-column prop="user" label="员工" min-width="100" />
            <el-table-column prop="totalGmv" label="总GMV" min-width="100"><template #default="{ row }">¥{{ fmt(row.totalGmv) }}</template></el-table-column>
            <el-table-column prop="totalRealGmv" label="真实GMV" min-width="100"><template #default="{ row }">¥{{ fmt(row.totalRealGmv) }}</template></el-table-column>
            <el-table-column prop="totalCost" label="总支出" min-width="100"><template #default="{ row }">¥{{ fmt(row.totalCost) }}</template></el-table-column>
            <el-table-column prop="profit" label="利润" min-width="100"><template #default="{ row }"><span :class="row.profit >= 0 ? 'success-text' : 'danger-text'">¥{{ fmt(row.profit) }}</span></template></el-table-column>
            <el-table-column prop="perfUnits" label="绩效单位" width="90" />
            <el-table-column prop="perf" label="绩效" min-width="90"><template #default="{ row }"><span class="salary-comm">¥{{ row.perf }}</span></template></el-table-column>
            <el-table-column prop="records" label="记录数" width="70" />
          </el-table>
        </el-card>
      </el-tab-pane>

      <!-- 产品管理 -->
      <el-tab-pane v-if="hasPerm('roiManage')" label="产品管理" name="products">
        <div class="toolbar">
          <div class="title-block"><h2>产品管理</h2><p>管理ROI登记的产品列表</p></div>
          <div class="toolbar-actions">
            <el-button type="primary" :icon="Plus" @click="openProductDialog()">添加产品</el-button>
          </div>
        </div>
        <div class="mobile-list">
          <article v-for="p in products" :key="p.id" class="customer-card">
            <div class="card-main">
              <img v-if="p.imageUrl" :src="p.imageUrl" class="roi-product-img-lg" />
              <strong>{{ p.name }}</strong>
              <el-tag size="small">#{{ p.id }}</el-tag>
            </div>
            <p class="muted-text">商品ID: {{ p.productId || '-' }}</p>
            <div class="card-foot">
              <span>{{ p.createdBy }}</span>
              <div>
                <el-button size="small" @click="openProductDialog(p)">编辑</el-button>
                <el-button size="small" type="danger" @click="removeProduct(p)">删除</el-button>
              </div>
            </div>
          </article>
        </div>
      </el-tab-pane>

      <!-- 设置 -->
      <el-tab-pane v-if="hasPerm('roiManage')" label="ROI设置" name="settings">
        <el-card shadow="never" class="tool-panel">
          <template #header><div class="panel-head"><strong>ROI参数设置</strong></div></template>
          <el-form label-position="top" style="max-width:480px">
            <el-form-item label="ROI阈值（低于此值标红）"><el-input-number v-model="roiSettings.roiThreshold" :min="0" :precision="1" :step="0.1" style="width:100%" /></el-form-item>
            <el-form-item label="绩效基准（真实GMV每多少元算1个单位）"><el-input-number v-model="roiSettings.perfUnit" :min="1000" :step="1000" style="width:100%" /></el-form-item>
            <el-form-item label="每单位绩效金额"><el-input-number v-model="roiSettings.perfPerUnit" :min="100" :step="100" style="width:100%" /></el-form-item>
            <el-form-item label="绩效上限"><el-input-number v-model="roiSettings.perfCap" :min="0" :step="500" style="width:100%" /></el-form-item>
            <el-button type="primary" :loading="savingSettings" @click="saveRoiSettings">保存设置</el-button>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <!-- 产品弹窗 -->
    <el-dialog v-model="productDialog" :title="editingProduct?.id ? '编辑产品' : '添加产品'" :width="isMobile ? '94%' : '480px'">
      <el-form label-position="top">
        <el-form-item label="产品名称"><el-input v-model="productForm.name" /></el-form-item>
        <el-form-item label="商品ID（可选）"><el-input v-model="productForm.productId" /></el-form-item>
        <el-form-item label="图片URL（可选）"><el-input v-model="productForm.imageUrl" placeholder="https://..." /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="productDialog = false">取消</el-button>
        <el-button type="primary" @click="saveProduct">保存</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft, ArrowRight, Download, Plus } from '@element-plus/icons-vue'
import { roiApi } from '../../services/api'
import { useResponsive } from '../../composables/useResponsive'

const props = defineProps({ user: Object, hasPerm: Function })
const { isMobile } = useResponsive()
const tab = ref('entry')
const products = ref([])
const selectedProduct = ref(0)
const entryDate = ref(today())
const entryForm = ref({ visitors: 0, buyers: 0, orders: 0, gmv: 0, patchOrders: 0, promoCost: 0, commission: 0, otherCost: 0 })
const saving = ref(false)
const dashboard = ref(null)
const dashboardPeriod = ref('day')
const dashboardDate = ref(today())
const showAll = ref(false)
const salaryData = ref(null)
const salaryPeriod = ref('month')
const salaryDate = ref(today())
const roiSettings = ref({ roiThreshold: 2.5, perfUnit: 50000, perfPerUnit: 1000, perfCap: 8000 })
const savingSettings = ref(false)
const productDialog = ref(false)
const editingProduct = ref(null)
const productForm = ref({ name: '', productId: '', imageUrl: '' })

const periodOptions = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' }
]

function hasPerm(p) { return props.hasPerm ? props.hasPerm(p) : false }
function today() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }
function fmt(n) { return (Math.round((Number(n) || 0) * 100) / 100).toLocaleString() }

const currentProductName = computed(() => products.value.find(p => p.id === selectedProduct.value)?.name || '')
const roiThreshold = computed(() => roiSettings.value.roiThreshold)
const periodLabel = computed(() => {
  if (!dashboard.value) return ''
  const r = dashboard.value.range
  return r.start === r.end ? r.start : `${r.start} ~ ${r.end}`
})
const salaryPeriodLabel = computed(() => {
  if (!salaryData.value) return ''
  const r = salaryData.value.range
  return r.start === r.end ? r.start : `${r.start} ~ ${r.end}`
})

const entryCalc = computed(() => {
  const f = entryForm.value
  const gmv = parseFloat(f.gmv) || 0
  const orders = parseInt(f.orders) || 0
  const patchOrders = parseInt(f.patchOrders) || 0
  const totalCost = (parseFloat(f.promoCost) || 0) + (parseFloat(f.commission) || 0) + (parseFloat(f.otherCost) || 0)
  const realGmv = gmv - patchOrders * (orders > 0 ? gmv / orders : 0)
  const realRoi = totalCost > 0 ? Math.round(realGmv / totalCost * 100) / 100 : 0
  const surfaceRoi = totalCost > 0 ? Math.round(gmv / totalCost * 100) / 100 : 0
  const patchRatio = orders > 0 ? Math.round(patchOrders / orders * 1000) / 10 : 0
  const convRate = (parseInt(f.visitors) || 0) > 0 ? Math.round((parseInt(f.buyers) || 0) / (parseInt(f.visitors) || 0) * 1000) / 10 : 0
  return { realGmv: Math.round(realGmv * 100) / 100, realRoi, surfaceRoi, patchRatio, convRate }
})

async function loadProducts() {
  try {
    const data = await roiApi.products()
    products.value = data.products || []
    if (!selectedProduct.value && products.value.length) selectedProduct.value = products.value[0].id
  } catch (err) { ElMessage.error(err.message || '加载产品失败') }
}

function selectProduct(id) {
  selectedProduct.value = id
  loadEntryData()
}

async function loadEntryData() {
  if (!selectedProduct.value) return
  try {
    const data = await roiApi.records({ date: entryDate.value, productId: selectedProduct.value, all: props.user?.isAdmin ? '1' : '' })
    const rec = (data.records || []).find(r => r.productId === selectedProduct.value && r.date === entryDate.value)
    if (rec) {
      entryForm.value = { visitors: rec.visitors, buyers: rec.buyers, orders: rec.orders, gmv: rec.gmv, patchOrders: rec.patchOrders, promoCost: rec.promoCost, commission: rec.commission, otherCost: rec.otherCost }
    } else {
      entryForm.value = { visitors: 0, buyers: 0, orders: 0, gmv: 0, patchOrders: 0, promoCost: 0, commission: 0, otherCost: 0 }
    }
  } catch (err) { ElMessage.error(err.message || '加载数据失败') }
}

function changeDate(delta) {
  const d = new Date(entryDate.value + 'T00:00:00')
  d.setDate(d.getDate() + delta)
  entryDate.value = today(d)
  loadEntryData()
}

async function saveEntry() {
  if (!hasPerm('roiEntry')) return ElMessage.warning('无录入权限')
  saving.value = true
  try {
    await roiApi.saveRecord({ date: entryDate.value, productId: selectedProduct.value, ...entryForm.value })
    ElMessage.success('数据已保存')
  } catch (err) { ElMessage.error(err.message || '保存失败') }
  finally { saving.value = false }
}

async function loadDashboard() {
  try {
    dashboard.value = await roiApi.dashboard(dashboardPeriod.value, dashboardDate.value, showAll.value && props.user?.isAdmin)
  } catch (err) { ElMessage.error(err.message || '加载看板失败') }
}

function changeDashboardDate(delta) {
  const d = new Date(dashboardDate.value + 'T00:00:00')
  const period = dashboardPeriod.value
  if (period === 'day') d.setDate(d.getDate() + delta)
  else if (period === 'week') d.setDate(d.getDate() + delta * 7)
  else d.setMonth(d.getMonth() + delta)
  dashboardDate.value = today(d)
  loadDashboard()
}

async function loadSalary() {
  try {
    salaryData.value = await roiApi.salary(salaryPeriod.value, salaryDate.value)
  } catch (err) { ElMessage.error(err.message || '加载薪资数据失败') }
}

function changeSalaryDate(delta) {
  const d = new Date(salaryDate.value + 'T00:00:00')
  const period = salaryPeriod.value
  if (period === 'day') d.setDate(d.getDate() + delta)
  else if (period === 'week') d.setDate(d.getDate() + delta * 7)
  else d.setMonth(d.getMonth() + delta)
  salaryDate.value = today(d)
  loadSalary()
}

async function loadRoiSettings() {
  try { roiSettings.value = await roiApi.settings() } catch (err) {}
}

async function saveRoiSettings() {
  savingSettings.value = true
  try {
    await roiApi.saveSettings(roiSettings.value)
    ElMessage.success('设置已保存')
  } catch (err) { ElMessage.error(err.message || '保存失败') }
  finally { savingSettings.value = false }
}

function openProductDialog(product) {
  editingProduct.value = product || null
  productForm.value = { name: product?.name || '', productId: product?.productId || '', imageUrl: product?.imageUrl || '' }
  productDialog.value = true
}

async function saveProduct() {
  if (!productForm.value.name.trim()) return ElMessage.warning('产品名称不能为空')
  try {
    if (editingProduct.value?.id) {
      await roiApi.updateProduct(editingProduct.value.id, productForm.value)
    } else {
      await roiApi.addProduct(productForm.value)
    }
    ElMessage.success('已保存')
    productDialog.value = false
    loadProducts()
  } catch (err) { ElMessage.error(err.message || '保存失败') }
}

async function removeProduct(p) {
  await ElMessageBox.confirm(`确定删除产品「${p.name}」？相关记录也会删除。`, '删除产品', { type: 'warning' })
  await roiApi.removeProduct(p.id)
  ElMessage.success('已删除')
  if (selectedProduct.value === p.id) selectedProduct.value = 0
  loadProducts()
}

function exportRoi() {
  const start = dashboard.value?.range?.start || today()
  const end = dashboard.value?.range?.end || today()
  window.open(`/api/roi/export?start=${start}&end=${end}`, '_blank')
}

watch(tab, (v) => {
  if (v === 'dashboard') loadDashboard()
  else if (v === 'salary') loadSalary()
  else if (v === 'products') loadProducts()
  else if (v === 'settings') loadRoiSettings()
})

onMounted(() => {
  loadProducts()
  loadRoiSettings()
  loadEntryData()
})
</script>

<style scoped>
.roi-page { padding: 0; }
.roi-product-bar { display: flex; gap: 8px; overflow-x: auto; padding: 8px 0; margin-bottom: 12px; }
.roi-product-chip { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border: 1px solid #e8e8e8; border-radius: 20px; background: #fff; cursor: pointer; white-space: nowrap; font-size: 13px; transition: all .15s; }
.roi-product-chip.active { border-color: var(--el-color-primary); background: var(--el-color-primary-light-9); color: var(--el-color-primary); }
.roi-product-chip:hover { border-color: var(--el-color-primary); }
.roi-product-img { width: 24px; height: 24px; border-radius: 4px; object-fit: cover; }
.roi-product-img-lg { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; margin-right: 8px; }
.roi-entry-form { max-width: 100%; }
.mt-12 { margin-top: 12px; }
</style>
