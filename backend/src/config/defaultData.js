module.exports = {
  users: [],
  customers: [],
  financeCustomers: [],
  projects: [],
  tasks: [],
  nextCustomerId: 1,
  nextFinanceCustomerId: 1,
  nextUserId: 1,
  nextTaskId: 1,
  nextProjectId: 1,
  stores: ['育酷宝', '学立桥', '育启通', '酷小爵'],
  financeStores: ['财税1号店', '财税2号店', '财税旗舰店'],
  customerConfigs: {
    degrees: ['中专/高中', '大专', '本科', '硕士', '博士'],
    majors: [],
    applyLevels: ['初级', '中级', '副高', '正高']
  },
  financeConfigs: {
    serviceTypes: ['代理记账', '公司注册', '税务筹划', '商标注册', '资质代办', '审计验资', '变更注销', '其他'],
    taxpayerTypes: ['小规模纳税人', '一般纳税人', '个体工商户']
  },
  aiConfig: {
    enabled: false,
    provider: 'openai-compatible',
    baseUrl: 'https://api.openai.com/v1',
    model: '',
    encryptedApiKey: '',
    temperature: 0.1,
    maxTokens: 800,
    timeoutMs: 60000
  },
  wukongSync: {
    enabled: true,
    baseUrl: '',
    username: '',
    encryptedPassword: '',
    encryptedToken: '',
    encryptedSessionId: '',
    tokenUpdatedAt: '',
    tokenStatus: 'missing',
    tokenCheckedAt: '',
    syncStores: []
  },
  wukongSyncQueue: [],
  consultStats: [],
  nextConsultStatId: 1,
  financeConsultStats: [],
  nextFinanceConsultStatId: 1,
  financeLedger: [],
  nextFinanceLedgerId: 1,
  wecomBotConfig: {
    globalEnabled: true,
    groups: [],
    nextGroupId: 1,
    nextBotId: 1
  },
  auditLogs: [],
  nextAuditLogId: 1,
  taskIps: {},
  taskFps: {},
  roiProducts: [],
  roiRecords: [],
  roiSettings: { roiThreshold: 2.5, perfUnit: 50000, perfPerUnit: 1000, perfCap: 8000 },
  nextRoiProductId: 1,
  nextRoiRecordId: 1
};
