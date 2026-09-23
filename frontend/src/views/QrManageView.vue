<template>
  <div class="page-container operation-child-page">
    <section class="stack-page">
      <el-card shadow="never" class="tool-panel qr-card">
        <template #header><div class="panel-head"><div><strong>无痕码生成器</strong><div class="muted-text">组合商品后生成下单二维码与链接</div></div></div></template>
        <div class="qr-workbench">
          <section class="qr-editor">
            <div class="qr-link-entry"><el-input v-model="qrUrl" placeholder="粘贴商品链接，自动识别商品 ID 与 SKU" @change="parseUrl" /><el-button @click="parseUrl">识别链接</el-button></div>
            <div class="qr-items-head"><strong>商品清单</strong><el-button text type="primary" :icon="Plus" @click="addItem">添加商品</el-button></div>
            <div class="qr-items"><div v-for="(item, index) in qrItems" :key="index" class="qr-line"><span class="qr-num">{{ index + 1 }}</span><el-input v-model="item.itemId" placeholder="商品ID" /><el-input v-model="item.skuId" placeholder="SKU（可选）" /><el-input-number v-model="item.qty" :min="1" controls-position="right" /><el-button :icon="Delete" circle @click="removeItem(index)" /></div></div>
            <div class="qr-editor-actions"><el-button type="primary" @click="generateQr">生成二维码</el-button></div>
          </section>
          <aside class="qr-preview"><div v-if="qrImage" class="qr-result"><img :src="qrImage" alt="二维码" /><el-input v-model="qrResultUrl" readonly /><div class="actions"><el-button :icon="DocumentCopy" @click="copyQr">复制链接</el-button><el-button :icon="Download" @click="downloadQr">下载二维码</el-button></div></div><div v-else class="qr-preview-empty">生成后将在这里预览</div></aside>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, DocumentCopy, Download, Plus } from '@element-plus/icons-vue'
import QRCode from 'qrcode'
import { copyText } from '../utils/clipboard'

defineProps({ user: Object, hasPerm: Function })
const qrUrl = ref('')
const qrItems = ref([{ itemId: '', skuId: '', qty: 1 }])
const qrImage = ref('')
const qrResultUrl = ref('')

function addItem() { qrItems.value.push({ itemId: '', skuId: '', qty: 1 }) }
function parseUrl() {
  const id = qrUrl.value.match(/[?&]id=(\d+)/)?.[1]
  const sku = qrUrl.value.match(/[?&]skuId=(\d+)/)?.[1] || ''
  if (!id) return ElMessage.warning('未识别到商品ID')
  const target = qrItems.value.find(item => !item.itemId) || { itemId: '', skuId: '', qty: 1 }
  target.itemId = id; target.skuId = sku; target.qty = 1
  if (!qrItems.value.includes(target)) qrItems.value.push(target)
  qrUrl.value = ''
  ElMessage.success(`已识别：ID=${id}${sku ? ` SKU=${sku}` : ''}`)
}
function removeItem(index) { if (qrItems.value.length === 1) qrItems.value = [{ itemId: '', skuId: '', qty: 1 }]; else qrItems.value.splice(index, 1) }
async function generateQr() {
  const parts = qrItems.value.filter(item => item.itemId).map(item => `${item.itemId}_${item.qty || 1}${item.skuId ? `_${item.skuId}` : ''}`)
  if (!parts.length) return ElMessage.warning('请填写商品ID')
  qrResultUrl.value = `https://h5.m.taobao.com/cart/order.html?buyNow=true&buyParam=${parts.join(',')}`
  qrImage.value = await QRCode.toDataURL(qrResultUrl.value, { width: 220, margin: 2 })
  ElMessage.success('二维码已生成')
}
async function copyQr() { try { await copyText(qrResultUrl.value); ElMessage.success('链接已复制') } catch (error) { ElMessage.error(error.message || '复制失败') } }
function downloadQr() { const link = document.createElement('a'); link.href = qrImage.value; link.download = `无痕码_${Date.now()}.png`; link.click() }
</script>
