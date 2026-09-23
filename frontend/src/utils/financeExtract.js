function nowText() {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
}

function phoneOf(text) {
  const direct = text.match(/1[3-9]\d{9}/)
  if (direct) return direct[0]
  const spaced = text.match(/1[3-9]\d[\s-]?\d{4}[\s-]?\d{4}/)
  return spaced ? spaced[0].replace(/[\s-]/g, '') : ''
}

function wechatOf(text, phone = phoneOf(text)) {
  const patterns = [
    /(?:微信号?|加微|VX|WX|WeChat)\s*[号是为：:\s]*([a-zA-Z0-9_-]{5,20})/i,
    /(?:微信号?)\s*[是为]?\s*([a-zA-Z][a-zA-Z0-9_-]{4,19})/i
  ]
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1]) return match[1]
  }
  if (/微信.{0,4}同.{0,4}手机|手机.{0,4}同.{0,4}微信|微信就是手机|手机号就是微信/.test(text) && phone) return phone
  const phoneFixed = text.match(/0\d{2,3}[\s-]?\d{7,8}/)
  if (phoneFixed) return phoneFixed[0].replace(/[\s-]/g, '')
  const qq = text.match(/(?:QQ|qq|扣扣|企鹅)\s*[号是为：:\s]*([1-9]\d{4,11})/)
  return qq?.[1] || ''
}

function orderNoOf(text) {
  const patterns = [
    /(?:订单号|订单编号|单号|电商单号|淘宝订单|JD订单|拼多多订单)[：:\s]*([a-zA-Z0-9]{8,32})/i,
    /(?:NO|Order)[.：:\s]*([a-zA-Z0-9]{8,32})/i
  ]
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1]) return match[1]
  }
  return ''
}

function serviceTypeOf(text) {
  const aliases = [
    ['代理记账', '代理记账'], ['代账', '代理记账'], ['记账报税', '代理记账'],
    ['公司注册', '公司注册'], ['工商注册', '公司注册'], ['注册公司', '公司注册'], ['营业执照', '公司注册'],
    ['注销公司', '变更注销'], ['公司注销', '变更注销'], ['税务注销', '变更注销'], ['注销', '变更注销'],
    ['变更注销', '变更注销'], ['股权变更', '变更注销'], ['法人变更', '变更注销'], ['地址变更', '变更注销'],
    ['税务筹划', '税务筹划'], ['商标注册', '商标注册'], ['商标', '商标注册'],
    ['资质代办', '资质代办'], ['建筑资质', '资质代办'], ['审计验资', '审计验资'], ['审计报告', '审计验资'],
    ['验资报告', '审计验资'], ['汇算清缴', '汇算清缴'], ['汇算', '汇算清缴'], ['开票代办', '开票代办'],
    ['代开发票', '开票代办'], ['开票', '开票代办'], ['高企', '高新企业申报'], ['高新企业申报', '高新企业申报']
  ]
  return aliases.find(([keyword]) => text.includes(keyword))?.[1] || '财税咨询'
}

function taxpayerTypeOf(text) {
  if (/一般纳税人|一般人/.test(text)) return '一般纳税人'
  if (/个体|个体户|个体工商户/.test(text)) return '个体工商户'
  if (/小规模|小规模纳税人/.test(text)) return '小规模纳税人'
  return ''
}

function cityOf(text) {
  return '北京 上海 广州 深圳 杭州 南京 苏州 成都 武汉 长沙 重庆 天津 西安 郑州 青岛 沈阳 济南 合肥 福州 厦门 南昌 石家庄 太原 南宁 昆明 贵阳 兰州 海口 宁波 温州 佛山 东莞 珠海 惠州 常州 徐州 绍兴 嘉兴 金华 台州 泉州 烟台 潍坊 临沂 洛阳 襄阳 赣州'.split(' ').find(city => text.includes(city)) || ''
}

function remarksOf(text, phone = '') {
  const parts = text.split(/[\n，,。；;]/).map(item => item.trim()).filter(item => item.length >= 3)
  return [...new Set(parts.filter(item => item !== phone && !/^[a-zA-Z0-9_-]{5,20}$/.test(item)))].slice(0, 5).join('，') || '无'
}

export function extractFinanceInfo(text) {
  const phone = phoneOf(text)
  const wechat = wechatOf(text, phone)
  const orderNo = orderNoOf(text)
  return {
    date: nowText(), name: '', phone, wechat, orderNo,
    serviceType: serviceTypeOf(text), taxpayerType: taxpayerTypeOf(text), city: cityOf(text),
    assignedTo: '', dealStatus: '', teacherWechat: '', qrCodeUrl: '', remarks: remarksOf(text, phone)
  }
}

export function validateFinanceOrderNo(value) {
  const orderNo = String(value || '').trim()
  if (!orderNo) return { valid: true, warning: '' }
  if (/^1[3-9]\d{9}$/.test(orderNo)) return { valid: false, warning: '订单号不能填写为手机号，请核对是否填错' }
  if (orderNo.length < 6) return { valid: false, warning: '订单号长度不足，常规订单号至少 6 位' }
  return { valid: true, warning: '' }
}

export function formatFinanceCard(data) {
  return [
    `录入时间：${data.date || ''}`,
    `联系方式：${[data.phone && `手机：${data.phone}`, data.wechat && `微信：${data.wechat}`].filter(Boolean).join('  ') || '未获取'}`,
    `分配店铺：${data.assignedTo || '未分配'}`,
    `订单编号：${data.orderNo || '无（提成 2 元/条）'}`,
    `业务类型：${data.serviceType || '未指定'}`,
    `纳税性质：${data.taxpayerType || '未填写'}`,
    `所在城市：${data.city || '未识别'}`,
    `备注：${data.remarks || '无'}`
  ].join(' ')
}
