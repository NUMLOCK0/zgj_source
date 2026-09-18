function todayText() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

export function extractPhone(text) {
  const compact = text.match(/1[3-9]\d{9}/)
  if (compact) return compact[0]
  const spaced = text.match(/1[3-9]\d[\s-]?\d{4}[\s-]?\d{4}/)
  return spaced ? spaced[0].replace(/[\s-]/g, '') : ''
}

export function extractWechat(text, phone = extractPhone(text)) {
  const patterns = [
    /(?:微信号?|加微|VX|vx|WX|wx|WeChat)\s*[号是为：:\s]*([a-zA-Z0-9_-]{5,20})/i,
    /(?:微信号?)\s*[是为]?\s*([a-zA-Z][a-zA-Z0-9_-]{4,19})/i
  ]
  for (const re of patterns) {
    const match = text.match(re)
    if (match?.[1]) return match[1]
  }
  if (/微信.{0,4}同.{0,4}手机|手机.{0,4}同.{0,4}微信|微信就是手机|手机号就是微信/.test(text) && phone) return phone
  const fixed = text.match(/0\d{2,3}[\s-]?\d{7,8}/)
  if (fixed) return fixed[0].replace(/[\s-]/g, '')
  const qq = text.match(/(?:QQ|qq|扣扣|企鹅)\s*[号是为：:\s]*([1-9]\d{4,11})/i)
  if (qq?.[1]) return qq[1]
  const nums = text.match(/\b[1-9]\d{5,10}\b/g) || []
  const plainNum = nums.find(n => !/^1[3-9]\d{9}$/.test(n))
  if (plainNum) return plainNum
  const codes = text.match(/[a-zA-Z0-9_-]{5,20}/g) || []
  const code = codes.find(s => !/^1[3-9]\d{9}$/.test(s) && s !== phone && /^[a-zA-Z]/.test(s))
  if (code) return code
  const otherNums = text.match(/\d{6,20}/g) || []
  return otherNums.find(n => !/^1[3-9]\d{9}$/.test(n)) || ''
}

