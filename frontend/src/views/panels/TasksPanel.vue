<template>
  <section class="stack-page">
    <el-tabs v-model="tab" class="page-tabs">
      <el-tab-pane v-if="hasPerm('taskManage')" label="任务管理" name="manage">
        <div class="toolbar">
          <div class="title-block"><h2>任务分发</h2><p>创建项目、导入题目、复制领取链接</p></div>
          <div class="toolbar-actions">
            <el-input v-model="newProjectName" placeholder="项目名称" style="max-width: 260px" @keyup.enter="createProject" />
            <el-button type="primary" :icon="Plus" @click="createProject">新建项目</el-button>
          </div>
        </div>

        <el-table v-if="!isMobile" :data="pagedProjects" border class="data-table">
          <el-table-column prop="id" label="ID" width="70" />
          <el-table-column prop="name" label="项目名称" min-width="150" />
          <el-table-column prop="ownerName" label="创建人" min-width="110" />
          <el-table-column prop="total" label="总题数" width="90" />
          <el-table-column prop="used" label="已使用" width="90" />
          <el-table-column prop="remaining" label="剩余" width="90" />
          <el-table-column label="链接" min-width="210">
            <template #default="{ row }"><el-link :href="workerLink(row.id)" target="_blank" type="success">/worker?project={{ row.id }}</el-link></template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template #default="{ row }">
              <el-button size="small" type="primary" @click="selectProject(row)">管理</el-button>
              <el-button size="small" type="danger" @click="removeProject(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-else class="mobile-list">
          <article v-for="project in pagedProjects" :key="project.id" class="customer-card" :class="{ active: currentProjectId === project.id }">
            <div class="card-main"><strong>{{ project.name }}</strong><el-tag size="small">#{{ project.id }}</el-tag></div>
            <p>总 {{ project.total }} · 已用 {{ project.used }} · 剩余 {{ project.remaining }}</p>
            <div class="card-foot"><span>{{ project.ownerName || '' }}</span><div><el-button size="small" @click="selectProject(project)">管理</el-button><el-button size="small" type="danger" @click="removeProject(project)">删除</el-button></div></div>
          </article>
        </div>
        <el-pagination
          v-model:current-page="projectPage"
          layout="total, sizes, prev, pager, next"
          v-model:page-size="projectPageSize"
          :page-sizes="pageSizes"
          :total="projects.length"
          background
          class="pager"
        />

        <el-card v-if="currentProject" shadow="never" class="tool-panel task-detail">
          <template #header>
            <div class="panel-head">
              <div>
                <strong>{{ currentProject.name }}</strong>
                <div class="muted-text">{{ workerLink(currentProject.id) }}</div>
              </div>
              <div class="panel-actions">
                <el-button :icon="DocumentCopy" @click="copyProjectLink">复制链接</el-button>
                <el-button type="danger" :icon="Delete" @click="clearTasks">清空题目</el-button>
              </div>
            </div>
          </template>

          <div class="lead-overview task-overview">
            <div class="lead-stat-card"><div class="lead-label">总题数</div><div class="lead-num">{{ taskStats.total }}</div></div>
            <div class="lead-stat-card"><div class="lead-label">已使用</div><div class="lead-num danger-text">{{ taskStats.used }}</div></div>
            <div class="lead-stat-card"><div class="lead-label">剩余</div><div class="lead-num success-text">{{ taskStats.remaining }}</div></div>
          </div>

          <el-form label-position="top" class="task-import-panel">
            <el-form-item label="固定复制内容">
              <el-input v-model="copyText" type="textarea" :rows="2" placeholder="兼职领取题目后固定复制的文字" />
            </el-form-item>
            <el-button type="primary" @click="saveCopyText">保存固定内容</el-button>
            <el-divider />
            <el-form-item label="批量导入题目">
              <el-input v-model="importText" type="textarea" :rows="6" placeholder="一行一个题目，可先生成图文题目行，再分别添加图片" />
            </el-form-item>
            <div class="actions">
              <el-button type="primary" :icon="Upload" :loading="importing" @click="importTasks">导入纯文本</el-button>
              <el-button :icon="Picture" @click="generateImageRows">生成图文题目行</el-button>
              <el-button type="success" :loading="importingImages" @click="batchImportWithImages">全部导入图文题目</el-button>
            </div>
          </el-form>

          <div v-if="batchRows.length" class="image-row-list">
            <article v-for="(row, rowIndex) in batchRows" :key="rowIndex" class="image-row">
              <div class="image-row-head">
                <strong>{{ row.content }}</strong>
                <el-button text type="danger" :icon="Delete" @click="removeBatchRow(rowIndex)" />
              </div>
              <div class="image-slots">
                <button v-for="slotIndex in 5" :key="slotIndex" class="image-slot" :class="{ filled: row.images[slotIndex - 1] }" @click="pickImage(rowIndex, slotIndex - 1)">
                  <img v-if="row.images[slotIndex - 1]" :src="row.images[slotIndex - 1]" alt="题目图片" />
                  <span v-else>+<small>{{ slotIndex }}</small></span>
                  <i v-if="row.images[slotIndex - 1]" @click.stop="removeSlotImage(rowIndex, slotIndex - 1)">×</i>
                </button>
              </div>
            </article>
          </div>
          <input ref="imageInput" type="file" accept="image/*" hidden @change="onPickedImage" />

          <div class="actions task-list-actions">
            <el-segmented v-model="taskFilter" :options="taskFilters" @change="reloadTasks" />
            <el-input v-model="taskSearch" placeholder="搜索题目" clearable style="max-width: 280px" />
            <el-button :icon="Download" @click="exportTasks">导出题目</el-button>
          </div>

          <el-table v-if="!isMobile" :data="tasks" border>
            <el-table-column prop="id" label="ID" width="70" />
            <el-table-column label="题目" min-width="300">
              <template #default="{ row }">
                <span>{{ row.content }}</span>
                <el-tag v-if="row.images?.length" size="small" type="primary" class="ml-8" @click="previewImages(row)">图片 {{ row.images.length }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="状态" width="100"><template #default="{ row }"><el-tag :type="row.status === 'used' ? 'danger' : 'success'">{{ row.status === 'used' ? '已使用' : '未使用' }}</el-tag></template></el-table-column>
            <el-table-column label="使用时间" min-width="160"><template #default="{ row }">{{ formatUsedAt(row.usedAt || row.claimedAt) }}</template></el-table-column>
            <el-table-column label="操作" width="90"><template #default="{ row }"><el-button type="danger" text :icon="Delete" @click="removeTask(row)" /></template></el-table-column>
          </el-table>
          <div v-else class="mobile-list">
            <article v-for="task in tasks" :key="task.id" class="customer-card">
              <div class="card-main"><strong>#{{ task.id }}</strong><el-tag :type="task.status === 'used' ? 'danger' : 'success'" size="small">{{ task.status === 'used' ? '已使用' : '未使用' }}</el-tag></div>
              <p>{{ task.content }}</p>
              <div class="card-foot"><span>{{ formatUsedAt(task.usedAt || task.claimedAt) }}</span><div><el-button v-if="task.images?.length" size="small" @click="previewImages(task)">图片</el-button><el-button size="small" type="danger" @click="removeTask(task)">删除</el-button></div></div>
            </article>
          </div>
          <el-pagination v-model:current-page="taskPage" v-model:page-size="taskPageSize" layout="total, sizes, prev, pager, next" :page-sizes="pageSizes" :total="taskTotal" background class="pager" @current-change="loadTasks" @size-change="reloadTasks" />
        </el-card>
      </el-tab-pane>

      <el-tab-pane v-if="hasPerm('qrGen')" label="无痕码" name="qr">
        <el-card shadow="never" class="tool-panel qr-card">
          <template #header>
            <div class="panel-head"><div><strong>无痕码生成器</strong><div class="muted-text">组合商品后生成下单二维码与链接</div></div></div>
          </template>
          <div class="qr-workbench">
            <section class="qr-editor">
              <div class="qr-link-entry">
                <el-input v-model="qrUrl" placeholder="粘贴商品链接，自动识别商品 ID 与 SKU" @change="parseUrl" />
                <el-button @click="parseUrl">识别链接</el-button>
              </div>
              <div class="qr-items-head">
                <strong>商品清单</strong>
                <el-button text type="primary" :icon="Plus" @click="qrItems.push({ itemId: '', skuId: '', qty: 1 })">添加商品</el-button>
              </div>
              <div class="qr-items">
                <div v-for="(item, index) in qrItems" :key="index" class="qr-line">
                  <span class="qr-num">{{ index + 1 }}</span>
                  <el-input v-model="item.itemId" placeholder="商品ID" />
                  <el-input v-model="item.skuId" placeholder="SKU（可选）" />
                  <el-input-number v-model="item.qty" :min="1" controls-position="right" />
                  <el-button :icon="Delete" circle @click="removeQrItem(index)" />
                </div>
              </div>
              <div class="qr-editor-actions"><el-button type="primary" @click="generateQr">生成二维码</el-button></div>
            </section>
            <aside class="qr-preview">
              <div v-if="qrImage" class="qr-result">
                <img :src="qrImage" alt="二维码" />
                <el-input v-model="qrResultUrl" readonly />
                <div class="actions"><el-button :icon="DocumentCopy" @click="copyQr">复制链接</el-button><el-button :icon="Download" @click="downloadQr">下载二维码</el-button></div>
              </div>
              <div v-else class="qr-preview-empty">生成后将在这里预览二维码</div>
            </aside>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-model="previewVisible" title="图片预览" :width="isMobile ? '94%' : '640px'">
      <div class="preview-images"><img v-for="src in previewList" :key="src" :src="src" alt="题目图片" /></div>
    </el-dialog>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, DocumentCopy, Download, Picture, Plus, Upload } from '@element-plus/icons-vue'
