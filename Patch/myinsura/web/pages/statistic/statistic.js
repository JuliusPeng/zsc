var wxCharts = require('wxcharts-min.js'); 
var app = getApp();
var pieChart = null;
var columnChart = null;

Page({
  data: {
    // policyData: [{ name: "�й�ƽ��", data: 18 },
    //               { name: "�й�����", data: 33 },
    //               { name: "�й�̫ƽ��", data: 24 },
    //               { name: "�»�����", data: 23 },
    //               { name: "�й��˱�", data: 10 }],
    // companyData: {
    //   title: '��¼����ǰ��',
    //   data: [15, 20, 45, 37,33],
    //   categories: ['���˰�������ҽ����', '��̩������', '�����˺���', '�ٶ�����ȫ��','i����A����ȫ��']
    // },

    policyData: [],
    companyData: {},

    policyDatatemp: [],
    companyDatatemp:{
      title: '��¼����ǰ��',
      data: [],
      categories: []
    },
  
    chartTitle: '�ܳɽ���',

    tabs: ["�������а�","��˾���а�"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    windowHeight:0,
    windowWidth:0,
  },
 
  onLoad: function () {
    this.navbarShow();
    this.getData();
  },
  //����ˢ��
  onPullDownRefresh() {
    this.getData();
    wx.stopPullDownRefresh();
  },

  //��ȡͳ������
  getData:function() {
    let handler = this;
    this.data.policyDatatemp =[];
    this.data.companyDatatemp= {
      title: '��¼����ǰ��',
        data: [],
          categories: []
    };
    wx.request({
      url: 'http://minetrack.io:3001/WechatAnalytics/getKeys',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
      },
      success(res) {
        if (res.data.code == "-1" || res.data.code == "-2" || res.data.code == "-3") {//���׳ɹ�û�õ�ֵ
          wx.showToast({
            title: 'û����Ч��������',
            icon: 'success',
            duration: 2000
          })
          handler.setData({
            hascompany: false
          })
        } else if (res.data.code == "-9") {
          handler.getcompanyInfo(i);
          wx.showToast({
            title: '���ױ���',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.code == "0") {
          let temp = res.data.data[1].split(",");
          handler.statisticData(temp);
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
