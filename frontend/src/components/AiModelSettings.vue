<template>
  <section class="ai-model-settings">
    <div class="settings-section-title">AI客户信息识别</div>
    <el-card shadow="never" class="settings-card">
      <template #header>
        <div class="panel-head">
          <div>
            <div class="settings-row-label">大模型识别配置</div>
            <div class="settings-row-desc">客户信息整理会将粘贴的聊天内容发送到服务端配置的大模型，API Key 仅加密保存在服务端。</div>
          </div>
          <el-switch v-model="form.enabled" active-text="启用" inactive-text="停用" />
        </div>
      </template>

      <el-form label-position="top" class="ai-model-form">
        <el-row :gutter="16">
          <el-col :xs="24" :sm="12">
            <el-form-item label="接口类型">
              <el-select v-model="form.provider" style="width: 100%">
                <el-option label="OpenAI 兼容接口" value="openai-compatible" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="模型名称">
              <el-input v-model="form.model" placeholder="例如：gpt-4o-mini、deepseek-chat" />
            </el-form-item>
          </el-col>
          <el-col :xs="24">
            <el-form-item label="接口地址">
              <el-input v-model="form.baseUrl" placeholder="例如：https://api.openai.com/v1" />
              <div class="ai-model-help">填写模型服务的 API 根地址，不要在末尾填写 `/chat/completions`。</div>
            </el-form-item>
          </el-col>
          <el-col :xs="24">
            <el-form-item label="API Key">
              <el-input v-model="form.apiKey" type="password" show-password autocomplete="new-password" :placeholder="form.hasApiKey ? '已配置，留空则保持不变' : '请输入 API Key'" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-form-item label="温度">
              <el-input-number v-model="form.temperature" :min="0" :max="2" :step="0.1" :precision="1" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-form-item label="最大输出 Token">
              <el-input-number v-model="form.maxTokens" :min="128" :max="4096" :step="64" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-form-item label="请求超时（毫秒）">
              <el-input-number v-model="form.timeoutMs" :min="5000" :max="60000" :step="1000" controls-position="right" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="ai-model-footer">
        <span class="ai-model-status" :class="form.enabled && form.hasApiKey && form.model ? 'is-ready' : ''">
          {{ form.enabled && form.hasApiKey && form.model ? '配置完整，可使用 AI 识别' : '请补充配置后启用' }}
        </span>
        <el-button type="primary" :loading="saving" @click="save">保存配置</el-button>
      </div>
    </el-card>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { aiApi } from '../services/api'

const saving = ref(false)
const form = reactive({
  enabled: false,
  provider: 'openai-compatible',
  baseUrl: 'https://api.openai.com/v1',
  model: '',
  apiKey: '',
  hasApiKey: false,
  temperature: 0.1,
  maxTokens: 800,
  timeoutMs: 60000
})

function applySettings(settings = {}) {
  form.enabled = !!settings.enabled
  form.provider = settings.provider || 'openai-compatible'
  form.baseUrl = settings.baseUrl || 'https://api.openai.com/v1'
  form.model = settings.model || ''
  form.apiKey = ''
  form.hasApiKey = !!settings.hasApiKey
  form.temperature = Number(settings.temperature ?? 0.1)
  form.maxTokens = Number(settings.maxTokens || 800)
  form.timeoutMs = Number(settings.timeoutMs || 60000)
}

async function load() {
  const data = await aiApi.settings()
  applySettings(data.settings)
}

async function save() {
  if (form.enabled && (!form.baseUrl.trim() || !form.model.trim()) ) return ElMessage.warning('启用前请填写接口地址和模型名称')
  saving.value = true
  try {
    const payload = {
      enabled: form.enabled,
      provider: form.provider,
      baseUrl: form.baseUrl.trim(),
      model: form.model.trim(),
      temperature: form.temperature,
      maxTokens: form.maxTokens,
      timeoutMs: form.timeoutMs
    }
    if (form.apiKey.trim()) payload.apiKey = form.apiKey.trim()
    const data = await aiApi.saveSettings(payload)
    applySettings(data.settings)
    ElMessage.success('AI识别配置已保存')
  } catch (error) {
    ElMessage.error(error.message || '保存失败')
  } finally {
    saving.value = false
  }
}

onMounted(() => load().catch(error => ElMessage.error(error.message || '加载AI配置失败')))
</script>