import QRCode from 'qrcode'
import { taskApi } from '../../services/api'
import { copyText as copyToClipboard } from '../../utils/clipboard'
import { useResponsive } from '../../composables/useResponsive'

const props = defineProps({ user: Object, hasPerm: Function })
const { isMobile } = useResponsive()
const tab = ref(props.hasPerm('taskManage') ? 'manage' : 'qr')
const projects = ref([])
const projectPage = ref(1)
const projectPageSize = ref(10)
const pageSizes = [10, 20, 50, 100]
const currentProjectId = ref(0)
const newProjectName = ref('')
const importText = ref('')
const copyText = ref('')
const taskFilter = ref('all')
const taskSearch = ref('')
const taskPage = ref(1)
const taskPageSize = ref(50)
const taskTotal = ref(0)
const taskStats = ref({ total: 0, used: 0, remaining: 0 })
const tasks = ref([])
const batchRows = ref([])
const imageInput = ref(null)
const picking = ref({ row: -1, slot: -1 })
const importing = ref(false)
const importingImages = ref(false)
const previewVisible = ref(false)
const previewList = ref([])
const qrUrl = ref('')
const qrItems = ref([{ itemId: '', skuId: '', qty: 1 }])
const qrImage = ref('')
const qrResultUrl = ref('')
let searchTimer = null