export function extractReviewMajor(text) {
  const specMap = [
    ['建筑','建筑工程'],['市政','市政工程'],['机电','机电工程'],['电气','电气工程'],['机械','机械工程'],
    ['化工','化工工程'],['电子','电子信息'],['计算机','计算机工程'],['水利','水利工程'],['公路','公路工程'],
    ['铁路','铁路工程'],['道路','交通运输工程'],['港航','港口与航道工程'],['港口','港口与航道工程'],
    ['航道','港口与航道工程'],['航空','航空航天工程'],['航天','航空航天工程'],['矿业','矿业工程'],
    ['冶金','冶金工程'],['能源','能源工程'],['光伏','新能源工程'],['风电','新能源工程'],['新能源','新能源工程'],
    ['环保','环境工程'],['环境','环境工程'],['测绘','测绘工程'],['地质','地质工程'],['林业','林业工程'],
    ['轻工','轻工工程'],['纺织','纺织工程'],['食品','食品工程'],['交通','交通运输工程'],['运输','交通运输工程'],
    ['自动化','自动化'],['通信','通信工程'],['材料','材料工程'],['生物','生物工程'],['安全','安全工程'],
    ['造价','工程造价'],['土木','土木工程'],['结构','结构工程'],['给排水','给排水'],['暖通','暖通工程'],
    ['岩土','岩土工程'],['规划','城市规划'],['园林','风景园林'],['电力','电力工程'],['智能制造','智能制造'],
    ['物联网','物联网工程'],['大数据','大数据工程'],['人工智能','人工智能'],['网络安全','网络安全'],
    ['集成电路','集成电路'],['工业设计','工业设计'],['煤炭','矿业工程'],['煤矿','矿业工程'],
    ['石油','化工工程'],['天然气','化工工程'],['热能','能源工程'],['核能','能源工程'],['农业','农业工程'],
    ['桥梁','公路工程'],['隧道','公路工程'],['路基','公路工程'],['路面','公路工程'],['焊接','机械工程'],
    ['铸造','机械工程'],['锻造','机械工程'],['模具','机械工程'],['数控','机械工程'],['机床','机械工程'],
    ['发电','电力工程'],['输配电','电气工程'],['变电','电气工程'],['供电','电力工程'],['弱电','电气工程'],
    ['强电','电气工程'],['软件开发','计算机工程'],['编程','计算机工程'],['网络工程','计算机工程'],
    ['路桥','公路工程'],['道桥','公路工程'],['铁道','交通运输工程'],['轨道交通','交通运输工程'],
    ['地铁','交通运输工程'],['高铁','交通运输工程'],['船舶','港口与航道工程'],['锅炉','能源工程'],
    ['汽轮机','能源工程'],['制冷','暖通工程'],['空调','暖通工程'],['污水处理','环境工程'],
    ['绿化','风景园林'],['景观','风景园林'],['装修','建筑工程'],['装饰','建筑工程'],
    ['消防','安全工程'],['施工','建筑工程'],['监理','工程管理'],['检测','测绘工程'],['试验','测绘工程']
  ]
  const found = [...new Set(specMap.filter(([key]) => text.includes(key)).map(([, value]) => value))]
  if (found.length) return found.join('/')
  const patterns = [
    /(?:报|评|申报|评审|专业方向|专业是|专业[是为：:])[\s:：]*([\u4e00-\u9fa5A-Za-z]{2,12}(?:工程|专业|技术|设计|施工|管理|造价|监理|勘察|规划|研发))/,
    /(?:做|干|搞|从事|搞的|做的|干的)[的]?\s*([\u4e00-\u9fa5A-Za-z]{2,10}(?:工程|专业|技术|设计|施工|管理|造价|监理|勘察|规划|研发|安装|调试|运维|维修|操作))/
  ]
  for (const re of patterns) {
    const m = text.match(re)
    if (m?.[1]) return m[1]
  }
  return ''
}

export function extractEducation(text) {
  let degree = ''
  let major = ''
  let gradYear = ''
  if (/博士|博士研究生/.test(text)) degree = '博士'
  else if (/硕士|研究生|MBA|EMBA|专硕/.test(text)) degree = '硕士'
  else if (/本科|大学本科|学士/.test(text)) degree = '本科'
  else if (/大专|专科|高职/.test(text)) degree = '大专'
  else if (/中专|中技|技校|职高|高中/.test(text)) degree = '中专/高中'
  const majorM = text.match(/(?:专业|学的|学的是)[是为：:\s]*([\u4e00-\u9fa5A-Za-z]{2,15})/)
  if (majorM) major = majorM[1].replace(/专业$/, '')
  const yearM = text.match(/(?:毕业|毕业于|毕业时间)[于]?\s*(20\d{2}|19\d{2})/)
  if (yearM) gradYear = Number(yearM[1])
  return { degree, major, gradYear, text: [degree, major].filter(Boolean).join('，') || '未识别' }
}

export function extractTitle(text) {
  let level = ''
  let year = ''
  if (/正高|正高级|教授级/.test(text)) level = '正高'
  else if (/副高|高级工程师|副高级/.test(text)) level = '副高'
  else if (/中级|工程师(?![师级])/.test(text) && !/高级/.test(text)) level = '中级'
  else if (/初级|助理工程师|技术员|员级/.test(text)) level = '初级'
  else if (/没有|还没|无|未评/.test(text) && /职称/.test(text)) level = '无'
  if (level) {
    const ym = text.match(new RegExp(`(?:${level}|高级工程师|工程师|取得|评[的]?|获得|拿到|下[的]?)[^\\d]*(20\\d{2}|19\\d{2})`))
    if (ym) year = Number(ym[1])
  }
  return { level, year, text: level || '未识别' }
}

