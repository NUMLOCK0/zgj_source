<template>
  <section class="stack-page lead-page">
    <el-tabs v-model="tab" class="lead-tabs">
      <el-tab-pane label="日统计" name="day">
        <div class="toolbar stats-toolbar">
          <div class="title-block"><h2>留资统计</h2><p>{{ leadDateText }} 的留资量、咨询量和提成</p></div>
          <div class="toolbar-actions stats-date-controls">
            <el-button :icon="ArrowLeft" circle aria-label="前一天" title="前一天" @click="changeLeadDate(-1)" />
            <el-date-picker v-model="date" type="date" value-format="YYYY-MM-DD" @change="loadDay" />
            <el-button :icon="ArrowRight" circle aria-label="后一天" title="后一天" @click="changeLeadDate(1)" />
            <el-button v-if="hasPerm('editConsult')" class="stats-batch-consult" type="primary" @click="openBatchConsult">批量录入咨询量</el-button>
          </div>
        </div>

        <div class="lead-overview">
          <div class="lead-stat-card"><div class="lead-label">留资量</div><div class="lead-num">{{ overview.totalLeads }}</div><div class="lead-stat-note">当日新增客户</div></div>
          <div class="lead-stat-card"><div class="lead-label">总咨询量</div><div class="lead-num">{{ overview.totalConsult }}</div><div class="lead-stat-note">当日总咨询</div></div>
          <div class="lead-stat-card"><div class="lead-label">无效咨询</div><div class="lead-num">{{ overview.invalidConsult }}</div><div class="lead-stat-note">当日无效咨询</div></div>
          <div class="lead-stat-card"><div class="lead-label">意向咨询</div><div class="lead-num">{{ overview.intendedConsult }}</div><div class="lead-stat-note">总咨询量-无效咨询</div></div>
          <div class="lead-stat-card"><div class="lead-label">留资率</div><div class="lead-num">{{ overview.rate }}%</div><div class="metric-track"><i :style="{ width: Math.min(overview.rate, 100) + '%' }" /></div></div>
          <div class="lead-stat-card"><div class="lead-label">今日提成</div><div class="lead-num salary-comm">￥{{ overview.totalCommission.toFixed(1) }}</div><div class="lead-stat-note">按当日规则计算</div></div>
          <div class="lead-stat-card"><div class="lead-label">本月提成</div><div class="lead-num salary-comm">￥{{ monthCommission.toFixed(1) }}</div><div class="lead-stat-note">截至今日累计</div></div>
        </div>

        <div v-if="trendData.length && !isMobile" class="trend-chart">
          <h3>近7天留资趋势</h3>
          <svg viewBox="0 0 280 100" class="trend-svg" preserveAspectRatio="xMidYMid meet">
            <g v-for="(d, i) in trendData" :key="i">
              <rect :x="i * 38 + 6" :y="80 - barHeight(d.leads)" :width="28" :height="barHeight(d.leads)" :fill="d.leads > 0 ? '#07c160' : '#e8e8e8'" rx="3" />
              <text v-if="d.leads > 0" :x="i * 38 + 20" :y="76 - barHeight(d.leads)" text-anchor="middle" font-size="9" fill="#07c160" font-weight="600">{{ d.leads }}</text>
              <text :x="i * 38 + 20" y="94" text-anchor="middle" font-size="9" fill="#999">{{ d.label }}</text>
            </g>
          </svg>
        </div>


        <div v-if="!isMobile" class="stats-table-shell">
        <el-table :data="pagedDayStats" class="stats-table" border v-loading="dayLoading">
          <el-table-column prop="username" label="员工" />
          <el-table-column prop="consultCount" label="总咨询量">
            <template #default="{ row }">
              <el-input-number v-if="canEditDayConsult" :model-value="row.consultCount" :min="0" size="small" @change="v => saveConsult(row, v)" />
              <span v-else>{{ row.consultCount }}</span>
            </template>
          </el-table-column>
          <el-table-column label="无效咨询">
            <template #default="{ row }">
              <el-input-number v-if="canEditDayConsult" :model-value="row.invalidConsultCount || 0" :min="0" size="small" @change="v => saveInvalid(row, v)" />
              <span v-else>{{ row.invalidConsultCount || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="意向咨询">
            <template #default="{ row }"><span>{{ rowIntended(row) }}</span></template>
          </el-table-column>
          <el-table-column prop="leadCount" label="留资量" />
          <el-table-column label="留资率">
            <template #default="{ row }"><span>{{ rowIntended(row) > 0 ? rowRate(row) + '%' : '—' }}</span><div v-if="rowIntended(row) > 0" class="rate-bar-wrap"><div class="rate-bar-fill" :style="{ width: Math.min(rowRate(row), 100) + '%', background: getRateColor(rowRate(row)) }" /></div></template>
          </el-table-column>
          <el-table-column label="提成"><template #default="{ row }"><span v-html="commissionText(row)" /></template></el-table-column>
        </el-table>
        </div>
        <div v-else class="mobile-list">
          <article v-for="row in pagedDayStats" :key="row.rawUser || row.username" class="lead-mobile-card">
            <div class="lmc-row"><span class="lmc-label">员工</span><span class="lmc-val">{{ row.username }}</span></div>
            <div class="lmc-row"><span class="lmc-label">总咨询量</span><el-input-number v-if="canEditDayConsult" :model-value="row.consultCount" :min="0" size="small" @change="v => saveConsult(row, v)" /><span v-else class="lmc-val">{{ row.consultCount }}</span></div>
            <div class="lmc-row"><span class="lmc-label">无效咨询</span><el-input-number v-if="canEditDayConsult" :model-value="row.invalidConsultCount || 0" :min="0" size="small" @change="v => saveInvalid(row, v)" /><span v-else class="lmc-val">{{ row.invalidConsultCount || 0 }}</span></div>
            <div class="lmc-row"><span class="lmc-label">意向咨询</span><span class="lmc-val">{{ rowIntended(row) }}</span></div>
            <div class="lmc-row"><span class="lmc-label">留资量</span><span class="lmc-val success-text">{{ row.leadCount }}</span></div>
            <div class="lmc-row"><span class="lmc-label">留资率</span><span class="lmc-val">{{ rowIntended(row) > 0 ? rowRate(row) + '%' : '—' }}</span></div>
            <div class="lmc-commission" v-html="commissionText(row, true)" />
          </article>
        </div>
        <el-pagination v-model:current-page="dayPage" v-model:page-size="dayPageSize" layout="total, sizes, prev, pager, next" :page-sizes="pageSizes" :total="dayStats.length" background class="pager" />
      </el-tab-pane>

      <el-tab-pane label="排行榜" name="rank">
        <div class="toolbar stats-toolbar">
          <div class="title-block"><h2>排行榜</h2><p>按时间范围汇总留资表现</p></div>
          <el-segmented v-model="rankRange" :options="rankOptions" @change="loadSummary" />
        </div>
        <div v-if="!isMobile" class="stats-table-shell">
        <el-table :data="pagedSummary" class="stats-table" border>
          <el-table-column label="排名" width="80"><template #default="{ $index }">{{ rankIcon((rankPage - 1) * rankPageSize + $index) }}</template></el-table-column>
          <el-table-column prop="username" label="员工" />
          <el-table-column prop="leadCount" label="留资量" />
          <el-table-column prop="consultCount" label="总咨询量" />
          <el-table-column label="无效咨询"><template #default="{ row }">{{ row.invalidConsultCount || 0 }}</template></el-table-column>
          <el-table-column label="意向咨询"><template #default="{ row }">{{ rowIntended(row) }}</template></el-table-column>
          <el-table-column label="平均留资率"><template #default="{ row }"><span class="success-text">{{ rowIntended(row) > 0 ? rowRate(row) + '%' : '—' }}</span><div v-if="rowIntended(row) > 0" class="rate-bar-wrap"><div class="rate-bar-fill" :style="{ width: Math.min(rowRate(row), 100) + '%', background: getRateColor(rowRate(row)) }" /></div></template></el-table-column>
          <el-table-column label="提成"><template #default="{ row }"><span v-if="showRankCommission(row)" class="commission-tag">￥{{ Number(row.totalCommission || 0).toFixed(1) }}</span><span v-else class="muted-text">—</span></template></el-table-column>
        </el-table>
        </div>
        <div v-else class="mobile-list">
          <article v-for="(row, index) in pagedSummary" :key="row._rawUser || row.username" class="lead-mobile-card">
            <div class="lmc-row"><span class="lmc-val rank-title">{{ rankIcon((rankPage - 1) * rankPageSize + index) }} {{ row.username }}</span></div>
            <div class="lmc-row"><span class="lmc-label">留资量</span><span class="lmc-val success-text">{{ row.leadCount }}</span></div>
            <div class="lmc-row"><span class="lmc-label">总咨询量</span><span class="lmc-val">{{ row.consultCount }}</span></div>
            <div class="lmc-row"><span class="lmc-label">无效咨询</span><span class="lmc-val">{{ row.invalidConsultCount || 0 }}</span></div>
            <div class="lmc-row"><span class="lmc-label">意向咨询</span><span class="lmc-val">{{ rowIntended(row) }}</span></div>
            <div class="lmc-row"><span class="lmc-label">留资率</span><span class="lmc-val success-text">{{ rowIntended(row) > 0 ? rowRate(row) + '%' : '—' }}</span></div>
            <div v-if="showRankCommission(row)" class="lmc-row lmc-commission"><span class="lmc-label">提成</span><span class="lmc-val">￥{{ Number(row.totalCommission || 0).toFixed(1) }}</span></div>
          </article>
        </div>
        <el-pagination v-model:current-page="rankPage" v-model:page-size="rankPageSize" layout="total, sizes, prev, pager, next" :page-sizes="pageSizes" :total="summary.length" background class="pager" />
      </el-tab-pane>

      <el-tab-pane label="提成表" name="salary">
        <div class="toolbar stats-toolbar">
          <div class="title-block"><h2>提成表</h2><p>{{ salaryMonthText }} 月度按日提成明细</p></div>
          <div class="toolbar-actions stats-date-controls">
            <el-button :icon="ArrowLeft" circle aria-label="上月" title="上月" @click="changeSalaryMonth(-1)" />
            <el-date-picker v-model="month" type="month" value-format="YYYY-MM" @change="loadSalary" />
            <el-button :icon="ArrowRight" circle aria-label="下月" title="下月" @click="changeSalaryMonth(1)" />
            <el-button class="stats-toolbar-action" type="primary" @click="exportSalary">导出提成表</el-button>
          </div>
        </div>
        <div class="salary-layout">
          <div class="salary-table-block">
            <div class="salary-table-title">员工月度汇总</div>
            <el-table :data="pagedSalaryUsers" border class="salary-users" @row-click="selectSalaryUser" :row-class-name="salaryRowClass">
              <el-table-column prop="username" label="员工" />
              <el-table-column prop="totalConsults" label="咨询" />
              <el-table-column prop="totalLeads" label="留资" />
              <el-table-column label="留资率"><template #default="{ row }">{{ row.avgRate > 0 ? row.avgRate + '%' : '—' }}</template></el-table-column>
              <el-table-column label="提成"><template #default="{ row }"><span class="salary-comm">￥{{ Number(row.totalCommission || 0).toFixed(1) }}</span></template></el-table-column>
              <el-table-column prop="activeDays" label="录入天数" />
              <el-table-column label="缺失"><template #default="{ row }"><span :class="{ 'salary-missing': row.missingDays > 0 }">{{ row.missingDays || 0 }}天</span></template></el-table-column>
            </el-table>
            <el-pagination v-model:current-page="salaryPage" v-model:page-size="salaryPageSize" layout="total, sizes, prev, pager, next" :page-sizes="pageSizes" :total="salaryUsers.length" background class="pager" />
          </div>
          <div class="salary-table-block">
            <div class="salary-table-title">{{ selectedSalaryUser?.username || '员工' }} 的每日明细</div>
            <el-table :data="pagedSalaryDays" border class="salary-days">
              <el-table-column label="日期"><template #default="{ row }">{{ row.date?.slice(5) }}</template></el-table-column>
              <el-table-column prop="weekday" label="星期" />
              <el-table-column prop="consultCount" label="咨询" />
              <el-table-column prop="leadCount" label="留资" />
              <el-table-column label="留资率"><template #default="{ row }">{{ row.consultCount ? row.rate + '%' : '—' }}</template></el-table-column>
              <el-table-column label="单价"><template #default="{ row }">{{ row.unitPrice > 0 ? row.unitPrice + '元' : '—' }}</template></el-table-column>
              <el-table-column label="提成"><template #default="{ row }"><span v-if="row.missing" class="salary-missing">未录入</span><span v-else class="salary-comm">￥{{ Number(row.commission || 0).toFixed(1) }}</span></template></el-table-column>
            </el-table>
            <el-pagination v-model:current-page="salaryDayPage" v-model:page-size="salaryDayPageSize" layout="total, sizes, prev, pager, next" :page-sizes="pageSizes" :total="selectedSalaryUser?.days?.length || 0" background class="pager" />
          </div>
        </div>
        <section class="tier-standard">
          <div class="tier-standard-head">
            <div>
              <h3>提成阶梯标准</h3>
              <p>留资率 = 留资量 / 意向咨询，按日独立计算，月提成为每日提成之和。</p>
            </div>
          </div>
          <div class="tier-grid">
            <div v-for="tier in commissionTiers" :key="tier.rate" class="tier-item" :class="{ active: tier.price > 0 }">
              <span>{{ tier.rate }}</span>
              <strong>{{ tier.price > 0 ? `￥${tier.price}/条` : '无提成' }}</strong>
            </div>
          </div>
        </section>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="batchVisible" title="批量录入咨询量" :width="isMobile ? '90%' : '520px'">
      <el-form label-position="top">
        <el-form-item label="员工">
          <el-select v-model="batchForm.username" filterable placeholder="选择员工">
            <el-option v-for="u in userOptions" :key="u.username" :label="`${u.name || u.username} (${u.username})`" :value="u.username" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围"><el-date-picker v-model="batchForm.range" type="daterange" value-format="YYYY-MM-DD" /></el-form-item>
        <el-form-item label="每日总咨询量"><el-input-number v-model="batchForm.count" :min="0" /></el-form-item>
        <el-form-item label="每日无效咨询"><el-input-number v-model="batchForm.invalidCount" :min="0" /></el-form-item>
      </el-form>
      <template #footer><el-button @click="batchVisible = false">取消</el-button><el-button type="primary" @click="saveBatchConsult">确认录入</el-button></template>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { statsApi, userApi } from '../../services/api'
import { useResponsive } from '../../composables/useResponsive'

const props = defineProps({ user: Object, hasPerm: Function })
const { isMobile } = useResponsive()
const tab = ref('day')
const date = ref(localDate(new Date()))
const rankRange = ref('today')
const month = ref(localDate(new Date()).slice(0, 7))
const dayStats = ref([])
const dayLoading = ref(false)
const trendData = ref([])
const summary = ref([])
const salaryUsers = ref([])
const pageSizes = [10, 20, 50, 100]
const dayPage = ref(1)
const dayPageSize = ref(20)
const rankPage = ref(1)
const rankPageSize = ref(20)
const salaryPage = ref(1)
const salaryPageSize = ref(20)
const salaryDayPage = ref(1)
const salaryDayPageSize = ref(20)
const selectedIndex = ref(0)
const monthCommission = ref(0)
const batchVisible = ref(false)
const batchForm = ref({ username: '', range: [date.value, date.value], count: 0, invalidCount: 0 })
const userOptions = ref([])
const rankOptions = [
  { label: '今日', value: 'today' },
  { label: '近7天', value: '7' },
  { label: '近30天', value: '30' },
  { label: '本月', value: 'month' }
]
const commissionTiers = [
  { rate: '低于 55%', price: 0 },
  { rate: '55% - 59%', price: 1 },
  { rate: '60% - 64%', price: 2 },
  { rate: '65% - 69%', price: 2.5 },
  { rate: '70% - 74%', price: 3 },
  { rate: '75% - 79%', price: 4 },
  { rate: '80% 及以上', price: 5 }
]

function hasPerm(perm) { return props.hasPerm ? props.hasPerm(perm) : false }
function localDate(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
const selectedSalaryUser = computed(() => salaryUsers.value[selectedIndex.value])
const pagedDayStats = computed(() => dayStats.value.slice((dayPage.value - 1) * dayPageSize.value, dayPage.value * dayPageSize.value))
const pagedSummary = computed(() => summary.value.slice((rankPage.value - 1) * rankPageSize.value, rankPage.value * rankPageSize.value))
const pagedSalaryUsers = computed(() => salaryUsers.value.slice((salaryPage.value - 1) * salaryPageSize.value, salaryPage.value * salaryPageSize.value))
const pagedSalaryDays = computed(() => {
  const days = selectedSalaryUser.value?.days || []
  return days.slice((salaryDayPage.value - 1) * salaryDayPageSize.value, salaryDayPage.value * salaryDayPageSize.value)
})
const leadDateText = computed(() => {
  const d = new Date(date.value + 'T00:00:00')
  const label = `${d.getMonth() + 1}月${d.getDate()}日`
  return date.value === localDate(new Date()) ? `今天 ${label}` : label
})
const salaryMonthText = computed(() => {
  const [y, m] = month.value.split('-')
  return `${y}年${Number(m)}月`
})

function rowIntended(row) {
  return Math.max(0, Number(row.consultCount || 0) - Number(row.invalidConsultCount || 0))
}
function rowRate(row) {
  const intended = rowIntended(row)
  return intended > 0 ? Math.round(Number(row.leadCount || 0) / intended * 1000) / 10 : 0
}

const overview = computed(() => {
  const totalLeads = dayStats.value.reduce((sum, s) => sum + Number(s.leadCount || 0), 0)
  const totalConsult = dayStats.value.reduce((sum, s) => sum + Number(s.consultCount || 0), 0)
  const invalidConsult = dayStats.value.reduce((sum, s) => sum + Number(s.invalidConsultCount || 0), 0)
  const intendedConsult = totalConsult - invalidConsult
  const totalCommission = dayStats.value.reduce((sum, s) => sum + Number(s.commission || 0), 0)
  return { totalLeads, totalConsult, invalidConsult, intendedConsult, totalCommission, rate: intendedConsult > 0 ? Math.round(totalLeads / intendedConsult * 1000) / 10 : 0 }
})
const canEditDayConsult = computed(() => props.user?.isAdmin || (hasPerm('editConsult') && date.value === localDate(new Date())))

async function loadDay() {
  dayLoading.value = true
  try {
    const data = await statsApi.leadDay(date.value)
    dayStats.value = data.stats || []
    dayPage.value = 1
    loadMonthCommission()
  } finally {
    dayLoading.value = false
  }
}

async function loadTrend() {
  const days = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const ds = localDate(d)
    days.push({ date: ds, label: (d.getMonth()+1) + '/' + d.getDate(), leads: 0 })
  }
  try {
    const results = await Promise.all(days.map(d => statsApi.leadDay(d.date).catch(() => ({ stats: [] }))))
    results.forEach((data, i) => {
      days[i].leads = (data.stats || []).reduce((s, r) => s + Number(r.leadCount || 0), 0)
    })
  } catch (e) {}
  trendData.value = days
}

function barHeight(leads) {
  const maxLeads = Math.max(...trendData.value.map(d => d.leads), 1)
  return Math.max(2, (leads / maxLeads) * 60)
}

async function loadMonthCommission() {
  const now = new Date()
  const start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
  const data = await statsApi.leadSummary(start, localDate(now)).catch(() => ({ myCommission: 0 }))
  monthCommission.value = data.myCommission || 0
}

async function saveConsult(row, count) {
  try {
    await statsApi.saveConsult({ date: date.value, username: row.rawUser || row.username, consultCount: Number(count) || 0 })
    ElMessage.success('咨询量已保存')
    loadDay()
  } catch (err) {
    ElMessage.error(err.message || '保存失败')
  }
}

async function saveInvalid(row, count) {
  try {
    await statsApi.saveConsult({ date: date.value, username: row.rawUser || row.username, consultCount: row.consultCount || 0, invalidConsultCount: Number(count) || 0 })
    ElMessage.success('无效咨询已保存')
    loadDay()
  } catch (err) {
    ElMessage.error(err.message || '保存失败')
  }
}

function changeLeadDate(delta) {
  const d = new Date(date.value + 'T00:00:00')
  d.setDate(d.getDate() + delta)
  date.value = localDate(d)
  loadDay()
}

function rankRangeDates() {
  const end = localDate(new Date())
  if (rankRange.value === 'today') return [end, end]
  if (rankRange.value === 'month') {
    const now = new Date()
    return [`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`, end]
  }
  const start = new Date()
  start.setDate(start.getDate() - Number(rankRange.value) + 1)
  return [localDate(start), end]
}

async function loadSummary() {
  const [start, end] = rankRangeDates()
  const data = await statsApi.leadSummary(start, end)
  summary.value = data.summary || []
  rankPage.value = 1
}

async function loadSalary() {
  const data = await statsApi.salaryDetails(month.value)
  salaryUsers.value = data.users || []
  selectedIndex.value = salaryUsers.value.length ? 0 : -1
  salaryPage.value = 1
  salaryDayPage.value = 1
}

function changeSalaryMonth(delta) {
  const [y, m] = month.value.split('-').map(Number)
  const d = new Date(y, m - 1 + delta, 1)
  month.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  loadSalary()
}

function selectSalaryUser(row) {
  selectedIndex.value = salaryUsers.value.indexOf(row)
  salaryDayPage.value = 1
}

function salaryRowClass({ row }) {
  return row === selectedSalaryUser.value ? 'salary-row-selected' : ''
}

function exportSalary() {
  window.open(`/api/salary/export?month=${encodeURIComponent(month.value)}`, '_blank')
}

function getRateColor(rate) {
  if (rate >= 80) return '#07c160'
  if (rate >= 70) return '#1aad5a'
  if (rate >= 60) return '#52c41a'
  if (rate >= 50) return '#faad14'
  return '#ff4d4f'
}

function commissionText(row, mobile = false) {
  if (row.commission > 0) return `${mobile ? '提成: ' : ''}<span class="commission-tag">￥${row.commission}</span>`
  if (row.leadCount === 0) return `${mobile ? '提成: ' : ''}<span class="muted-text">￥0（无留资）</span>`
  if (row.consultCount === 0) return `${mobile ? '提成: ' : ''}<span class="muted-text">￥0（无咨询量）</span>`
  return `${mobile ? '提成: ' : ''}<span class="muted-text">￥0（率${row.rate}%&lt;55%）</span>`
}

function rankIcon(index) {
  return index === 0 ? '①' : index === 1 ? '②' : index === 2 ? '③' : index + 1
}

function showRankCommission(row) {
  return row.totalCommission !== undefined && row.totalCommission !== null
}

async function openBatchConsult() {
  batchForm.value = { username: props.user?.username || '', range: [localDate(new Date()), localDate(new Date())], count: 0, invalidCount: 0 }
  if (props.user?.isAdmin) {
    const data = await userApi.list().catch(() => ({ users: [] }))
    userOptions.value = data.users || []
  } else {
    userOptions.value = [props.user]
  }
  batchVisible.value = true
}

function datesBetween(start, end) {
  const dates = []
  const current = new Date(start + 'T00:00:00')
  const last = new Date(end + 'T00:00:00')
  while (current <= last) {
    dates.push(localDate(current))
    current.setDate(current.getDate() + 1)
  }
  return dates
}

async function saveBatchConsult() {
  if (!batchForm.value.username) return ElMessage.warning('请选择员工')
  if (!batchForm.value.range || batchForm.value.range.length !== 2) return ElMessage.warning('请选择日期范围')
  if (batchForm.value.range[0] > batchForm.value.range[1]) return ElMessage.warning('开始日期不能晚于结束日期')
  const entries = datesBetween(batchForm.value.range[0], batchForm.value.range[1]).map(d => ({ date: d, username: batchForm.value.username, consultCount: Number(batchForm.value.count) || 0, invalidConsultCount: Number(batchForm.value.invalidCount) || 0 }))
  const data = await statsApi.batchConsult(entries)
  ElMessage.success(`已录入 ${data.saved || entries.length} 条`)
  batchVisible.value = false
  loadDay()
  loadSummary()
  loadSalary()
}

watch(tab, value => { if (value === 'rank') loadSummary(); if (value === 'salary') loadSalary() })
watch([dayPageSize, rankPageSize, salaryPageSize, salaryDayPageSize], () => {
  dayPage.value = 1
  rankPage.value = 1
  salaryPage.value = 1
  salaryDayPage.value = 1
})
onMounted(() => {
  loadDay()
  loadSummary()
  loadSalary()
  loadTrend()
})
</script>
