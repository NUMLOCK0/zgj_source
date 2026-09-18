<template>
  <div class="page-container">
    <el-tabs v-model="activeTab" class="content-tabs">
      <el-tab-pane v-if="showTab('extract')" label="信息整理" name="extract" lazy>
        <ExtractPanel :user="user" :has-perm="hasPerm" :reload-signal="reloadSignal" @registered="$emit('registered')" />
      </el-tab-pane>
      <el-tab-pane v-if="showTab('customers')" label="登记表" name="customers" lazy>
        <CustomersPanel :user="user" :has-perm="hasPerm" :reload-signal="reloadSignal" @registered="$emit('registered')" />
      </el-tab-pane>
      <el-tab-pane v-if="showTab('stats')" label="留资统计" name="stats" lazy>
        <StatsPanel :user="user" :has-perm="hasPerm" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ExtractPanel from './panels/ExtractPanel.vue'
import CustomersPanel from './panels/CustomersPanel.vue'
import StatsPanel from './panels/StatsPanel.vue'

const props = defineProps({ user: Object, hasPerm: Function, reloadSignal: Number })
const emit = defineEmits(['registered'])
const activeTab = ref('')

function showTab(name) {
  if (name === 'extract') return props.hasPerm('extract')
  if (name === 'customers') return props.hasPerm('viewData')
  if (name === 'stats') return props.hasPerm('leadStats')
  return false
}

onMounted(() => {
  if (showTab('extract')) activeTab.value = 'extract'
  else if (showTab('customers')) activeTab.value = 'customers'
  else if (showTab('stats')) activeTab.value = 'stats'
})
</script>
