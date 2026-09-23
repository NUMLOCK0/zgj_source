<template><FinanceBusinessCenter :user="user" :has-perm="hasPerm" business-label="期刊" /></template>

<script setup>
import FinanceBusinessCenter from './panels/FinanceBusinessCenter.vue'
defineProps({ user: Object, hasPerm: Function, reloadSignal: Number })
</script>
