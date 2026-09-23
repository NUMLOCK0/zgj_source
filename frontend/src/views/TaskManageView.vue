<template>
  <div class="page-container operation-child-page">
    <TasksPanel :user="user" :has-perm="hasPerm" only-tasks />
  </div>
</template>

<script setup>
import TasksPanel from './panels/TasksPanel.vue'

defineProps({ user: Object, hasPerm: Function })
</script>
