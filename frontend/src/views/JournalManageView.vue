<template>
  <div class="page-container">
    <FinanceManageView :user="user" :has-perm="hasPerm" :reload-signal="reloadSignal" title="期刊登记表" :service-type-options="journalServiceTypes" />
  </div>
</template>

<script setup>
import FinanceManageView from './FinanceManageView.vue'

const journalServiceTypes = ['期刊业务']
defineProps({ user: Object, hasPerm: Function, reloadSignal: Number })
</script>
