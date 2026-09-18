<template>
  <div class="login-screen">
    <el-card class="login-card" shadow="always">
      <div class="login-logo">
        <el-icon><UserFilled /></el-icon>
      </div>
      <h1>创赢工具箱</h1>
      <p>登录后继续管理客户与任务</p>
      <el-form @submit.prevent="submit">
        <el-form-item>
          <el-input v-model="form.username" size="large" placeholder="用户名" :prefix-icon="User" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" size="large" placeholder="密码" type="password" show-password :prefix-icon="Lock" />
        </el-form-item>
        <el-checkbox v-model="remember">记住账号</el-checkbox>
        <el-button class="login-btn" type="primary" size="large" :loading="loading" @click="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Lock, User, UserFilled } from '@element-plus/icons-vue'
import { authApi } from '../services/api'

const emit = defineEmits(['login'])
const loading = ref(false)
const remember = ref(localStorage.getItem('zgj_remember') === '1')
const form = reactive({ username: localStorage.getItem('zgj_remember') === '1' ? (localStorage.getItem('zgj_user') || '') : '', password: '' })

async function submit() {
  if (!form.username || !form.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  loading.value = true
  try {
    const data = await authApi.login({ username: form.username, password: form.password })
    if (remember.value) {
      localStorage.setItem('zgj_remember', '1')
      localStorage.setItem('zgj_user', form.username)
    } else {
      localStorage.removeItem('zgj_remember')
      localStorage.removeItem('zgj_user')
    }
    localStorage.removeItem('zgj_pass')
    emit('login', data.user)
  } catch (err) {
    ElMessage.error(err.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>
