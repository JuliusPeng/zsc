const app = getApp();
const PolicyInfo = require("policyInfo.js");
var sliderWidth = 96; // ��Ҫ����slider�Ŀ�ȣ����ڼ����м�λ��

Page({
  data: {
    //navbar���Ʋ���
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //navbar����
    tabs: [],
    //�Ź�������
    grids: [],
    //�Ź���ѡ��ѡ��
    policyKey: "DB_Policy_�й��˱�_�������������",

    //��˾����������
    company: {},
    policyInfo:{},

    adding:"",
    isLoaded:false
  },

  onLoad: function () {
    this.getAllComapnyAndPolicy();
  },

  onPullDownRefresh() {
    this.getAllComapnyAndPolicy();
    wx.stopPullDownRefresh();
  },
  //�����ȡ��˾������
  getAllComapnyAndPolicy: function () {
    let handler = this;
 
    if (handler.data.company = {}) {
      wx.showToast({
        title: '���ݼ�����',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: 'http://minetrack.io:3001/WechatCompany/getAll',
      method: 'get',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {},
      success(res) {
        if (res.data.code == "-1" || res.data.code == "-2" || res.data.code == "-3") {//���׳ɹ�û�õ�ֵ
          wx.showToast({
            title: 'û�õ�ֵ',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.code == "-9") {
          wx.showToast({
            title: '���ױ���',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.code == "0") {
          let temp = JSON.parse(res.data.data[1]);
          delete temp.Size
          handler.setData({
            company: temp
          })
          handler.showCompanyAndPolicy();
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