<template>
  <div class="dash-container" :class="{ 'is-mobile': isMobile }">
    <div v-if="isMobile" class="m-dash-sticky-bar">
      <div class="m-dash-top-left">
        <span class="app-m-logo-dot" />
        <strong class="m-dash-title">数据工作台</strong>
        <span class="m-dash-date-pill">{{ rangeText }}</span>
      </div>
      <el-button circle :loading="loading" title="刷新数据" @click="loadDashboard"><el-icon><Refresh /></el-icon></el-button>
    </div>

    <div v-else class="dash-compact-header-bar">
      <div class="dash-bar-left">
        <h1 class="dash-main-title">数据看板</h1>
        <div class="quick-date-bar">
          <button v-for="item in quickRanges" :key="item.key" type="button" :class="{ active: quickRange === item.key }" @click="setQuickRange(item.key)">{{ item.label }}</button>
          <el-date-picker v-model="dateRange" type="daterange" value-format="YYYY-MM-DD" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small" @change="onCustomRange" />
        </div>
      </div>
      <div class="dash-bar-right"><el-button :loading="loading" :icon="Refresh" size="small" @click="loadDashboard">刷新数据</el-button></div>
    </div>

    <div class="scope-nav-segment-bar" :class="{ 'm-segment-bar': isMobile }">
      <button type="button" class="scope-seg-btn" :class="{ active: scope === 'all' }" @click="scope = 'all'"><span>{{ isMobile ? '全盘总览' : '综合全盘大屏' }}</span></button>
      <button type="button" class="scope-seg-btn" :class="{ active: scope === 'zc' }" @click="scope = 'zc'"><span>{{ isMobile ? '职称业务' : '职称业务中心' }}</span></button>
      <button type="button" class="scope-seg-btn" :class="{ active: scope === 'fn' }" @click="scope = 'fn'"><span>{{ isMobile ? '财税业务' : '财税业务中心' }}</span></button>
      <button type="button" class="scope-seg-btn" :class="{ active: scope === 'journal' }" @click="scope = 'journal'"><span>{{ isMobile ? '期刊业务' : '期刊业务中心' }}</span></button>
      <button type="button" class="scope-seg-btn" :class="{ active: scope === 'salary' }" @click="openSalary"><span>{{ isMobile ? '提成表' : '提成表与明细' }}</span></button>
    </div>

    <template v-if="scope === 'all'">
      <div v-if="isMobile" class="m-hero-dashboard-card">
        <div class="m-card-duo-row">
          <div class="m-duo-col"><span class="m-col-label">今日总留资</span><strong class="m-col-val text-brand">{{ overview.totalLeads }}<small> 条</small></strong><span class="m-col-sub">职称 {{ overview.zcLeads }} · 财税 {{ overview.fnLeads }}</span></div>
          <span class="m-duo-divider" />
          <div class="m-duo-col"><span class="m-col-label">今日总提成</span><strong class="m-col-val text-red">￥{{ money(overview.todayCommission) }}</strong><span class="m-col-sub">月预估 ￥{{ money(monthEstimate) }}</span></div>
        </div>
        <div class="m-card-funnel-strip"><span>客流: <strong>{{ overview.totalConsult }}</strong></span><span class="m-sep">·</span><span>意向: <strong>{{ overview.intendedConsult }}</strong></span><span class="m-sep">·</span><span>转化: <strong class="text-brand">{{ overview.rate }}%</strong></span></div>
      </div>

      <div v-else class="stat-cards-grid-4">
        <div class="metric-box bg-emerald"><div class="m-head-flex"><span class="m-label">全盘总留资战果</span><span class="growth-tag" :class="overview.leadGrowth >= 0 ? 'up' : 'down'">{{ overview.leadGrowth >= 0 ? '↑ +' : '↓ ' }}{{ overview.leadGrowth }}%</span></div><div class="m-num">{{ overview.totalLeads }} <span class="unit">条</span></div><div class="m-sub-detail">职称 {{ overview.zcLeads }} 条 <span class="sub-sep">·</span> 财税 {{ overview.fnLeads }} 条</div></div>
        <div class="metric-box bg-green-light"><div class="m-head-flex"><span class="m-label">今日预估提成支出</span><span class="badge-pill">实时成本</span></div><div class="m-num text-green">￥{{ money(overview.todayCommission) }}</div><div class="m-sub-detail">财税 ￥{{ money(overview.fnComm) }} <span class="sub-sep">·</span> 职称 ￥{{ money(overview.zcComm) }}</div></div>
        <div class="metric-box bg-amber-light"><div class="m-head-flex"><span class="m-label">全渠道客流与意向</span><span class="badge-pill">总客流 {{ overview.totalConsult }} 人</span></div><div class="m-num text-orange">{{ overview.rate }}<span class="unit">%</span></div><div class="m-sub-detail">意向客 {{ overview.intendedConsult }} 人 <span class="sub-sep">·</span> 无效客 {{ overview.invalidConsult }} 人</div></div>
        <div class="metric-box bg-amber"><div class="m-head-flex"><span class="m-label">团队人效分析</span><span class="badge-pill">上岗 {{ rows.length }} 人</span></div><div class="m-num text-red">{{ overview.avgLeads }} <span class="unit">条/人</span></div><div class="m-sub-detail">人均提成 ￥{{ overview.avgCommission }}</div></div>
      </div>

      <div class="section-title-bar"><h3>客服留资明细与战报（{{ rangeText }}）</h3></div>

      <div v-if="isMobile" class="m-mobile-card-flow">
        <article v-for="row in rows" :key="row.rawUser || row.username" class="m-staff-card-v2">
          <div class="m-card-top-line"><div class="m-staff-name-wrap"><span class="m-avatar-badge">{{ (row.username || '员')[0] }}</span><strong class="m-name">{{ row.username }}</strong></div><span class="m-comm-badge">提成 <strong>￥{{ money(row.commission) }}</strong></span></div>
          <div class="m-funnel-data-box"><div class="m-f-item"><span class="lbl">总留资</span><strong class="val text-green">{{ row.leadCount }} 条</strong></div><div class="m-f-item"><span class="lbl">客流/意向</span><span class="val">{{ row.consultCount }} / {{ row.effectiveConsultCount }}</span></div><div class="m-f-item"><span class="lbl">意向率</span><span class="val rate-pill" :class="row.rate >= 30 ? 'high' : 'mid'">{{ row.rate }}%</span></div></div>
          <div class="m-breakdown-sub">职称：{{ row.zcLeadCount }} 条 · 财税：{{ row.fnLeadCount }} 条（5元：{{ row.orderCount }} · 2元：{{ row.noOrderCount }}）</div>
        </article>
        <el-empty v-if="!rows.length" description="暂无留资记录" :image-size="40" />
      </div>

      <el-card v-else shadow="never" class="matrix-card modern-panel">
        <template #header><strong class="matrix-main-title">客服留资明细与战报</strong></template>
        <el-table size="small" :data="rows" stripe border class="matrix-table">
          <el-table-column label="员工姓名" min-width="130"><template #default="{ row }"><div class="user-identity-cell"><span class="user-avatar-tag">{{ (row.username || '员')[0] }}</span><span class="u-name">{{ row.username }}</span></div></template></el-table-column>
          <el-table-column label="客流漏斗（咨询 · 无效 · 意向）" min-width="220" align="center"><template #default="{ row }"><div class="funnel-text-wrap">总客流 {{ row.consultCount }} · 无效 {{ row.invalidConsultCount }} · <span class="text-brand">意向 {{ row.effectiveConsultCount }}</span></div></template></el-table-column>
          <el-table-column label="留资成果（职称 / 财税）" min-width="180" align="center"><template #default="{ row }"><div class="leads-result-box"><div class="leads-total"><strong>{{ row.leadCount }}</strong><small> 条</small></div><div class="leads-breakdown"><span class="zc-sub-pill">职称 {{ row.zcLeadCount }}</span><span class="fn-sub-pill">财税 {{ row.fnLeadCount }}</span></div></div></template></el-table-column>
          <el-table-column prop="rate" label="意向留资率" width="115" align="center"><template #default="{ row }"><span class="rate-badge" :class="row.rate >= 30 ? 'high' : row.rate >= 15 ? 'mid' : 'low'">{{ row.rate }}%</span></template></el-table-column>
          <el-table-column label="今日总提成" width="130" align="center"><template #default="{ row }"><span class="comm-num">￥{{ money(row.commission) }}</span></template></el-table-column>
        </el-table>
        <el-empty v-if="!rows.length" description="暂无留资记录" :image-size="40" />
      </el-card>

      <div class="dash-bottom-grid">
        <el-card shadow="never" class="modern-panel">
          <template #header><div class="panel-head-flex"><strong>各店铺留资分布</strong></div></template>
          <div v-if="storeDistribution.length" class="store-flow-list"><div v-for="item in storeDistribution" :key="item.name"><div class="s-info-row"><span>{{ item.name }}</span><span class="s-val-pill">{{ item.count }} 条</span></div><div class="s-bar-track"><div class="s-bar-active" :style="{ width: storePercent(item.count) + '%' }" /></div></div></div>
          <el-empty v-else description="今日暂无店铺留资记录" :image-size="40" />
        </el-card>
        <el-card shadow="never" class="modern-panel">
          <template #header><div class="panel-head-flex"><strong>近 15 天留资走势</strong><div class="trend-legend-pill"><span class="leg-item"><i class="leg-dot bg-zc" /> 职称</span><span class="leg-item"><i class="leg-dot bg-fn" /> 财税</span></div></div></template>
          <div class="trend-svg-stage"><div v-for="day in trendDays" :key="day.fullDate" class="trend-col-card"><span class="trend-count-hint">{{ day.total }}</span><div class="trend-pill-track"><div class="bar-slice-zc" :style="{ height: trendHeight(day.zcCount) + 'px' }" /><div class="bar-slice-fn" :style="{ height: trendHeight(day.fnCount) + 'px' }" /></div><span class="trend-date-label">{{ day.date }}</span></div></div>
        </el-card>
      </div>
    </template>

    <template v-else-if="scope === 'zc'"><TitleBusinessCenter :user="user" :has-perm="hasPerm" /></template>
    <template v-else-if="scope === 'fn'"><FinanceBusinessCenter :user="user" :has-perm="hasPerm" @registered="loadDashboard" /></template>
    <JournalBusinessView v-else-if="scope === 'journal'" :user="user" :has-perm="hasPerm" />

    <CommissionDetailsView v-else :user="user" :has-perm="hasPerm" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import { dashboardApi, financeStatsApi, statsApi } from '../services/api'
