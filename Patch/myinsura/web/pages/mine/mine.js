const app = getApp()

Page({

  data: {
    userAllPolicy: [],
    userAllPolicytemp:[],
    userAllPolicyHiddenValue:[],
    isGet:[],

    userInfo: {},
    code:"",
    hasPolicy:false,
    isIdHidden:true,
    isHashHidden:[],

  },
  //����
  onLoad: function (e) {
    this.getAllPolicy();
    this.setData({
      userInfo: app.globalData.userInfo,
      code: app.globalData.code
    })

  },

  //����ˢ��
  onPullDownRefresh() {
    this.getAllPolicy();
    wx.stopPullDownRefresh();
  },
})