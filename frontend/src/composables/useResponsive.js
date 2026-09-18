import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useResponsive() {
  const isMobile = ref(window.innerWidth <= 768)
  const update = () => { isMobile.value = window.innerWidth <= 768 }
  onMounted(() => window.addEventListener('resize', update))
  onBeforeUnmount(() => window.removeEventListener('resize', update))
  return { isMobile }
}
