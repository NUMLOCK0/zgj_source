export async function api(method, url, body, options = {}) {
  const opts = {
    method,
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' }
  }
  if (body !== undefined) opts.body = JSON.stringify(body)

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), options.timeout || 15000)
  let res
  try {
    res = await fetch(url, { ...opts, signal: controller.signal })
  } catch (e) {
    if (e.name === 'AbortError') throw new Error('请求超时，请稍后重试')
    throw new Error('网络连接失败，请检查网络后重试')
  } finally {
    clearTimeout(timer)
  }
  if (res.status === 401 && url !== '/api/login') {
    const err = new Error('登录已过期')
    err.status = 401
    throw err
  }
  if (!res.ok) {
    let data = null
    try { data = await res.json() } catch (e) {}
    throw new Error((data && data.error) || `服务器错误(${res.status})`)
  }
  const data = await res.json().catch(() => ({}))
  if (data && data.error) throw new Error(data.error)
  return data
}

export const authApi = {
  me: () => api('GET', '/api/me'),
  login: (payload) => api('POST', '/api/login', payload),
  logout: () => api('POST', '/api/logout'),
  changePassword: (payload) => api('POST', '/api/change-password', payload)
}

export const aiApi = {
  settings: () => api('GET', '/api/ai-settings'),
  saveSettings: (payload) => api('PUT', '/api/ai-settings', payload),
  extract: (text, type = 'customer') => api('POST', '/api/ai-extract', { text, type }, { timeout: 65000 })
}

export const customerApi = {
  list: ({ page = 1, pageSize = 20, keyword = '', dateFilter = 'all', employee = '', store = '', all = false, startDate = '', endDate = '' } = {}) => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize), keyword, dateFilter, employee, store })
    if (all) params.set('all', '1')
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    return api('GET', `/api/customers?${params.toString()}`)
  },
  create: (payload) => api('POST', '/api/customers', payload),
  update: (id, payload) => api('PUT', `/api/customers/${id}`, payload),
  markInvalid: (id, invalid) => api('PUT', `/api/customers/${id}/invalid`, { invalid }),
  remove: (id) => api('DELETE', `/api/customers/${id}`),
  batchRemove: (ids) => api('POST', '/api/customers/batch-delete', { ids }),
  batchAssign: (ids, assignedTo) => api('POST', '/api/customers/batch-assign', { ids, assignedTo }),
  clear: () => api('DELETE', '/api/customers/clear'),
  stores: () => api('GET', '/api/stores'),
  addStore: (name) => api('POST', '/api/stores', { name }),
  configs: () => api('GET', '/api/customer-configs'),
  addConfig: (type, value) => api('POST', `/api/customer-configs/${type}`, { value }),
  removeConfig: (type, value) => api('DELETE', `/api/customer-configs/${type}?value=${encodeURIComponent(value)}`),
  creators: () => api('GET', '/api/customers/creators'),
  checkDuplicate: ({ phone = '', wechat = '', teacherWechat = '', orderNo = '', scope = 'customer' } = {}) => {
    const params = new URLSearchParams({ phone, wechat, teacherWechat, orderNo, scope })
    return api('GET', `/api/customers/check-duplicate?${params.toString()}`)
  },
  uploadQrcode: (imageBase64, filename = 'qrcode.png') => api('POST', '/api/upload-qrcode', { imageBase64, filename }),
  exportUrl: ({ keyword = '', dateFilter = 'all', employee = '', store = '', startDate = '', endDate = '' } = {}) => {
    const params = new URLSearchParams({ keyword, dateFilter, employee, store })
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    return `/api/customers/export?${params.toString()}`
  },
  importRows: (payload) => api('POST', '/api/customers/import', payload)
}

export const dashboardApi = {
  stats: () => api('GET', '/api/dashboard/stats'),
  salaryExportUrl: (month) => `/api/finance/salary-reconcile-export?month=${encodeURIComponent(month)}`
}