import { useResponsive } from '../composables/useResponsive'
import CustomerManageView from './CustomerManageView.vue'
import FinanceBusinessCenter from './panels/FinanceBusinessCenter.vue'
import JournalBusinessView from './JournalBusinessView.vue'
import CommissionDetailsView from './panels/CommissionDetailsView.vue'
import TitleBusinessCenter from './panels/TitleBusinessCenter.vue'

defineProps({ user: Object, hasPerm: Function })
const { isMobile } = useResponsive()
const loading = ref(false)
const scope = ref('all')
const quickRange = ref('today')
const dateRange = ref([localDate(new Date()), localDate(new Date())])
const dashboard = ref({ overview: {}, storeDistribution: [], trendDays: [] })
const rows = ref([])
const quickRanges = [{ key: 'today', label: '今日' }, { key: 'yesterday', label: '昨日' }, { key: '7', label: '7天' }, { key: '15', label: '15天' }]

const storeDistribution = computed(() => dashboard.value.storeDistribution || [])
const trendDays = computed(() => dashboard.value.trendDays || [])
const rangeText = computed(() => dateRange.value[0] === dateRange.value[1] ? dateRange.value[0] : dateRange.value.join(' 至 '))
const monthEstimate = computed(() => Number(overview.value.todayCommission || 0) * 12)
const overview = computed(() => {
  const totalLeads = rows.value.reduce((sum, row) => sum + Number(row.leadCount || 0), 0)
  const zcLeads = rows.value.reduce((sum, row) => sum + Number(row.zcLeadCount || 0), 0)
  const fnLeads = rows.value.reduce((sum, row) => sum + Number(row.fnLeadCount || 0), 0)
  const totalConsult = rows.value.reduce((sum, row) => sum + Number(row.consultCount || 0), 0)
  const invalidConsult = rows.value.reduce((sum, row) => sum + Number(row.invalidConsultCount || 0), 0)
  const intendedConsult = Math.max(0, totalConsult - invalidConsult)
  const todayCommission = rows.value.reduce((sum, row) => sum + Number(row.commission || 0), 0)
  const count = Math.max(rows.value.length, 1)
  return { totalLeads, zcLeads, fnLeads, totalConsult, invalidConsult, intendedConsult, todayCommission, zcComm: rows.value.reduce((s, r) => s + Number(r.zcComm || 0), 0), fnComm: rows.value.reduce((s, r) => s + Number(r.fnComm || 0), 0), orderCount: rows.value.reduce((s, r) => s + Number(r.orderCount || 0), 0), noOrderCount: rows.value.reduce((s, r) => s + Number(r.noOrderCount || 0), 0), rate: intendedConsult ? Math.round(totalLeads / intendedConsult * 1000) / 10 : 0, avgLeads: (totalLeads / count).toFixed(1), avgCommission: (todayCommission / count).toFixed(1), leadGrowth: dashboard.value.overview?.leadGrowth || 0 }
})