const taskFilters = [
  { label: '全部', value: 'all' },
  { label: '未使用', value: 'unused' },
  { label: '已使用', value: 'used' }
]

function hasPerm(perm) { return props.hasPerm ? props.hasPerm(perm) : false }
const currentProject = computed(() => projects.value.find(p => p.id === currentProjectId.value))
const pagedProjects = computed(() => projects.value.slice((projectPage.value - 1) * projectPageSize.value, projectPage.value * projectPageSize.value))
function workerLink(id) { return `${location.origin}/worker?project=${id}` }

async function loadProjects() {
  if (!hasPerm('taskManage')) return
  const data = await taskApi.projects()
  projects.value = data.projects || []
  if (projectPage.value > Math.max(1, Math.ceil(projects.value.length / projectPageSize.value))) projectPage.value = 1
}

async function selectProject(project, scroll = true) {
  currentProjectId.value = project.id
  copyText.value = project.copyText || ''
  taskPage.value = 1
  taskFilter.value = 'all'
  taskSearch.value = ''
  await loadTaskStats()
  await loadTasks()
  if (scroll) setTimeout(() => document.querySelector('.task-detail')?.scrollIntoView({ behavior: 'smooth' }), 50)
}

async function createProject() {
  const name = newProjectName.value.trim()
  if (!name) return ElMessage.warning('请输入项目名称')
  await taskApi.createProject(name)
  newProjectName.value = ''
  ElMessage.success('项目创建成功')
  loadProjects()
}

