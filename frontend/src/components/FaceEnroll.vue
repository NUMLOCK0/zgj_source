<template>
  <el-dialog
    v-model="visible"
    :title="dialogTitle"
    :width="isMobile ? '94%' : '480px'"
    :top="isMobile ? '8vh' : '15vh'"
    :close-on-click-modal="false"
    class="responsive-dialog face-enroll-dialog"
    @close="onClose"
  >
    <div class="face-enroll-body">
      <!-- 摄像头区域 -->
      <div class="face-enroll-camera-wrap">
        <video ref="videoEl" autoplay muted playsinline class="face-enroll-video" :class="{ ready: cameraReady }"></video>
        <div v-if="!cameraReady" class="face-enroll-tip">
          <el-icon size="28"><Camera /></el-icon>
          <p>{{ cameraError || '正在启动摄像头...' }}</p>
          <p v-if="!isHttps" class="danger-text">人脸录入需要HTTPS环境</p>
        </div>
        <div v-if="capturing" class="face-enroll-overlay">
          <div class="face-enroll-overlay-text">
            <el-icon class="is-loading" size="24"><Loading /></el-icon>
            <span>正在采集人脸数据...</span>
          </div>
        </div>
        <div v-if="cameraReady" class="face-enroll-frame"></div>
        <div v-if="faceDetected && cameraReady" class="face-enroll-detected-badge">✓ 已检测到人脸</div>
      </div>

      <!-- 状态提示 -->
      <div class="face-enroll-status">
        <div v-if="!modelsLoaded && !cameraError" class="face-enroll-model-tip">
          <el-icon class="is-loading"><Loading /></el-icon>
          正在加载人脸识别模型...
        </div>
        <div v-if="captureMessage" :class="['face-enroll-msg', captureMessageType]">
          {{ captureMessage }}
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="face-enroll-actions">
        <el-button @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          :loading="capturing"
          :disabled="!cameraReady || !modelsLoaded"
          @click="captureFace"
        >
          {{ hasExistingFace ? '重新采集' : '采集并录入' }}
        </el-button>
      </div>

      <!-- 已录入信息 -->
      <div v-if="hasExistingFace" class="face-enroll-existing">
        <el-icon><CircleCheckFilled /></el-icon>
        <span>{{ targetUser?.name }} 已录入人脸数据</span>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Camera, Loading, CircleCheckFilled } from '@element-plus/icons-vue'
import * as faceapi from 'face-api.js'
import { punchApi } from '../services/api'
import { useResponsive } from '../composables/useResponsive'

const props = defineProps({
  modelValue: Boolean,
  targetUser: Object
})
const emit = defineEmits(['update:modelValue', 'enrolled'])

const { isMobile } = useResponsive()
const visible = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

const videoEl = ref(null)
const cameraReady = ref(false)
const cameraError = ref('')
const modelsLoaded = ref(false)
const capturing = ref(false)
const captureMessage = ref('')
const captureMessageType = ref('')
const faceDetected = ref(false)
const hasExistingFace = ref(false)
let mediaStream = null

const dialogTitle = computed(() => {
  if (props.targetUser) {
    return hasExistingFace.value ? `重新录入人脸 - ${props.targetUser.name}` : `录入人脸 - ${props.targetUser.name}`
  }
  return '录入人脸'
})

const isHttps = computed(() => location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')

const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights'

async function loadModels() {
  if (modelsLoaded.value) return
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
    modelsLoaded.value = true
  } catch (err) {
    // CDN失败，尝试本地
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/weights')
      await faceapi.nets.faceLandmark68Net.loadFromUri('/weights')
      await faceapi.nets.faceRecognitionNet.loadFromUri('/weights')
      modelsLoaded.value = true
    } catch (err2) {
      cameraError.value = '人脸识别模型加载失败，请检查网络'
    }
  }
}

async function startCamera() {
  if (!isHttps.value) { cameraError.value = '需要HTTPS环境'; return }
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: { width: 480, height: 360, facingMode: 'user' } })
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
  faceDetected.value = false
}

async function captureFace() {
  if (!cameraReady.value || !modelsLoaded.value || !props.targetUser) return
  capturing.value = true
  captureMessage.value = ''
  try {
    const detection = await faceapi.detectSingleFace(videoEl.value, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
    if (!detection) {
      captureMessage.value = '未检测到人脸，请正对摄像头'
      captureMessageType.value = 'error'
      return
    }
    const descriptor = Array.from(detection.descriptor)
    await punchApi.addEmployee({
      name: props.targetUser.name || props.targetUser.username,
      userId: props.targetUser.id,
      descriptor
    })
    hasExistingFace.value = true
    captureMessage.value = `${props.targetUser.name || props.targetUser.username} 人脸录入成功！`
    captureMessageType.value = 'success'
    emit('enrolled', props.targetUser.id)
    setTimeout(() => { visible.value = false }, 1500)
  } catch (err) {
    captureMessage.value = err.message || '录入失败'
    captureMessageType.value = 'error'
  } finally {
    capturing.value = false
  }
}

function onClose() {
  stopCamera()
  captureMessage.value = ''
}

async function checkExistingFace() {
  if (!props.targetUser) return
  try {
    const data = await punchApi.employees()
    const employees = data.employees || []
    hasExistingFace.value = employees.some(e => e.userId === props.targetUser.id)
  } catch (err) {
    hasExistingFace.value = false
  }
}

watch(visible, async (val) => {
  if (val) {
    captureMessage.value = ''
    cameraError.value = ''
    await checkExistingFace()
    await loadModels()
    await startCamera()
  } else {
    stopCamera()
  }
})

onMounted(() => {
  loadModels()
})

onUnmounted(() => {
  stopCamera()
})
</script>

<style scoped>
.face-enroll-body { display: flex; flex-direction: column; gap: 16px; }
.face-enroll-camera-wrap { position: relative; width: 100%; aspect-ratio: 4/3; background: #f0f2f5; border-radius: 12px; overflow: hidden; }
.face-enroll-video { width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1); }
.face-enroll-video:not(.ready) { display: none; }
.face-enroll-tip { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #909399; }
.face-enroll-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content: center; color: #fff; }
.face-enroll-overlay-text { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.face-enroll-frame { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 60%; aspect-ratio: 3/4; border: 2px dashed rgba(7,193,96,.4); border-radius: 50%; pointer-events: none; }
.face-enroll-detected-badge { position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); padding: 4px 12px; background: rgba(7,193,96,.15); color: #07c160; border-radius: 12px; font-size: 13px; font-weight: 600; }
.face-enroll-status { min-height: 40px; }
.face-enroll-model-tip { color: #909399; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px; }
.face-enroll-msg { padding: 10px 14px; border-radius: 8px; font-weight: 600; text-align: center; }
.face-enroll-msg.success { background: #f0f9eb; color: #07c160; }
.face-enroll-msg.error { background: #fef0f0; color: #f56c6c; }
.face-enroll-actions { display: flex; gap: 10px; justify-content: flex-end; }
.face-enroll-existing { display: flex; align-items: center; gap: 6px; padding: 8px 14px; background: #f0f9eb; border-radius: 8px; color: #07c160; font-size: 13px; font-weight: 600; }
</style>
