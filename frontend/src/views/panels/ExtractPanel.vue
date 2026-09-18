<template>
  <section class="page-grid extract-page">
    <el-card class="tool-panel" shadow="never">
      <template #header>
        <div class="panel-head">
          <strong>客户信息整理</strong>
        </div>
      </template>
      <el-input v-model="rawText" type="textarea" :rows="isMobile ? 8 : 12" placeholder="粘贴聊天记录、客户描述或报名信息" />
      <div class="actions extract-actions">
        <el-button class="extract-primary-action" type="primary" :icon="MagicStick" :disabled="!hasPerm('extract')" @click="extract">提取并整理</el-button>
        <el-button type="danger" :icon="RefreshLeft" @click="rawText = ''">清空</el-button>
      </div>
    </el-card>

    <el-card v-if="cardData" class="tool-panel" shadow="never">
      <template #header>
        <div class="panel-head">
          <strong>信息卡</strong>
          <div class="panel-actions">
            <el-button type="success" :icon="Plus" :disabled="!cardData || !hasPerm('register')" @click="openRegisterConfirm">登记客户</el-button>
            <el-button type="primary" :icon="DocumentCopy" :disabled="!cardData || !hasPerm('copyCard')" @click="copyCard">一键复制</el-button>
          </div>
        </div>
      </template>
      <div class="info-card-preview">
        <div class="info-card-preview-title">客户信息卡</div>
        <pre>{{ formatCard(cardData) }}</pre>
      </div>
            <el-alert v-if="justRegistered" title="已成功登记到登记表" description="可在「登记表」Tab查看该客户" type="success" show-icon :closable="true" @close="justRegistered = false" class="mb-12" />
      <el-form label-position="top" class="card-form">
        <el-alert v-if="cardData._judgeType" :title="cardData._judgeType" type="success" show-icon :closable="false" class="mb-12" />
        <el-row :gutter="12">
          <el-col :xs="24" :sm="12"><el-form-item label="姓名"><el-input v-model="cardData.name" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="电话"><el-input v-model="cardData.phone" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="微信"><el-input v-model="cardData.wechat" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="学历"><el-input v-model="cardData.degree" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="专业"><el-input v-model="cardData.major" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="现有职称"><el-input v-model="cardData.titleLevel" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="社保城市"><el-input v-model="cardData.ssCity" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="申报专业"><el-input v-model="cardData.reviewMajor" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="申报级别"><el-input v-model="cardData.applyLevel" /></el-form-item></el-col>
          <el-col :xs="24" :sm="12"><el-form-item label="分配店铺"><el-select v-model="cardData.assignedTo" filterable allow-create default-first-option><el-option v-for="s in stores" :key="s" :value="s" /></el-select></el-form-item></el-col>
          <el-col :xs="24"><el-form-item label="结论"><el-input v-model="cardData.conclusion" /></el-form-item></el-col>
          <el-col :xs="24"><el-form-item label="备注"><el-input v-model="cardData.remarks" type="textarea" :rows="3" /></el-form-item></el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-dialog v-if="!isMobile" v-model="storeDialog" title="选择分配店铺" width="420px" class="responsive-dialog">
      <div class="store-chip-row">
        <el-tag v-for="s in stores" :key="s" :effect="selectedStore === s ? 'dark' : 'plain'" class="store-chip-vue" @click="selectStore(s)">{{ s }}</el-tag>
        <el-tag type="warning" effect="plain" class="store-chip-vue" @click="selectRandomStore">随机</el-tag>
      </div>
      <el-input v-model="selectedStore" placeholder="选择或输入店铺名称" />
      <template #footer>
        <el-button @click="confirmStore('')">不分配</el-button>
        <el-button type="primary" @click="confirmStore(selectedStore)">确定登记</el-button>
      </template>
    </el-dialog>

    <el-drawer v-if="isMobile" v-model="storeDialog" direction="btt" size="auto" :with-header="false" class="store-picker-popup">
      <div class="store-picker-popup-content">
        <div class="store-picker-popup-head">
          <strong>选择分配店铺</strong>
          <span>可选择店铺或直接输入</span>
        </div>
        <div class="store-chip-row store-picker-chips">
          <el-tag v-for="s in stores" :key="s" :effect="selectedStore === s ? 'dark' : 'plain'" class="store-chip-vue" @click="selectStore(s)">{{ s }}</el-tag>
          <el-tag type="warning" effect="plain" class="store-chip-vue" @click="selectRandomStore">随机</el-tag>
        </div>
        <el-input v-model="selectedStore" size="large" placeholder="选择或输入店铺名称" />
        <div class="store-picker-popup-actions">
          <el-button size="large" @click="confirmStore('')">不分配</el-button>
          <el-button size="large" type="primary" @click="confirmStore(selectedStore)">确定登记</el-button>
        </div>
      </div>
    </el-drawer>

    <el-dialog v-model="registerConfirmVisible" title="确认登记客户" width="520px" class="register-confirm-dialog" :close-on-click-modal="false">
      <p class="register-confirm-tip">请核对客户资料，并选择是否立即同步到悟空 CRM。</p>
      <div v-if="cardData" class="register-confirm-preview">
        <div><span>姓名</span><strong>{{ cardData.name || '-' }}</strong></div>
        <div><span>电话</span><strong>{{ cardData.phone || '-' }}</strong></div>
        <div><span>微信</span><strong>{{ cardData.wechat || '-' }}</strong></div>
        <div><span>学历</span><strong>{{ cardData.degree || '-' }}</strong></div>
        <div><span>专业</span><strong>{{ cardData.major || '-' }}</strong></div>
        <div><span>申报专业</span><strong>{{ cardData.reviewMajor || '-' }}</strong></div>
        <div><span>申报级别</span><strong>{{ cardData.applyLevel || '-' }}</strong></div>
        <div><span>现有职称</span><strong>{{ cardData.titleLevel || '-' }}</strong></div>
        <div><span>社保城市</span><strong>{{ cardData.ssCity || '-' }}</strong></div>
        <div><span>分配店铺</span><strong>{{ cardData.assignedTo || '未分配' }}</strong></div>
        <div><span>结论</span><strong>{{ cardData.conclusion || '-' }}</strong></div>
        <div class="register-confirm-wide"><span>备注</span><strong>{{ cardData.remarks || '-' }}</strong></div>
      </div>
      <template #footer>
        <el-button type="primary" :loading="registering" @click="submitRegister">登记并同步 CRM</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { DocumentCopy, MagicStick, Plus, RefreshLeft } from '@element-plus/icons-vue'