async function removeProject(project) {
  await ElMessageBox.confirm(`确定删除项目「${project.name}」吗？该项目下所有题目将一并删除。`, '删除项目', { type: 'warning' })
  await taskApi.removeProject(project.id)
  if (currentProjectId.value === project.id) currentProjectId.value = 0
  ElMessage.success('已删除项目')
  loadProjects()
}

async function loadTaskStats() {
  if (!currentProjectId.value) return
  taskStats.value = await taskApi.stats(currentProjectId.value)
}

async function saveCopyText() {
  await taskApi.updateProject(currentProjectId.value, { copyText: copyText.value })
  ElMessage.success('固定文本已保存')
  loadProjects()
}

async function importTasks() {
  if (!importText.value.trim()) return ElMessage.warning('请输入题目')
  importing.value = true
  try {
    const data = await taskApi.importTasks({ projectId: currentProjectId.value, questions: importText.value })
    ElMessage.success(`成功导入 ${data.imported || 0} 道题目`)
    importText.value = ''
    await refreshTasks()
  } finally {
    importing.value = false
  }
}

function generateImageRows() {
  const lines = importText.value.split('\n').map(l => l.trim()).filter(Boolean)
  if (!lines.length) return ElMessage.warning('请先输入题目内容')
  batchRows.value = lines.map(content => ({ content, images: [null, null, null, null, null] }))
}

function pickImage(row, slot) {
  picking.value = { row, slot }
  imageInput.value.value = ''
  imageInput.value.click()
}

function onPickedImage(event) {
  const file = event.target.files?.[0]
  if (!file) return
  if (file.size > 5 * 1024 * 1024) return ElMessage.warning('图片不能超过5MB')
  const reader = new FileReader()
  reader.onload = e => { batchRows.value[picking.value.row].images[picking.value.slot] = e.target.result }
  reader.readAsDataURL(file)
}

function removeSlotImage(row, slot) {
  batchRows.value[row].images[slot] = null
}

function removeBatchRow(index) {
  batchRows.value.splice(index, 1)
}

async function batchImportWithImages() {
  if (!batchRows.value.length) generateImageRows()
  if (!batchRows.value.length) return
  importingImages.value = true
  try {
    const payload = batchRows.value.map(row => ({ content: row.content, images: row.images.filter(Boolean) }))
    const data = await taskApi.addTasksWithImages({ projectId: currentProjectId.value, tasks: payload })
    ElMessage.success(`成功导入 ${data.imported || 0} 道题目`)
    importText.value = ''
    batchRows.value = []
    await refreshTasks()
  } finally {
    importingImages.value = false
  }
}

async function loadTasks() {
  if (!currentProjectId.value) return
  const data = await taskApi.list(currentProjectId.value, taskPage.value, taskFilter.value, taskSearch.value, taskPageSize.value)
  tasks.value = data.tasks || []
  taskTotal.value = data.total || 0
  taskPageSize.value = data.pageSize || 50
}