function localDate(date) { return date.toISOString().slice(0, 10) }
function money(value) { return Number(value || 0).toFixed(1) }
function daysAgo(count) { const date = new Date(); date.setDate(date.getDate() - count); return localDate(date) }
function setQuickRange(key) { quickRange.value = key; if (key === 'today') dateRange.value = [localDate(new Date()), localDate(new Date())]; if (key === 'yesterday') dateRange.value = [daysAgo(1), daysAgo(1)]; if (key === '7') dateRange.value = [daysAgo(6), localDate(new Date())]; if (key === '15') dateRange.value = [daysAgo(14), localDate(new Date())]; loadDashboard() }
function onCustomRange(value) { if (value?.length === 2) { quickRange.value = 'custom'; loadDashboard() } }
function normalizeRows(zcData, fnData) {
  const map = new Map()
  const put = (item, type) => {
    const rawUser = item._rawUser || item.rawUser || item.username || '未知员工'
    const row = map.get(rawUser) || { username: item.username || rawUser, rawUser, zcConsultCount: 0, zcInvalidConsult: 0, zcLeadCount: 0, zcComm: 0, fnConsultCount: 0, fnInvalidConsult: 0, fnLeadCount: 0, fnComm: 0, orderCount: 0, noOrderCount: 0 }
    const consult = Number(item.consultCount || 0)
    const invalid = Number(item.invalidConsultCount || 0)
    const leads = Number(item.leadCount || 0)
    const commission = Number(item.totalCommission ?? item.commission ?? 0)
    if (type === 'zc') Object.assign(row, { zcConsultCount: consult, zcInvalidConsult: invalid, zcLeadCount: leads, zcComm: commission })
    else Object.assign(row, { fnConsultCount: consult, fnInvalidConsult: invalid, fnLeadCount: leads, fnComm: commission, orderCount: Number(item.orderCount || 0), noOrderCount: Number(item.noOrderCount || 0) })
    map.set(rawUser, row)
  }
  ;(zcData.summary || zcData.stats || []).forEach(item => put(item, 'zc'))
  ;(fnData.rankings || fnData.stats || []).forEach(item => put(item, 'fn'))
  return [...map.values()].map(row => { const consultCount = row.zcConsultCount + row.fnConsultCount; const invalidConsultCount = row.zcInvalidConsult + row.fnInvalidConsult; const leadCount = row.zcLeadCount + row.fnLeadCount; const effectiveConsultCount = Math.max(0, consultCount - invalidConsultCount); return { ...row, consultCount, invalidConsultCount, effectiveConsultCount, leadCount, commission: row.zcComm + row.fnComm, rate: effectiveConsultCount ? Math.round(leadCount / effectiveConsultCount * 1000) / 10 : 0 } }).sort((a, b) => b.leadCount - a.leadCount)
}
async function loadDashboard() {
  loading.value = true
  try {
    const [zcData, fnData, summary] = await Promise.all([dateRange.value[0] !== dateRange.value[1] ? statsApi.leadSummary(dateRange.value[0], dateRange.value[1]).catch(() => ({})) : statsApi.leadDay(dateRange.value[0]).catch(() => ({})), dateRange.value[0] !== dateRange.value[1] ? financeStatsApi.leadSummary(dateRange.value[0], dateRange.value[1]).catch(() => ({})) : financeStatsApi.leadDay(dateRange.value[0]).catch(() => ({})), dashboardApi.stats().catch(() => ({}))])
    rows.value = normalizeRows(zcData, fnData)
    dashboard.value = summary || {}
  } catch (err) { ElMessage.error(err.message || '加载工作台失败') } finally { loading.value = false }
}
function openSalary() { scope.value = 'salary' }
function storePercent(count) { const max = Math.max(...storeDistribution.value.map(item => Number(item.count || 0)), 1); return Math.min(100, Math.round(Number(count || 0) / max * 100)) }
function trendHeight(count) { const max = Math.max(...trendDays.value.map(item => Number(item.total || 0)), 1); return Math.max(2, Math.round(Number(count || 0) / max * 85)) }
onMounted(loadDashboard)
</script>
