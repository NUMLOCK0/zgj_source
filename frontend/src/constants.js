export const fields = ['seq','date','name','phone','wechat','degree','major','titleLevel','ssCity','reviewMajor','applyLevel','conclusion','remarks','assignedTo','dealStatus']

export const exportHeaders = ['序号','日期','姓名','联系电话','微信','学历','专业','现有职称','社保城市','申报专业','申报级别','分配店铺','成交','备注','结论','录入人']
export const exportFields = ['seq','date','name','phone','wechat','degree','major','titleLevel','ssCity','reviewMajor','applyLevel','assignedTo','dealStatus','remarks','conclusion','createdBy']

export const permissionGroups = [
  { title: '客户管理', perms: [
    ['extract', '信息提取'],
    ['copyCard', '复制信息卡'],
    ['copyData', '复制数据'],
    ['register', '登记客户'],
    ['edit', '修改数据'],
    ['delete', '删除记录'],
    ['addRow', '添加行'],
    ['viewData', '查看登记表'],
    ['viewMasked', '查看密文'],
    ['exportExcel', '导出Excel'],
    ['clearTable', '清空登记表'],
    ['markInvalid', '标记无效咨询'],
    ['leadStats', '查看留资统计'],
    ['editConsult', '编辑咨询量']
  ]},
  { title: '运营管理', perms: [
    ['taskManage', '任务管理'],
    ['qrGen', '无痕码生成'],
    ['roiView', '查看ROI数据'],
    ['roiEntry', '录入ROI数据'],
    ['roiManage', 'ROI产品管理']
  ]},
  // { title: '考勤打卡', perms: [
  //   ['punchUse', '打卡操作'],
  //   ['punchView', '查看打卡记录'],
  //   ['punchFace', '人脸录入管理'],
  //   ['editAttendance', '修改考勤表']
  // ]}
]