export const financeApi = {
  list: ({ page = 1, pageSize = 20, keyword = '', hasOrder = '', serviceType = '', startDate = '', endDate = '' } = {}) => {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize), keyword, hasOrder, serviceType, startDate, endDate })
    return api('GET', `/api/finance-customers?${params.toString()}`)
  },
  create: (payload) => api('POST', '/api/finance-customers', payload),
  update: (id, payload) => api('PUT', `/api/finance-customers/${id}`, payload),
  remove: (id) => api('DELETE', `/api/finance-customers/${id}`),
  batchRemove: (ids) => api('POST', '/api/finance-customers/batch-delete', { ids }),
  importRows: (payload) => api('POST', '/api/finance-customers/import', payload),
  configs: () => api('GET', '/api/finance-configs'),
  addConfig: (type, value) => api('POST', `/api/finance-configs/${type}`, { value }),
  removeConfig: (type, value) => api('DELETE', `/api/finance-configs/${type}?value=${encodeURIComponent(value)}`),
  exportUrl: (params = {}) => `/api/finance-customers/export?${new URLSearchParams(params).toString()}`
}

export const ledgerApi = {
  records: (params = {}) => api('GET', `/api/ledger/records?${new URLSearchParams(params).toString()}`),
  create: (payload) => api('POST', '/api/ledger/records', payload),
  update: (id, payload) => api('PUT', `/api/ledger/records/${id}`, payload),
  remove: (id) => api('DELETE', `/api/ledger/records/${id}`),
  uploadReceipt: (payload) => api('POST', '/api/ledger/upload-receipt', payload),
  exportUrl: (params = {}) => `/api/ledger/export?${new URLSearchParams(params).toString()}`
}

export const userApi = {
  list: () => api('GET', '/api/users'),
  create: (payload) => api('POST', '/api/users', payload),
  update: (id, payload) => api('PUT', `/api/users/${id}`, payload),
  remove: (id) => api('DELETE', `/api/users/${id}`)
}

export const syncApi = {
  settings: () => api('GET', '/api/wukong-sync-settings'),
  saveSettings: (payload) => api('PUT', '/api/wukong-sync-settings', payload),
  fetchToken: (payload) => api('POST', '/api/wukong-sync-settings/token', payload),
  validateToken: () => api('POST', '/api/wukong-sync-settings/validate-token'),
  queue: (page = 1, pageSize = 20) => api('GET', `/api/wukong-sync-queue?page=${page}&pageSize=${pageSize}`),
  runQueue: () => api('POST', '/api/wukong-sync-queue/sync'),
  botGroups: () => api('GET', '/api/wecom-bot-groups'),
  toggleBotGroups: (enabled) => api('POST', '/api/wecom-bot-groups/toggle-global', { enabled }),
  createBotGroup: (payload) => api('POST', '/api/wecom-bot-groups', payload),
  updateBotGroup: (id, payload) => api('PUT', `/api/wecom-bot-groups/${id}`, payload),
  removeBotGroup: (id) => api('DELETE', `/api/wecom-bot-groups/${id}`),
  addBot: (groupId, payload) => api('POST', `/api/wecom-bot-groups/${groupId}/bots`, payload),
  updateBot: (groupId, botId, payload) => api('PUT', `/api/wecom-bot-groups/${groupId}/bots/${botId}`, payload),
  removeBot: (groupId, botId) => api('DELETE', `/api/wecom-bot-groups/${groupId}/bots/${botId}`),
  resetBotCounts: (groupId) => api('POST', `/api/wecom-bot-groups/${groupId}/reset-counts`),
  testBot: (groupId, botId) => api('POST', `/api/wecom-bot-groups/${groupId}/bots/${botId}/test`)
}

export const taskApi = {
  projects: () => api('GET', '/api/admin/projects'),
  createProject: (name) => api('POST', '/api/admin/projects', { name }),
  updateProject: (id, payload) => api('PUT', `/api/admin/projects/${id}`, payload),
  removeProject: (id) => api('DELETE', `/api/admin/projects/${id}`),
  importTasks: (payload) => api('POST', '/api/admin/tasks/import', payload),
  addTasksWithImages: (payload) => api('POST', '/api/admin/tasks/batch-add-with-images', payload),
  stats: (project) => api('GET', `/api/admin/tasks/stats?project=${project}`),
  list: (project, page, filter, q = '', pageSize = 50) => api('GET', `/api/admin/tasks/list?project=${project}&page=${page}&pageSize=${pageSize}&filter=${filter}&q=${encodeURIComponent(q)}`),
  exportTasks: (project, filter, q = '') => api('GET', `/api/admin/tasks/export?project=${project}&filter=${filter}&q=${encodeURIComponent(q)}`),
  removeTask: (id) => api('DELETE', `/api/admin/tasks/${id}`),
  clearTasks: (project) => api('DELETE', `/api/admin/tasks/clear?project=${project}`)
}

