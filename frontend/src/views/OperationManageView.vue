<template>
  <div class="page-container">
    <el-tabs v-model="activeTab" class="content-tabs">
      <el-tab-pane v-if="showTab('roi')" label="每日登记" name="roi" lazy>
        <RoiPanel :user="user" :has-perm="hasPerm" />
      </el-tab-pane>
      <el-tab-pane v-if="showTab('tasks')" label="运营工具箱" name="tasks" lazy>
        <TasksPanel :user="user" :has-perm="hasPerm" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TasksPanel from './panels/TasksPanel.vue'
import RoiPanel from './panels/RoiPanel.vue'

const props = defineProps({ user: Object, hasPerm: Function })
const activeTab = ref('')

function showTab(name) {
  if (name === 'tasks') return props.hasPerm('taskManage') || props.hasPerm('qrGen')
  if (name === 'roi') return props.hasPerm('roiView')
  return false
}

onMounted(() => {
  if (showTab('roi')) activeTab.value = 'roi'
  else if (showTab('tasks')) activeTab.value = 'tasks'
})
</script>
