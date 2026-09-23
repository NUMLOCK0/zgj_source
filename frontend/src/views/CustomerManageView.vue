<template>
  <div class="page-container">
    <CustomersPanel :user="user" :has-perm="hasPerm" :reload-signal="reloadSignal" @registered="$emit('registered')" />
  </div>
</template>

<script setup>
import CustomersPanel from './panels/CustomersPanel.vue'

defineProps({ user: Object, hasPerm: Function, reloadSignal: Number })
defineEmits(['registered'])
</script>