import { customerApi } from '../../services/api'
import { copyText } from '../../utils/clipboard'
import { extractInfo, formatCard } from '../../utils/customerExtract'
import { useResponsive } from '../../composables/useResponsive'

const props = defineProps({ user: Object, hasPerm: Function })
const emit = defineEmits(['registered'])
const { isMobile } = useResponsive()
const rawText = ref('')
const cardData = ref(null)
const stores = ref([])
const customers = ref([])
const storeDialog = ref(false)
const selectedStore = ref('')
const justRegistered = ref(false)
const registerConfirmVisible = ref(false)
const registering = ref(false)


function hasPerm(perm) {
  return props.hasPerm ? props.hasPerm(perm) : false
}

async function loadStores() {
  try {
    const data = await customerApi.stores()
    stores.value = data.stores || []
  } catch (err) {}
}

async function loadCustomers() {
  if (!hasPerm('viewData')) return
  try {
    const data = await customerApi.list({ all: true })
    customers.value = data.customers || []
  } catch (err) {}
}

function isDuplicate(row) {
  return customers.value.some(item => {
    const phoneDup = row.phone && item.phone && String(item.phone).trim() === String(row.phone).trim()
    const wechatDup = row.wechat && item.wechat && String(item.wechat).trim() === String(row.wechat).trim()
    return phoneDup || wechatDup
  })
}

async function extract() {
  if (!hasPerm('extract')) return ElMessage.warning('无信息提取权限')
  if (!rawText.value.trim()) return ElMessage.warning('请先粘贴内容')
  await loadCustomers()
  cardData.value = extractInfo(rawText.value)
  if (isDuplicate(cardData.value)) return ElMessage.warning('该客户已登记，不能重复登记')
  // 提取成功后自动复制一次整理后的信息卡，仍可通过页面按钮再次复制。
  await copyCard()
  selectedStore.value = ''
  if (hasPerm('register')) storeDialog.value = true
}

function selectStore(store) {
  selectedStore.value = store
}

function selectRandomStore() {
  if (!stores.value.length) return ElMessage.warning('请先配置至少一个店铺')
  selectedStore.value = stores.value[Math.floor(Math.random() * stores.value.length)]
}

async function copyCard() {
  if (!cardData.value) return
  try {
    await copyText(formatCard(cardData.value))
    ElMessage.success('已复制信息卡')
  } catch (err) {
    ElMessage.error(err.message || '复制失败')
  }
}

function openRegisterConfirm() {
  if (!cardData.value) return
  registerConfirmVisible.value = true
}

async function submitRegister() {
  if (!cardData.value) return
  registering.value = true
  try {
    await copyCard()
    const storeName = String(cardData.value.assignedTo || '').trim()
    if (storeName && !stores.value.includes(storeName)) {
      await customerApi.addStore(storeName)
      stores.value.push(storeName)
    }
    const data = await customerApi.create({ ...cardData.value, syncNow: true })
    registerConfirmVisible.value = false
    if (data.sync?.status === 'synced') ElMessage.success('已登记并同步到 CRM')
    else if (data.sync?.status === 'failed') ElMessage.warning(`已登记，但 CRM 同步失败：${data.sync.reason || '请稍后重试'}`)
    else ElMessage.warning(`已登记，暂未同步：${data.sync?.reason || '当前配置未满足同步条件'}`)
    emit('registered')
    justRegistered.value = true
    setTimeout(() => { justRegistered.value = false }, 5000)

  } catch (err) {
    ElMessage.error(err.message || '登记失败')
  } finally {
    registering.value = false
  }
}

async function confirmStore(storeName) {
  if (!cardData.value) return
  cardData.value.assignedTo = String(storeName || '').trim()
  storeDialog.value = false
  openRegisterConfirm()
}

onMounted(() => {
  loadStores()
  loadCustomers()
})
</script>
