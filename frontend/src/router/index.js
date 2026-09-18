import { createRouter, createWebHashHistory } from 'vue-router'
const CustomerManageView = () => import('../views/CustomerManageView.vue')
const OperationManageView = () => import('../views/OperationManageView.vue')
const PunchView = () => import('../views/PunchView.vue')
const SettingsView = () => import('../views/SettingsView.vue')

export const routes = [
  { path: '/', redirect: '/customer' },
  // v5.1.0 新路由
  { path: '/customer', name: 'customer', component: CustomerManageView },
  { path: '/operation', name: 'operation', component: OperationManageView },
  // { path: '/punch', name: 'punch', component: PunchView },
  { path: '/settings', redirect: '/settings/profile' },
  { path: '/settings/profile', name: 'settings-profile', component: SettingsView, meta: { section: 'profile' } },
  { path: '/settings/accounts', name: 'settings-accounts', component: SettingsView, meta: { section: 'accounts' } },
  { path: '/settings/customer-config', name: 'settings-customer-config', component: SettingsView, meta: { section: 'customer-config' } },
  { path: '/settings/sync', name: 'settings-sync', component: SettingsView, meta: { section: 'sync' } },
  { path: '/settings/audit', name: 'settings-audit', component: SettingsView, meta: { section: 'audit' } },
  { path: '/settings/face-enroll', name: 'settings-face-enroll', component: SettingsView, meta: { section: 'face-enroll' } },
  // v5.0.0 旧路由兼容 redirect
  { path: '/extract', redirect: '/customer' },
  { path: '/customers', redirect: '/customer' },
  { path: '/tasks', redirect: '/operation' },
  { path: '/stats', redirect: '/customer' },
  { path: '/:pathMatch(.*)*', redirect: '/customer' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