export function extractSocialSecurity(text) {
  let city = ''
  let years = ''
  const cities = '北京 上海 广州 深圳 杭州 南京 苏州 成都 武汉 长沙 重庆 天津 西安 郑州 青岛 沈阳 大连 哈尔滨 长春 济南 合肥 福州 厦门 南昌 石家庄 太原 南宁 昆明 贵阳 兰州 银川 西宁 乌鲁木齐 拉萨 呼和浩特 海口 三亚 无锡 宁波 温州 佛山 东莞 珠海 中山 惠州 常州 徐州 保定 洛阳 襄阳 咸宁 赣州 秦皇岛 唐山 廊坊 株洲 湘潭 衡阳 岳阳 常德 绵阳 德阳 宜宾 南充 遵义 曲靖 宝鸡 咸阳 渭南 开封 新乡 许昌 平顶山 烟台 潍坊 临沂 淄博 台州 绍兴 金华 嘉兴 湖州 芜湖 蚌埠 安庆 马鞍山 泉州 漳州 莆田 九江 菏泽 聊城 德州 滨州 东营 衡水 张家口 承德 沧州 邯郸 邢台 包头 鄂尔多斯 赤峰 通辽 鞍山 抚顺 锦州 营口 阜新 辽阳 盘锦 吉林 四平 辽源 通化 齐齐哈尔 牡丹江 大庆 伊春 柳州 桂林 梧州 北海 钦州 贵港 玉林 百色 贺州 河池 泸州 广元 遂宁 内江 乐山 眉山 广安 达州 雅安 巴中 资阳 六盘水 安顺 毕节 铜仁 玉溪 保山 昭通 丽江 普洱 临沧 铜川 延安 汉中 榆林 安康 商洛 金昌 白银 天水 武威 张掖 平凉 酒泉 庆阳 定西 陇南 海东 石嘴山 吴忠 固原 中卫 克拉玛依 吐鲁番 哈密'.split(' ')
  city = cities.find(c => text.includes(c)) || ''
  const ym = text.match(/(?:社保|保险)[^\d]*(\d+)\s*年/)
  if (ym) years = ym[1]
  const hasSocialSecurity = /社保|保险|缴纳|交[了在]?社保/.test(text)
  return { city, years, hasSocialSecurity, text: city || (hasSocialSecurity ? '有社保（详情未识别）' : '未识别') }
}

export function extractRemarks(text) {
  const phone = extractPhone(text)
  const kept = text.split(/[\n，,。；;]/).map(line => line.trim()).filter(line => {
    if (!line || line.length < 3) return false
    if (phone && line === phone) return false
    if (/^[a-zA-Z0-9_-]{5,20}$/.test(line) && /微信|wx/i.test(text)) return false
    if (/^(博士|硕士|研究生|本科|大专|专科|中专|高中)$/.test(line)) return false
    if (/^(初级|中级|副高|正高|高级工程师|助理工程师|工程师|技术员|无职称)$/.test(line)) return false
    return true
  })
  return [...new Set(kept)].slice(0, 6).join('，') || '无'
}