function reloadTasks() {
  taskPage.value = 1
  loadTasks()
}

async function refreshTasks() {
  await loadTaskStats()
  await loadTasks()
  await loadProjects()
}

async function exportTasks() {
  const data = await taskApi.exportTasks(currentProjectId.value, taskFilter.value, taskSearch.value)
  if (!data.tasks?.length) return ElMessage.warning('没有可导出的题目')
  const lines = ['ID\t题目内容\t状态\t领取时间\t图片数']
  data.tasks.forEach(task => {
    const status = task.status === 'unused' ? '未使用' : '已使用'
    lines.push([task.id, String(task.content || '').replace(/\t|\r|\n/g, ' '), status, formatUsedAt(task.usedAt), task.images?.length || 0].join('\t'))
  })
  const blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `题目列表_${currentProject.value?.name || currentProjectId.value}_${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success(`已导出 ${data.tasks.length} 道题目`)
}

async function removeTask(task) {
  await ElMessageBox.confirm('确定删除这道题目吗？', '删除题目', { type: 'warning' })
  await taskApi.removeTask(task.id)
  ElMessage.success('已删除')
  refreshTasks()
}

async function clearTasks() {
  await ElMessageBox.confirm('确定要清空本项目的所有题目吗？此操作不可撤销。', '清空题目', { type: 'warning' })
  await taskApi.clearTasks(currentProjectId.value)
  ElMessage.success('已清空所有题目')
  refreshTasks()
}

async function copyProjectLink() {
  try {
    await copyToClipboard(workerLink(currentProjectId.value))
    ElMessage.success('链接已复制')
  } catch (err) {
    ElMessage.error(err.message || '复制失败')
  }
}

function previewImages(task) {
  previewList.value = (task.images || []).map(img => img.startsWith('/uploads/') ? img : `/uploads/${img}`)
  previewVisible.value = true
}

function formatUsedAt(value) {
  return value ? String(value).replace('T', ' ').slice(0, 16) : '-'
}

function parseUrl() {
  const id = qrUrl.value.match(/[?&]id=(\d+)/)?.[1]
  const sku = qrUrl.value.match(/[?&]skuId=(\d+)/)?.[1] || ''
  if (!id) return ElMessage.warning('未识别到商品ID')
  const empty = qrItems.value.find(item => !item.itemId)
  const target = empty || { itemId: '', skuId: '', qty: 1 }
  target.itemId = id
  target.skuId = sku
  target.qty = 1
  if (!empty) qrItems.value.push(target)
  qrUrl.value = ''
  ElMessage.success(`已识别: ID=${id}${sku ? ` SKU=${sku}` : ''}`)
}

function removeQrItem(index) {
  if (qrItems.value.length === 1) qrItems.value = [{ itemId: '', skuId: '', qty: 1 }]
  else qrItems.value.splice(index, 1)
}

async function generateQr() {
  const parts = qrItems.value.filter(i => i.itemId).map(i => `${i.itemId}_${i.qty || 1}${i.skuId ? '_' + i.skuId : ''}`)
  if (!parts.length) return ElMessage.warning('请填写商品ID')
  qrResultUrl.value = `https://h5.m.taobao.com/cart/order.html?buyNow=true&buyParam=${parts.join(',')}`
  qrImage.value = await QRCode.toDataURL(qrResultUrl.value, { width: 220, margin: 2 })
  ElMessage.success('已生成')
}

async function copyQr() {
  try {
    await copyToClipboard(qrResultUrl.value)
    ElMessage.success('已复制')
  } catch (err) {
    ElMessage.error(err.message || '复制失败')
  }
}

function downloadQr() {
  const a = document.createElement('a')
  a.href = qrImage.value
  a.download = `无痕码_${Date.now()}.png`
  a.click()
}

watch(taskSearch, () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(reloadTasks, 300)
})
onMounted(loadProjects)
</script>