export const statsApi = {
  leadDay: (date) => api('GET', `/api/lead-stats?date=${date}`),
  leadSummary: (startDate, endDate) => api('GET', `/api/lead-stats/summary?startDate=${startDate}&endDate=${endDate}`),
  saveConsult: (payload) => api('POST', '/api/consult-stats', payload),
  saveInvalid: (payload) => api('POST', '/api/consult-stats', { date: payload.date, username: payload.username, invalidConsultCount: payload.invalidConsult }),
  batchConsult: (entries) => api('POST', '/api/consult-stats/batch', { entries }),
  salaryDetails: (month) => api('GET', `/api/salary/details?month=${month}`),
  auditLogs: (page, pageSize, action = '', username = '') => api('GET', `/api/audit-logs?page=${page}&pageSize=${pageSize}&action=${encodeURIComponent(action)}&username=${encodeURIComponent(username)}`)
}

export const auditApi = {
  recordLogs: (recordType, recordId) => api('GET', `/api/record-logs/${encodeURIComponent(recordType)}/${encodeURIComponent(recordId)}`)
}

export const financeStatsApi = {
  leadDay: (date) => api('GET', '/api/finance-lead-stats?date=' + date),
  leadSummary: (startDate, endDate) => api('GET', '/api/finance-lead-stats/summary?startDate=' + startDate + '&endDate=' + endDate),
  saveConsult: (payload) => api('POST', '/api/finance-consult-stats', payload)
}

// === v5.1.0 新增 ===
export const roiApi = {
  products: () => api('GET', '/api/roi/products'),
  addProduct: (payload) => api('POST', '/api/roi/products', payload),
  updateProduct: (id, payload) => api('PUT', `/api/roi/products/${id}`, payload),
  removeProduct: (id) => api('DELETE', `/api/roi/products/${id}`),
  records: (params = {}) => {
    const p = new URLSearchParams(params)
    return api('GET', `/api/roi/records?${p.toString()}`)
  },
  saveRecord: (payload) => api('POST', '/api/roi/records', payload),
  dashboard: (period, date, all = false) => api('GET', `/api/roi/dashboard?period=${period}&date=${date}${all ? '&all=1' : ''}`),
  settings: () => api('GET', '/api/roi/settings'),
  saveSettings: (payload) => api('PUT', '/api/roi/settings', payload),
  salary: (period, date) => api('GET', `/api/roi/salary?period=${period}&date=${date}`)
}

export const punchApi = {
  records: (params = {}) => {
    const p = new URLSearchParams(params)
    return api('GET', `/api/punch/records?${p.toString()}`)
  },
  checkin: (descriptor) => api('POST', '/api/punch/checkin', { descriptor }),
  checkout: (descriptor) => api('POST', '/api/punch/checkout', { descriptor }),
  employees: () => api('GET', '/api/punch/employees'),
  addEmployee: (payload) => api('POST', '/api/punch/employees', payload),
  removeEmployee: (id) => api('DELETE', `/api/punch/employees/${id}`),
  settings: () => api('GET', '/api/punch/settings'),
  saveSettings: (payload) => api('PUT', '/api/punch/settings', payload),
  exportCsv: (start, end) => api('GET', `/api/punch/export?start=${start}&end=${end}`),
  monthly: (month) => api('GET', `/api/punch/monthly?month=${month}`),
  updateAttendance: (payload) => api('PUT', '/api/punch/attendance', payload),
  deleteRecord: (id) => api('DELETE', `/api/punch/records/${id}`),
  updateRecord: (id, payload) => api('PUT', `/api/punch/records/${id}`, payload),
  addRecord: (payload) => api('POST', '/api/punch/records', payload)
}
