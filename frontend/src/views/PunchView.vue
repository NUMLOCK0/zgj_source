<template>
  <section class="stack-page punch-page">
    <el-tabs v-model="tab" class="page-tabs">
      <!-- Tab 1: 打卡 -->
      <el-tab-pane v-if="hasPerm('punchUse')" label="打卡" name="punch">
        <div class="punch-container" :class="{ 'is-desktop': !isMobile }">
          <div class="punch-main">
            <div class="punch-datetime">
              <div class="punch-time">{{ currentTime }}</div>
              <div class="punch-date">{{ currentDateText }}</div>
            </div>

            <div v-if="!punchStarted" class="punch-idle">
              <div class="punch-mode-toggle">
                <button :class="['punch-mode-btn', { active: mode === 'in' }]" @click="mode = 'in'">
                  <span class="punch-mode-icon">📅</span><span>上班打卡</span>
                </button>
                <button :class="['punch-mode-btn', { active: mode === 'out' }]" @click="mode = 'out'">
                  <span class="punch-mode-icon">🏠</span><span>下班打卡</span>
                </button>
              </div>
              <el-button type="primary" size="large" class="punch-start-btn" :disabled="networkStatus === 'fail'" @click="startPunch">
                {{ mode === 'in' ? '上班打卡' : '下班打卡' }}
              </el-button>
              <div class="punch-network-hint">
                <span :class="['network-dot', networkStatus]"></span>{{ networkText }}
              </div>
            </div>

            <div v-else class="punch-active">
              <div class="punch-camera-wrap">
                <video ref="videoEl" autoplay muted playsinline class="punch-video" :class="{ ready: cameraReady }"></video>
                <canvas ref="canvasEl" class="punch-canvas"></canvas>
                <div v-if="!cameraReady" class="punch-camera-tip">
                  <el-icon size="32"><Camera /></el-icon>
                  <p>{{ cameraError || '正在启动摄像头...' }}</p>
                  <p v-if="!isHttps" class="danger-text">打卡需要HTTPS环境</p>
                </div>
                <div v-if="detecting" class="punch-overlay">
                  <div class="punch-detecting-text"><el-icon class="is-loading" size="20"><Loading /></el-icon>正在识别...</div>
                </div>
                <div v-if="cameraReady" class="punch-face-frame"></div>
                <div v-if="cameraReady" class="punch-network-badge" :class="networkStatus">{{ networkStatus === 'ok' ? '公司网络' : '非公司网络' }}</div>
                <div v-if="cameraReady" class="punch-ip-hint">锁定IP: {{ ALLOWED_IP }}</div>
              </div>
              <div class="punch-actions">
                <el-button type="primary" size="large" class="punch-action-btn" :loading="detecting" :disabled="!cameraReady || !modelsLoaded || networkStatus !== 'ok'" @click="doPunch">
                  <span v-if="networkStatus !== 'ok'">⚠ 请连接公司网络</span>
                  <span v-else>{{ mode === 'in' ? '确认上班打卡' : '确认下班打卡' }}</span>
                </el-button>
                <el-button @click="cancelPunch">取消</el-button>
              </div>
              <div v-if="!modelsLoaded && !cameraError" class="punch-model-tip"><el-icon class="is-loading"><Loading /></el-icon>{{ modelLoadText || "正在加载人脸识别模型..." }}</div>
              <div v-if="punchMessage" :class="['punch-message', punchMessageType]">{{ punchMessage }}</div>
            </div>
          </div>

          <!-- #41: 桌面端右侧信息面板 -->
          <div v-if="!isMobile" class="punch-sidebar">
            <div class="punch-info-card">
              <h3>打卡概览</h3>
              <div class="punch-info-row"><span>上次打卡</span><strong>{{ lastPunchText }}</strong></div>
              <div class="punch-info-row"><span>本月出勤</span><strong>{{ mySummary.attendance || 0 }}天</strong></div>
              <div class="punch-info-row"><span>本月迟到</span><strong class="st-late-text">{{ mySummary.late || 0 }}次</strong></div>
              <div class="punch-info-row"><span>本月早退</span><strong class="st-early-text">{{ mySummary.early || 0 }}次</strong></div>
              <div class="punch-info-row"><span>本月请假</span><strong>{{ mySummary.leave || 0 }}天</strong></div>
            </div>
            <div class="punch-week-cal" v-if="weekCalData.length">
              <h3>本周打卡</h3>
              <div class="week-grid">
                <div v-for="day in weekCalData" :key="day.date" class="week-cell" :class="{ today: day.isToday }">
                  <span class="week-label">{{ day.label }}</span>
                  <span class="week-date">{{ day.day }}</span>
                  <span class="week-status" :class="day.statusClass">{{ day.statusText }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- Tab 2: 考勤 (合并打卡记录+考勤表 #48) -->
      <el-tab-pane v-if="hasPerm('punchView')" label="考勤" name="attendance">
        <el-segmented v-model="attMode" :options="attModeOptions" class="att-mode-toggle" />

        <!-- 我的记录 -->
        <template v-if="attMode === 'my'">
          <div class="toolbar">
            <div class="title-block"><h2>我的考勤</h2><p>{{ attendanceMonth }} 出勤记录</p></div>
            <div class="toolbar-actions">
              <el-date-picker v-model="attendanceMonth" type="month" value-format="YYYY-MM" @change="loadAttendance" />
              <el-button :icon="Download" @click="exportRecords">导出</el-button>
            </div>
          </div>

          <div class="att-summary-cards" v-if="mySummary">
            <div class="att-sum-card"><span>出勤</span><strong class="st-normal-text">{{ mySummary.attendance || 0 }}</strong></div>
            <div class="att-sum-card"><span>迟到</span><strong class="st-late-text">{{ mySummary.late || 0 }}</strong></div>
            <div class="att-sum-card"><span>早退</span><strong class="st-early-text">{{ mySummary.early || 0 }}</strong></div>
            <div class="att-sum-card"><span>请假</span><strong class="st-leave-text">{{ mySummary.leave || 0 }}</strong></div>
            <div class="att-sum-card"><span>休息</span><strong class="st-rest-text">{{ mySummary.rest || 0 }}</strong></div>
            <div class="att-sum-card"><span>出差</span><strong class="st-business-text">{{ mySummary.business || 0 }}</strong></div>
            <div class="att-sum-card"><span>调休</span><strong class="st-comp-text">{{ mySummary.comp || 0 }}</strong></div>
          </div>

          <div class="cal-grid-wrapper" v-if="myCalendarData">
            <div class="cal-grid-header">
              <div v-for="w in weekLabels" :key="w" class="cal-header-cell" :class="{ 'cal-h-sunday': w === '日' }">{{ w }}</div>
            </div>
            <div class="cal-grid-body">
              <div v-for="cell in myCalendarData.cells" :key="cell.key"
                   class="cal-cell"
                   :class="{ 'cal-empty': !cell.day, 'cal-sunday': cell.isSunday, 'cal-today': cell.isToday }">
                <template v-if="cell.day">
                  <div class="cal-day-num">{{ cell.day }}</div>
                  <div class="cal-slots">
                    <div class="cal-slot" :class="statusClass(cell.morning, cell.isSunday)">早 {{ cell.morning || '—' }}</div>
                    <div class="cal-slot" :class="statusClass(cell.evening, cell.isSunday)">晚 {{ cell.evening || '—' }}</div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div v-if="props.user?.isAdmin" style="display: flex; justify-content: flex-end; margin-top: 16px;">
            <el-button type="primary" size="small" :icon="Plus" @click="openAddRecord">新增记录</el-button>
          </div>
          <el-table :data="records" border class="data-table" style="margin-top: 8px">
            <el-table-column prop="date" label="日期" min-width="100" />
            <el-table-column prop="name" label="姓名" min-width="80" />
            <el-table-column prop="checkIn" label="上班" min-width="80" />
            <el-table-column prop="checkOut" label="下班" min-width="80"><template #default="{ row }">{{ row.checkOut || '-' }}</template></el-table-column>
            <el-table-column prop="workHours" label="工时" min-width="70"><template #default="{ row }">{{ row.checkOut ? row.workHours + 'h' : '-' }}</template></el-table-column>
            <el-table-column v-if="props.user?.isAdmin" label="操作" width="120" fixed="right">
              <template #default="{ row }">
                <el-button type="primary" size="small" link @click="openEditRecord(row)">修改</el-button>
                <el-button type="danger" size="small" link @click="confirmDeleteRecord(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        <!-- 修改/新增打卡记录弹窗 -->
        <el-dialog v-if="props.user?.isAdmin" v-model="recordEditDialog" :title="recordEditForm.id ? '修改打卡记录' : '新增打卡记录'" width="400px">
          <el-form label-width="70px">
            <el-form-item label="姓名">
              <el-input v-model="recordEditForm.name" placeholder="员工姓名" />
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker v-model="recordEditForm.date" type="date" value-format="YYYY-MM-DD" style="width: 100%" />
            </el-form-item>
            <el-form-item label="上班">
              <el-time-picker v-model="recordEditForm.checkIn" format="HH:mm:ss" value-format="HH:mm:ss" style="width: 100%" />
            </el-form-item>
            <el-form-item label="下班">
              <el-time-picker v-model="recordEditForm.checkOut" format="HH:mm:ss" value-format="HH:mm:ss" style="width: 100%" />
            </el-form-item>
          </el-form>
          <template #footer>
            <el-button @click="recordEditDialog = false">取消</el-button>
            <el-button type="primary" @click="saveRecordEdit">确定</el-button>
          </template>
        </el-dialog>

        </template>

        <!-- 全员考勤 -->
        <template v-if="attMode === 'all'">
          <div class="toolbar">
            <div class="title-block"><h2>全员考勤</h2><p>人脸打卡自动登记，管理员可修改</p></div>
            <div class="toolbar-actions">
              <el-date-picker v-model="attendanceMonth" type="month" value-format="YYYY-MM" @change="loadAttendance" />
              <el-button :icon="Refresh" @click="loadAttendance">刷新</el-button>
            </div>
          </div>

          <div class="att-layout" :class="{ mobile: isMobile }">
            <div class="att-emp-list">
              <div v-for="emp in attendanceData?.employees" :key="emp.employeeId"
                   :class="['att-emp-item', { active: selectedEmpId === emp.employeeId }]"
                   @click="selectEmployee(emp)">
                <strong>{{ emp.name }}</strong>
                <span>出勤{{ emp.summary.attendance }}天</span>
              </div>
              <div v-if="!attendanceData?.employees.length" class="att-empty">暂无考勤数据</div>
            </div>

            <div class="att-emp-detail" v-if="selectedEmp">
              <div class="att-summary-cards">
                <div class="att-sum-card"><span>出勤</span><strong class="st-normal-text">{{ selectedEmp.summary.attendance }}</strong></div>
                <div class="att-sum-card"><span>迟到</span><strong class="st-late-text">{{ selectedEmp.summary.late }}</strong></div>
                <div class="att-sum-card"><span>早退</span><strong class="st-early-text">{{ selectedEmp.summary.early }}</strong></div>
                <div class="att-sum-card"><span>请假</span><strong class="st-leave-text">{{ selectedEmp.summary.leave }}</strong></div>
                <div class="att-sum-card"><span>休息</span><strong class="st-rest-text">{{ selectedEmp.summary.rest }}</strong></div>
                <div class="att-sum-card"><span>出差</span><strong class="st-business-text">{{ selectedEmp.summary.business }}</strong></div>
                <div class="att-sum-card"><span>调休</span><strong class="st-comp-text">{{ selectedEmp.summary.comp }}</strong></div>
              </div>

              <div class="cal-grid-wrapper" v-if="empCalendarData">
                <div class="cal-grid-header">
                  <div v-for="w in weekLabels" :key="w" class="cal-header-cell" :class="{ 'cal-h-sunday': w === '日' }">{{ w }}</div>
                </div>
                <div class="cal-grid-body">
                  <div v-for="cell in empCalendarData.cells" :key="cell.key"
                       class="cal-cell"
                       :class="{ 'cal-empty': !cell.day, 'cal-sunday': cell.isSunday, 'cal-today': cell.isToday }">
                    <template v-if="cell.day">
                      <div class="cal-day-num">{{ cell.day }}</div>
                      <div class="cal-slots">
                        <div class="cal-slot" :class="statusClass(cell.morning, cell.isSunday)"
                             @click="hasPerm('editAttendance') && openEdit(selectedEmp.employeeId, selectedEmp.name, cell.date, 'morning', cell.morning)">
                          早 {{ cell.morning || '—' }}
                        </div>
                        <div class="cal-slot" :class="statusClass(cell.evening, cell.isSunday)"
                             @click="hasPerm('editAttendance') && openEdit(selectedEmp.employeeId, selectedEmp.name, cell.date, 'evening', cell.evening)">
                          晚 {{ cell.evening || '—' }}
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <p v-if="hasPerm('editAttendance')" class="att-edit-hint">💡 点击早/晚格子可修改考勤状态</p>
            </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="editDialog" title="修改考勤" :width="isMobile ? '90%' : '360px'">
      <div style="margin-bottom: 12px;">
        <strong>{{ editForm.name }}</strong> — {{ editForm.date }} {{ editForm.slot === 'morning' ? '早班' : '晚班' }}
      </div>
      <el-select v-model="editForm.status" placeholder="选择状态" style="width: 100%;">
        <el-option v-for="s in statusOptions" :key="s" :label="s || '清空'" :value="s" />
      </el-select>
      <template #footer>
        <el-button @click="editDialog = false">取消</el-button>
        <el-button type="primary" @click="saveAttendance">保存</el-button>
      </template>
    </el-dialog>

    <Transition name="punch-success">
      <div v-if="showPunchSuccess" class="punch-success-overlay">
        <div class="punch-success-icon"></div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Camera, Download, Loading, Plus, Refresh } from '@element-plus/icons-vue'
import { ElDialog, ElSelect, ElOption, ElButton } from 'element-plus'
import * as faceapi from 'face-api.js'
import { punchApi, api } from '../services/api'
import { useResponsive } from '../composables/useResponsive'

const props = defineProps({ user: Object, hasPerm: Function })
const { isMobile } = useResponsive()
const tab = ref('punch')
const mode = ref('in')
const videoEl = ref(null)
const canvasEl = ref(null)
const cameraReady = ref(false)
const cameraError = ref('')
const modelsLoaded = ref(false)
const modelLoadText = ref('')
const detecting = ref(false)
const punchMessage = ref('')
const showPunchSuccess = ref(false)
const punchMessageType = ref('')
const records = ref([])
const recordRange = ref([])
const currentTime = ref('')
const currentDateText = ref('')
const attendanceMonth = ref(new Date().toISOString().slice(0, 7))
const attendanceData = ref(null)
const editDialog = ref(false)
const editForm = ref({ employeeId: 0, name: '', date: '', slot: '', status: '' })
const statusOptions = ['正常', '请假', '休息', '迟到', '早退', '出差', '调休', '']
const punchStarted = ref(false)
const networkStatus = ref('checking')
const ALLOWED_IP = '113.66.20.207'
let mediaStream = null
let clockTimer = null
let networkTimer = null

// #48: 考勤模式切换
const attMode = ref('my')
const attModeOptions = [
  { label: '我的记录', value: 'my' },
  { label: '全员考勤', value: 'all' }
]
const selectedEmpId = ref(0)
const weekLabels = ['日', '一', '二', '三', '四', '五', '六']

function hasPerm(p) { return props.hasPerm ? props.hasPerm(p) : false }
const isHttps = computed(() => location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')

const networkText = computed(() => {
  if (networkStatus.value === 'checking') return '正在检测网络...'
  if (networkStatus.value === 'ok') return '已连接公司网络'
  return '未连接公司网络，无法打卡'
})

const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights'

// === #42: 日历网格构建 ===
function buildCalendar(daysData) {
  const [year, month] = attendanceMonth.value.split('-').map(Number)
  const firstDay = new Date(year, month - 1, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const cells = []
  for (let i = 0; i < startWeekday; i++) {
    cells.push({ key: `pad-${i}`, day: null })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const dayDate = new Date(year, month - 1, d)
    const isSunday = dayDate.getDay() === 0
    const dayData = daysData?.[dateStr]
    cells.push({
      key: dateStr, day: d, date: dateStr, isSunday,
      isToday: dateStr === todayStr,
      morning: dayData?.morning || '', evening: dayData?.evening || ''
    })
  }
  return { cells }
}

// === 当前用户考勤数据 ===
const myEmpData = computed(() => {
  if (!attendanceData.value?.employees) return null
  const userName = props.user?.name || props.user?.username
  return attendanceData.value.employees.find(e => e.name === userName) || null
})
const mySummary = computed(() => myEmpData.value?.summary || { attendance: 0, late: 0, early: 0, leave: 0, rest: 0, business: 0, comp: 0 })
const myCalendarData = computed(() => myEmpData.value ? buildCalendar(myEmpData.value.days) : null)

// === 选中的员工 ===
const selectedEmp = computed(() => {
  if (!attendanceData.value?.employees || !selectedEmpId.value) return null
  return attendanceData.value.employees.find(e => e.employeeId === selectedEmpId.value) || null
})
const empCalendarData = computed(() => selectedEmp.value ? buildCalendar(selectedEmp.value.days) : null)

function selectEmployee(emp) { selectedEmpId.value = emp.employeeId }

// === #41: 打卡侧边栏数据 ===
const lastPunchText = computed(() => {
  if (!records.value.length) return '暂无记录'
  const last = records.value[0]
  const parts = [last.date]
  if (last.checkIn) parts.push(`上班 ${last.checkIn}`)
  if (last.checkOut) parts.push(`下班 ${last.checkOut}`)
  return parts.join(' ')
})

const weekCalData = computed(() => {
  if (!myEmpData.value) return []
  const today = new Date()
  const dayOfWeek = today.getDay()
  const sunday = new Date(today)
  sunday.setDate(today.getDate() - dayOfWeek)
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  const result = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday)
    d.setDate(sunday.getDate() + i)
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    const dayData = myEmpData.value.days?.[dateStr]
    const morning = dayData?.morning || ''
    const evening = dayData?.evening || ''
    const status = morning || evening
    result.push({
      date: dateStr, day: d.getDate(), label: weekLabels[i],
      isToday: dateStr === todayStr,
      statusText: status || '—',
      statusClass: statusClass(status, false)
    })
  }
  return result
})

// === 人脸识别 & 打卡逻辑（不变） ===
async function loadModels() {
  // 本地优先（国内服务器更快），CDN回退
  const tryLoad = async (url) => {
    modelLoadText.value = '正在加载人脸检测模型 1/3...'
    await faceapi.nets.tinyFaceDetector.loadFromUri(url)
    modelLoadText.value = '正在加载特征点模型 2/3...'
    await faceapi.nets.faceLandmark68Net.loadFromUri(url)
    modelLoadText.value = '正在加载识别模型 3/3...'
    await faceapi.nets.faceRecognitionNet.loadFromUri(url)
  }
  try {
    await tryLoad('/weights')
    modelsLoaded.value = true
  } catch (err) {
    try {
      modelLoadText.value = '正在从备用源加载模型...'
      await tryLoad(MODEL_URL)
      modelsLoaded.value = true
    } catch (err2) {
      cameraError.value = '人脸识别模型加载失败'
    }
  }
  modelLoadText.value = ''
}

async function checkNetwork() {
  try {
    let myIp = ''
    try {
      const data = await api('GET', '/api/myip')
      myIp = data.ip || ''
    } catch (e) {
      const resp = await fetch('https://api.ipify.org?format=json')
      const data = await resp.json()
      myIp = data.ip || ''
    }
    networkStatus.value = myIp === ALLOWED_IP ? 'ok' : 'fail'
  } catch (err) {
    networkStatus.value = 'fail'
  }
}

async function startCamera() {
  if (!isHttps.value) { cameraError.value = '打卡功能需要HTTPS环境'; return }
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480, facingMode: 'user' } })
    if (videoEl.value) {
      videoEl.value.srcObject = mediaStream
      videoEl.value.onloadedmetadata = () => { cameraReady.value = true }
    }
  } catch (err) {
    cameraError.value = '无法访问摄像头: ' + (err.message || '请允许摄像头权限')
  }
}

