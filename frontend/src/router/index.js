import { createRouter, createWebHashHistory } from 'vue-router'
const CustomerManageView = () => import('../views/CustomerManageView.vue')
const DashboardView = () => import('../views/DashboardView.vue')
const FinanceManageView = () => import('../views/FinanceManageView.vue')
const JournalManageView = () => import('../views/JournalManageView.vue')
const FinanceLedgerView = () => import('../views/FinanceLedgerView.vue')
const TaskManageView = () => import('../views/TaskManageView.vue')
const QrManageView = () => import('../views/QrManageView.vue')
const PunchView = () => import('../views/PunchView.vue')
const SettingsView = () => import('../views/SettingsView.vue')

export const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  // v5.1.0 新路由
  { path: '/customer', name: 'customer', component: CustomerManageView },
  { path: '/finance', redirect: '/finance/list' },
  { path: '/finance/list', name: 'finance', component: FinanceManageView },
  { path: '/journal', redirect: '/journal/list' },
  { path: '/journal/list', name: 'journal', component: JournalManageView },
  { path: '/finance/ledger', name: 'finance-ledger', component: FinanceLedgerView },
  { path: '/operation', redirect: '/operation/tasks' },
  { path: '/operation/tasks', name: 'operation-tasks', component: TaskManageView },
  { path: '/operation/qr', name: 'operation-qr', component: QrManageView },
  // { path: '/punch', name: 'punch', component: PunchView },
  { path: '/settings', redirect: '/settings/business-config' },
  { path: '/settings/accounts', name: 'settings-accounts', component: SettingsView, meta: { section: 'accounts' } },
  { path: '/settings/business-config', name: 'settings-business-config', component: SettingsView, meta: { section: 'business-config' } },
  { path: '/settings/ai', name: 'settings-ai', component: SettingsView, meta: { section: 'ai' } },
  { path: '/settings/customer-config', redirect: '/settings/business-config' },
  { path: '/settings/finance-config', redirect: '/settings/business-config' },
  { path: '/settings/sync', name: 'settings-sync', component: SettingsView, meta: { section: 'sync' } },
  { path: '/settings/audit', name: 'settings-audit', component: SettingsView, meta: { section: 'audit' } },
  { path: '/settings/face-enroll', name: 'settings-face-enroll', component: SettingsView, meta: { section: 'face-enroll' } },
  // v5.0.0 旧路由兼容 redirect
  { path: '/extract', redirect: '/customer' },
  { path: '/customers', redirect: '/customer' },
  { path: '/tasks', redirect: '/operation/tasks' },
  { path: '/stats', redirect: '/customer' },
  { path: '/:pathMatch(.*)*', redirect: '/customer' }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
