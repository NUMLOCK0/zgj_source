<template>
  <section class="commission-details-page">
    <div class="commission-rule-grid">
      <article class="commission-rule-card finance-rule-card"><span>财税提成规则</span><strong>有单号 ￥5.0 / 条 · 无单号 ￥2.0 / 条</strong><p>登记时录入有效电商订单号自动核算 5 元提成，未录入按 2 元基础核算。</p></article>
      <article class="commission-rule-card title-rule-card"><span>职称提成规则</span><strong>梯度留资率结算标准</strong><p>&lt;15%: ￥0&nbsp; | &nbsp;15%~24%: ￥1.5&nbsp; | &nbsp;25%~34%: ￥2.0&nbsp; | &nbsp;35%~44%: ￥3.0&nbsp; | &nbsp;≥45%: ￥4.0</p></article>
    </div>

    <section class="commission-panel">
      <div class="commission-panel-head"><h2>员工月度提成汇总（{{ month }}）</h2><div class="commission-month-actions"><el-date-picker v-model="month" type="month" value-format="YYYY-MM" size="small" /><el-button size="small" :loading="loading" @click="load">查询</el-button></div></div>
      <div v-if="!isMobile" v-loading="loading" class="commission-split-grid">
        <div class="commission-table-block"><el-table size="small" :data="users" stripe border class="commission-table" highlight-current-row :row-class-name="rowClass" @row-click="selectUser"><el-table-column prop="username" label="员工" min-width="170" /><el-table-column prop="totalConsults" label="总咨询" width="75" align="center" /><el-table-column prop="totalLeads" label="总留资" width="75" align="center" /><el-table-column label="留资率" width="85" align="center"><template #default="{ row }"><span class="commission-rate-pill">{{ row.avgRate || 0 }}%</span></template></el-table-column><el-table-column label="月提成" width="100" align="center"><template #default="{ row }"><strong class="commission-money">￥{{ money(row.totalCommission) }}</strong></template></el-table-column></el-table><el-empty v-if="!users.length && !loading" description="暂无月度提成数据" /></div>
        <div class="commission-table-block"><div class="commission-detail-title">【{{ selectedUser?.username || '员工' }}】的每日明细</div><el-table size="small" :data="selectedUser?.days || []" stripe border class="commission-table commission-days-table" max-height="340"><el-table-column prop="date" label="日期" width="105" /><el-table-column prop="consultCount" label="咨询" width="65" align="center" /><el-table-column prop="leadCount" label="留资" width="65" align="center" /><el-table-column label="留资率" width="75" align="center"><template #default="{ row }">{{ row.consultCount ? `${row.rate}%` : '—' }}</template></el-table-column><el-table-column label="提成" width="85" align="center"><template #default="{ row }"><span class="commission-money">{{ row.missing ? '未录入' : `￥${money(row.commission)}` }}</span></template></el-table-column></el-table><el-empty v-if="users.length && !(selectedUser?.days || []).length" description="暂无每日明细" /></div>
      </div>
      <div v-else class="commission-mobile-list"><article v-for="userItem in users" :key="userItem.rawUser || userItem.username" class="commission-mobile-user" :class="{ active: userItem === selectedUser }" @click="selectUser(userItem)"><div><strong>{{ userItem.username }}</strong><span>{{ userItem.totalConsults }} 咨询 · {{ userItem.totalLeads }} 留资</span></div><div><span>{{ userItem.avgRate || 0 }}%</span><strong class="commission-money">￥{{ money(userItem.totalCommission) }}</strong></div></article><article v-for="day in selectedUser?.days || []" :key="day.date" class="commission-mobile-day"><span>{{ day.date }}</span><span>咨询 {{ day.consultCount }} · 留资 {{ day.leadCount }}</span><strong class="commission-money">{{ day.missing ? '未录入' : `￥${money(day.commission)}` }}</strong></article><el-empty v-if="!users.length && !loading" description="暂无月度提成数据" /></div>
    </section>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { statsApi } from '../../services/api'
import { useResponsive } from '../../composables/useResponsive'

defineProps({ user: Object, hasPerm: Function })
const { isMobile } = useResponsive()
const month = ref(localMonth(new Date()))
const users = ref([])
const selectedIndex = ref(0)
const loading = ref(false)
const selectedUser = computed(() => users.value[selectedIndex.value])

function localMonth(value) { return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}` }
function money(value) { return Number(value || 0).toFixed(0) }
function rowClass({ row }) { return row === selectedUser.value ? 'commission-selected-row' : '' }
function selectUser(row) { selectedIndex.value = users.value.indexOf(row) }
async function load() {
  loading.value = true
  try {
    const data = await statsApi.salaryDetails(month.value)
    users.value = data.users || []
    selectedIndex.value = Math.min(selectedIndex.value, Math.max(users.value.length - 1, 0))
  } catch (error) { ElMessage.error(error.message || '加载提成明细失败') } finally { loading.value = false }
}
watch(month, load)
onMounted(load)
</script>
