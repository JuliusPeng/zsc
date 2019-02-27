const app = getApp()

Page({
  data: {

    createTemp: {},
    companyArray: {},
    policyInfo: {},

    //����ģ��
    policyTemp: "",
    policyTempArray: [],
    policyTempData: {},

    multiArray: [],
    multiIndex: [0, 0],

    bol: false,

    accounts: [],
    accountIndex: 0,
    accounts1: [],
    accountIndex1: 0,
    radioText: "",
    para:"",
    title:"",

    radio: [
      { value: "0", name: "�꽻", checked: 'true' },
      { value: "1", name: "�½�" }
    ],
    flag: false,
    date: "1980-01-01",
    date1: "1980-01-01"


  },
  //�û����ȷ��ѡ��˾�ͱ���
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
    this.getPolicyTemp();
  },
  //����ҳ��
  onLoad: function (option) {
    this.initData();
    this.getPolicyTemp(option.id);
    this.setData({
      para: option.id
    })

    let temp = option.id.split("_");
    this.setData({
      title: temp[2]+"-"+temp[3]
    })
   

  },
  //����ˢ��
  onPullDownRefresh() {
   
  },

  initData: function(){
    let handler = this;
    let arr = []
    for (var i = 0; i < 100; i++) {
      arr.push(i + "��");
    }
    handler.setData({
      accounts: arr
    })

    let arr1 = []
    for (var i = 0; i < 100; i++) {
      arr1.push(i + "��");
    }
    handler.setData({
      accounts1: arr1
    })

  },
  //��ȡ����ģ��
  getPolicyTemp: function (policyTemKey) {
    let handler = this;
 
    let key = policyTemKey;
    wx.request({
      url: 'http://minetrack.io:3001/WechatTem/getByKey',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        Key: key
      },
      success(res) {
        if (res.data.code == "-1" || res.data.code == "-2" || res.data.code == "-3") {
          //edit  ���׳ɹ�û�õ�ֵ
          wx.showToast({
            title: 'û�б���ģ��',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.code == "-9") {
          //edit  ����ʧ��
          wx.showToast({
            title: '���ױ���',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.code == "0") {
          //edit
          handler.setData({
            policyTemp: res.data.data,
            bol: true
          })
          handler.createPolicyTemp();
        }
      },
      fail(error) {
        wx.showToast({
          title: '�������',
          icon: 'success',
          duration: 2000
        })
      },
    })
  },
})