<template>
  <el-select
    :model-value="modelValue"
    filterable
    clearable
    :placeholder="placeholder || `选择${label}`"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <el-option v-for="item in options" :key="item" :label="item" :value="item" />
    <template #footer>
      <div class="config-select-footer">
        <el-input v-model="newValue" size="small" :placeholder="`新增${label}`" @keyup.enter="submit" />
        <el-button size="small" type="primary" :disabled="!newValue.trim()" @click="submit">新增</el-button>
      </div>
    </template>
  </el-select>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  label: { type: String, required: true },
  placeholder: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue', 'add'])
const newValue = ref('')

function submit() {
  const value = newValue.value.trim()
  if (!value) return
  emit('add', value)
  emit('update:modelValue', value)
  newValue.value = ''
}
</script>