export function autoJudge(edu, title, ss, rawText) {
  const currentYear = new Date().getFullYear()
  const issues = []
  let targetLevel = ''
  if (/报副高|评副高|副高级|报高级|评高级/.test(rawText)) targetLevel = '副高'
  else if (/报正高|评正高|正高级/.test(rawText)) targetLevel = '正高'
  else if (/报中级|评中级|中级职称/.test(rawText)) targetLevel = '中级'
  else if (title.level === '无' || title.level === '初级') targetLevel = '中级'
  else if (title.level === '中级') targetLevel = '副高'
  else if (title.level === '副高') targetLevel = '正高'
  else targetLevel = '待确认'

  if (edu.degree && title.level) {
    if (targetLevel === '正高' && ['大专', '中专/高中'].includes(edu.degree)) issues.push('学历不足，不能申报正高级')
    if (targetLevel === '副高' && ['无', '初级'].includes(title.level)) issues.push('申报副高需先取得中级职称')
    if (targetLevel === '中级' && edu.gradYear) {
      const years = currentYear - edu.gradYear
      if (edu.degree === '大专' && years < 7) issues.push(`大专毕业需满7年，目前${years}年`)
      if (edu.degree === '本科' && years < 5) issues.push(`本科毕业需满5年，目前${years}年`)
      if (edu.degree === '硕士' && years < 2) issues.push(`硕士毕业需满2年，目前${years}年`)
    }
    if (targetLevel === '副高' && title.year && currentYear - title.year < 5) issues.push(`中级取得需满5年，目前${currentYear - title.year}年`)
  }
  if (!ss.hasSocialSecurity) issues.push('无社保记录')
  if (/公务员|参公/.test(rawText)) issues.push('公务员不得申报职称评审')
  if (/退休|快退休/.test(rawText)) issues.push('接近退休年龄可能影响申报')
  if (!edu.degree && !title.level) return { type: '待确认', targetLevel, conclusion: '信息不足，需进一步收集后判断' }
  if (!issues.length) return { type: '服务类', targetLevel, conclusion: `硬性条件达标，可提供${targetLevel}申报全流程服务` }
  return { type: 'VIP', targetLevel, conclusion: `${issues.join('；')}，需进一步确认解决方案` }
}

export function extractInfo(text) {
  const phone = extractPhone(text)
  const wechat = extractWechat(text, phone)
  const reviewMajor = extractReviewMajor(text)
  const edu = extractEducation(text)
  const title = extractTitle(text)
  const ss = extractSocialSecurity(text)
  const remarks = extractRemarks(text)
  const judge = autoJudge(edu, title, ss, text)
  return {
    date: todayText(),
    name: '',
    phone,
    wechat,
    degree: edu.degree,
    major: edu.major,
    titleLevel: title.level,
    ssCity: ss.city,
    reviewMajor,
    applyLevel: judge.targetLevel === '待确认' ? '' : judge.targetLevel,
    conclusion: judge.conclusion,
    remarks,
    assignedTo: '',
    dealStatus: '',
    _judgeType: judge.type,
    _card: {
      contact: [phone ? `手机：${phone}` : '', wechat ? `微信：${wechat}` : ''].filter(Boolean).join('  ') || '未获取',
      edu: edu.text,
      title: title.text,
      ss: ss.text
    }
  }
}

export function formatCard(row) {
  return [
    `录入时间：${row.date || ''}`,
    `联系方式：${row._card?.contact || [row.phone && `手机：${row.phone}`, row.wechat && `微信：${row.wechat}`].filter(Boolean).join('  ') || '未获取'}`,
    `分配店铺：${row.assignedTo || '未分配'}`,
    `申报专业：${row.reviewMajor || '未识别'}`,
    `学历：${row._card?.edu || row.degree || '未识别'}`,
    `现有职称：${row._card?.title || row.titleLevel || '未识别'}`,
    `社保：${row._card?.ss || row.ssCity || '未识别'}`,
    `备注：${row.remarks || ''}`
  ].join('\n')
}

export function maskPhone(value) {
  const s = String(value || '')
  return s.length >= 7 ? s.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2') : s
}

export function maskWechat(value) {
  const s = String(value || '')
  if (s.length <= 4) return s ? '****' : ''
  return s.slice(0, 2) + '****' + s.slice(-2)
}

export function parseRowDate(value) {
  if (!value) return null
  const d = new Date(String(value).replace(/-/g, '/'))
  return Number.isNaN(d.getTime()) ? null : d
}

export function isExpired(row) {
  const d = parseRowDate(row.date)
  if (!d) return false
  return Date.now() - d.getTime() > 5 * 24 * 60 * 60 * 1000
}