function stopCamera() {
  if (mediaStream) { mediaStream.getTracks().forEach(t => t.stop()); mediaStream = null }
  cameraReady.value = false
}

async function startPunch() {
  punchStarted.value = true
  punchMessage.value = ''
  await checkNetwork()
  networkTimer = setInterval(checkNetwork, 15000)
  await startCamera()
}

function cancelPunch() {
  punchStarted.value = false
  stopCamera()
  punchMessage.value = ''
  if (networkTimer) { clearInterval(networkTimer); networkTimer = null }
}

async function doPunch() {
  if (!cameraReady.value || !modelsLoaded.value) return
  if (networkStatus.value !== 'ok') {
    punchMessage.value = '请先连接公司网络'
    punchMessageType.value = 'error'
    return
  }
  detecting.value = true
  punchMessage.value = ''
  try {
    const detection = await faceapi.detectSingleFace(videoEl.value, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
    if (!detection) {
      punchMessage.value = '未检测到人脸，请正对摄像头'
      punchMessageType.value = 'error'
      return
    }
    const descriptor = Array.from(detection.descriptor)
    const apiFn = mode.value === 'in' ? punchApi.checkin : punchApi.checkout
    const data = await apiFn(descriptor)
    punchMessage.value = `${data.matchedName} ${mode.value === 'in' ? '上班' : '下班'}打卡成功！${mode.value === 'out' && data.record?.workHours ? '（工时' + data.record.workHours + 'h）' : ''}`
    punchMessageType.value = 'success'
    showPunchSuccess.value = true
    if (navigator.vibrate) navigator.vibrate(100)
    setTimeout(() => { showPunchSuccess.value = false }, 1500)
    setTimeout(() => { cancelPunch() }, 3000)
  } catch (err) {
    punchMessage.value = err.message || '打卡失败'
    punchMessageType.value = 'error'
  } finally {
    detecting.value = false
  }
}

// === 记录 & 考勤 ===
async function loadRecords() {
  try {
    const params = {}
    if (recordRange.value?.length === 2) { params.startDate = recordRange.value[0]; params.endDate = recordRange.value[1] }
    const data = await punchApi.records(params)
    records.value = data.records || []
  } catch (err) { ElMessage.error(err.message || '加载记录失败') }
}

function exportRecords() {
  const start = recordRange.value?.[0] || new Date().toISOString().slice(0, 10)
  const end = recordRange.value?.[1] || new Date().toISOString().slice(0, 10)
  window.open(`/api/punch/export?start=${start}&end=${end}`, '_blank')
}

async function confirmDeleteRecord(row) {
  try {
    await ElMessageBox.confirm(
      `确认删除 ${row.name} 在 ${row.date} 的打卡记录？`,
      '删除确认',
      { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
    )
    await doDeleteRecord(row)
  } catch (e) { /* cancelled */ }
}

async function doDeleteRecord(row) {
  try {
    await punchApi.deleteRecord(row.id)
    ElMessage.success('记录已删除')
    loadRecords()
  } catch (err) { ElMessage.error(err.message || '删除失败') }
}

const recordEditDialog = ref(false)
const recordEditForm = ref({ id: null, name: '', date: '', checkIn: '', checkOut: '' })

function openEditRecord(row) {
  recordEditForm.value = { id: row.id, name: row.name, date: row.date, checkIn: row.checkIn || '', checkOut: row.checkOut || '' }
  recordEditDialog.value = true
}

function openAddRecord() {
  recordEditForm.value = { id: null, name: '', date: new Date().toISOString().slice(0, 10), checkIn: '', checkOut: '' }
  recordEditDialog.value = true
}

async function saveRecordEdit() {
  try {
    const form = recordEditForm.value
    if (!form.name.trim()) return ElMessage.warning('请输入姓名')
    if (!form.date) return ElMessage.warning('请选择日期')
    if (form.id) {
      await punchApi.updateRecord(form.id, { checkIn: form.checkIn, checkOut: form.checkOut })
      ElMessage.success('记录已修改')
    } else {
      await punchApi.addRecord({ name: form.name, date: form.date, checkIn: form.checkIn, checkOut: form.checkOut })
      ElMessage.success('记录已新增')
    }
    recordEditDialog.value = false
    loadRecords()
  } catch (err) { ElMessage.error(err.message || '保存失败') }
}

async function loadAttendance() {
  try {
    const data = await punchApi.monthly(attendanceMonth.value)
    attendanceData.value = data
    if (!selectedEmpId.value && data.employees?.length) {
      selectedEmpId.value = data.employees[0].employeeId
    }
  } catch (err) { ElMessage.error(err.message || '加载考勤表失败') }
}

function statusClass(status, isSunday) {
  if (!status) return isSunday ? 'sunday-empty' : 'empty'
  const map = { '正常': 'st-normal', '请假': 'st-leave', '休息': 'st-rest', '迟到': 'st-late', '早退': 'st-early', '出差': 'st-business', '调休': 'st-comp' }
  return map[status] || ''
}

function openEdit(employeeId, name, date, slot, currentStatus) {
  editForm.value = { employeeId, name, date, slot, status: currentStatus || '' }
  editDialog.value = true
}

async function saveAttendance() {
  try {
    await punchApi.updateAttendance({
      employeeId: editForm.value.employeeId,
      date: editForm.value.date,
      slot: editForm.value.slot,
      status: editForm.value.status
    })
    ElMessage.success('考勤已更新')
    editDialog.value = false
    loadAttendance()
  } catch (err) { ElMessage.error(err.message || '修改失败') }
}

function updateClock() {
  const now = new Date()
  currentTime.value = now.toTimeString().slice(0, 8)
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  currentDateText.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 星期${weekdays[now.getDay()]}`
}

onMounted(async () => {
  updateClock()
  clockTimer = setInterval(updateClock, 1000)
  await loadModels()
  await checkNetwork()
  loadRecords()
  loadAttendance()
  if (!hasPerm('punchUse') && hasPerm('punchView')) tab.value = 'attendance'
})

onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (networkTimer) clearInterval(networkTimer)
  stopCamera()
})
</script>

<style scoped>
.punch-page { background: var(--bg, #f5f7fa); min-height: 100%; }
.punch-container { display: flex; gap: 24px; padding: 20px; flex-wrap: wrap; }
.punch-container.is-desktop { flex-wrap: nowrap; }
.punch-main { flex: 1; min-width: 300px; }
.punch-datetime { text-align: center; padding: 16px 0; }
.punch-time { font-size: 42px; font-weight: 700; color: #303133; font-variant-numeric: tabular-nums; letter-spacing: 2px; }
.punch-date { font-size: 14px; color: #909399; margin-top: 4px; }
.punch-idle { display: flex; flex-direction: column; align-items: center; gap: 20px; }
.punch-mode-toggle { display: flex; gap: 10px; width: 100%; max-width: 400px; }
.punch-mode-btn { flex: 1; padding: 14px 8px; border: 2px solid #e4e7ed; background: #fff; color: #606266; border-radius: 10px; cursor: pointer; font-size: 15px; font-weight: 600; transition: all .2s; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.punch-mode-btn.active { border-color: var(--el-color-primary, #07c160); background: var(--el-color-primary-light-9, #e5f9ef); color: var(--el-color-primary, #07c160); }
.punch-mode-icon { font-size: 20px; }
.punch-start-btn { width: 100%; max-width: 400px; height: 56px; font-size: 18px; border-radius: 12px; }
.punch-network-hint { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #909399; }
.network-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.network-dot.checking { background: #e6a23c; animation: blink 1s infinite; }
.network-dot.ok { background: #07c160; }
.network-dot.fail { background: #f56c6c; }
.network-dot.no_config { background: #909399; }
@keyframes blink { 50% { opacity: .3; } }
.punch-active { display: flex; flex-direction: column; gap: 16px; align-items: center; }
.punch-camera-wrap { position: relative; width: 480px; max-width: 100%; aspect-ratio: 4/3; background: #f0f2f5; border-radius: 16px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,.08); }
.punch-video { width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); }
.punch-video.ready { display: block; }
.punch-video:not(.ready) { display: none; }
.punch-canvas { display: none; }
.punch-camera-tip { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: #909399; }
.punch-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.4); display: flex; align-items: center; justify-content: center; }
.punch-detecting-text { color: #fff; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.punch-face-frame { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 55%; aspect-ratio: 3/4; border: 2px dashed rgba(7,193,96,.4); border-radius: 50%; pointer-events: none; overflow: hidden; }
.punch-face-frame::before { content: ''; position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(7,193,96,.8), transparent); animation: scan-line 2s linear infinite; }
@keyframes scan-line { 0% { top: 0; } 100% { top: 100%; } }
.punch-camera-wrap { border-radius: 16px; }
.punch-success-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; z-index: 9999; }
.punch-success-icon { width: 80px; height: 80px; border-radius: 50%; background: #07c160; display: flex; align-items: center; justify-content: center; animation: punch-pop 0.5s ease-out; }
.punch-success-icon::after { content: '\2713'; color: #fff; font-size: 40px; font-weight: bold; }
@keyframes punch-pop { 0% { transform: scale(0); opacity: 0; } 50% { transform: scale(1.2); } 100% { transform: scale(1); opacity: 1; } }
.punch-success-enter-active, .punch-success-leave-active { transition: opacity 0.3s; }
.punch-success-enter-from, .punch-success-leave-to { opacity: 0; }
.punch-network-badge { position: absolute; top: 12px; right: 12px; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.punch-network-badge.ok { background: rgba(7,193,96,.15); color: #07c160; }
.punch-network-badge.fail { background: rgba(245,108,108,.15); color: #f56c6c; }
.punch-network-badge.no_config { background: rgba(144,147,153,.15); color: #909399; }
.punch-ip-hint { position: absolute; bottom: 12px; left: 12px; padding: 3px 8px; border-radius: 8px; background: rgba(0,0,0,.4); color: #fff; font-size: 11px; }
.punch-actions { display: flex; gap: 10px; width: 100%; max-width: 480px; }
.punch-action-btn { flex: 1; height: 52px; font-size: 17px; border-radius: 10px; }
.punch-model-tip { text-align: center; color: #909399; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px; }
.punch-message { padding: 12px 16px; border-radius: 10px; text-align: center; font-weight: 600; font-size: 15px; width: 100%; max-width: 480px; }
.punch-message.success { background: #f0f9eb; color: #07c160; }
.punch-message.error { background: #fef0f0; color: #f56c6c; }

/* #41: 桌面端右侧信息面板 */
.punch-sidebar { width: 300px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px; }
.punch-info-card { background: #fff; border: 1px solid #ebeef5; border-radius: 10px; padding: 18px; }
.punch-info-card h3 { margin: 0 0 14px; font-size: 15px; color: #303133; }
.punch-info-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f5f7fa; font-size: 14px; }
.punch-info-row:last-child { border-bottom: 0; }
.punch-info-row span { color: #909399; }
.punch-info-row strong { color: #303133; font-variant-numeric: tabular-nums; }
.punch-week-cal { background: #fff; border: 1px solid #ebeef5; border-radius: 10px; padding: 18px; }
.punch-week-cal h3 { margin: 0 0 14px; font-size: 15px; color: #303133; }
.week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
.week-cell { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 2px; border-radius: 6px; background: #f5f7fa; font-size: 11px; }
.week-cell.today { background: var(--el-color-primary-light-9, #e5f9ef); }
.week-label { color: #c0c4cc; }
.week-date { font-weight: 700; color: #606266; }
.week-status { font-size: 10px; color: #909399; }

/* #48: 考勤模式切换 */
.att-mode-toggle { margin-bottom: 16px; }

/* 汇总卡片 */
.att-summary-cards { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
.att-sum-card { flex: 1 1 calc(14.28% - 10px); min-width: 80px; background: #fff; border: 1px solid #ebeef5; border-radius: 8px; padding: 12px; text-align: center; }
.att-sum-card span { display: block; font-size: 12px; color: #909399; margin-bottom: 4px; }
.att-sum-card strong { font-size: 22px; font-weight: 800; font-variant-numeric: tabular-nums; }

/* 文字颜色 */
.st-normal-text { color: #07c160; }
.st-late-text { color: #f56c6c; }
.st-early-text { color: #f56c6c; }
.st-leave-text { color: #e6a23c; }
.st-rest-text { color: #909399; }
.st-business-text { color: #409eff; }
.st-comp-text { color: #67c23a; }

/* #42: 日历网格 */
.cal-grid-wrapper { border: 1px solid #ebeef5; border-radius: 10px; overflow: hidden; background: #fff; }
.cal-grid-header { display: grid; grid-template-columns: repeat(7, 1fr); }
.cal-header-cell { text-align: center; padding: 10px 4px; font-size: 13px; font-weight: 700; color: #606266; background: #f5f7fa; border-bottom: 1px solid #ebeef5; border-right: 1px solid #ebeef5; }
.cal-header-cell:last-child { border-right: 0; }
.cal-header-cell.cal-h-sunday { color: #f56c6c; }
.cal-grid-body { display: grid; grid-template-columns: repeat(7, 1fr); }
.cal-cell { min-height: 72px; border-right: 1px solid #f0f2f5; border-bottom: 1px solid #f0f2f5; padding: 4px; display: flex; flex-direction: column; gap: 2px; }
.cal-cell:nth-child(7n) { border-right: 0; }
.cal-empty { background: #fafbfc; }
.cal-sunday .cal-day-num { color: #f56c6c; }
.cal-today { box-shadow: inset 0 0 0 2px var(--el-color-primary, #07c160); }
.cal-day-num { font-size: 13px; font-weight: 700; color: #303133; }
.cal-slots { display: flex; flex-direction: column; gap: 2px; margin-top: 2px; }
.cal-slot { font-size: 10px; padding: 2px 4px; border-radius: 3px; text-align: center; color: #c0c4cc; cursor: default; line-height: 1.3; }
.cal-slot.st-normal { background: #e5f9ef; color: #07c160; font-weight: 600; }
.cal-slot.st-leave { background: #fdf6ec; color: #e6a23c; }
.cal-slot.st-rest { background: #f4f4f5; color: #909399; }
.cal-slot.st-late { background: #fef0f0; color: #f56c6c; }
.cal-slot.st-early { background: #fef0f0; color: #f56c6c; }
.cal-slot.st-business { background: #ecf5ff; color: #409eff; }
.cal-slot.st-comp { background: #f0f9eb; color: #67c23a; }
.cal-slot.empty, .cal-slot.sunday-empty { color: #e4e7ed; }

/* 全员考勤布局 */
.att-layout { display: grid; grid-template-columns: 200px 1fr; gap: 16px; align-items: start; }
.att-layout.mobile { grid-template-columns: 1fr; }
.att-emp-list { display: flex; flex-direction: column; gap: 4px; max-height: 600px; overflow-y: auto; }
.att-emp-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border: 1px solid #ebeef5; border-radius: 8px; cursor: pointer; transition: all .15s; background: #fff; }
.att-emp-item:hover { border-color: var(--el-color-primary, #07c160); background: #f6fcf8; }
.att-emp-item.active { border-color: var(--el-color-primary, #07c160); background: var(--el-color-primary-light-9, #e5f9ef); }
.att-emp-item strong { font-size: 14px; color: #303133; }
.att-emp-item span { font-size: 12px; color: #909399; }
.att-emp-detail { min-width: 0; }
.att-edit-hint { padding: 12px 0; color: #909399; font-size: 13px; }
.att-empty { text-align: center; padding: 20px; color: #c0c4cc; }

@media (max-width: 768px) {
  .punch-container { padding: 12px; gap: 16px; }
  .punch-time { font-size: 32px; }
  .punch-mode-btn { padding: 10px 4px; font-size: 14px; }
  .punch-start-btn { height: 48px; font-size: 16px; }
  .punch-camera-wrap { width: 100%; border-radius: 12px; }
  .att-sum-card { flex: 1 1 calc(33.33% - 10px); }
  .cal-cell { min-height: 56px; }
  .cal-slot { font-size: 9px; padding: 1px 2px; }
  .att-layout { grid-template-columns: 1fr; }
  .att-emp-list { flex-direction: row; overflow-x: auto; max-height: none; gap: 8px; padding-bottom: 8px; }
  .att-emp-item { flex: 0 0 auto; min-width: 120px; }
}
</style>
