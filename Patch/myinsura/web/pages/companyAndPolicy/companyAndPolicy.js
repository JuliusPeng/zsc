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
  //��Ⱦҳ��
  showCompanyAndPolicy:function() {
    var that = this;
    let para = [];
    let para1 = [];
    for (var key in that.data.company) {
      para.push(that.data.company[key].split("#"));
      para1.push(key);
    }
    // for (var i = 0; i < para.length; i++) {
    //   para[i].push("�������")
    // }
    that.setData({
      isLoaded:true,
      tabs: para1,
      grids: para,
      policyInfo: PolicyInfo

    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight:res.windowHeight-51,
          windowWidth:res.windowWidth,
          //sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          //sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          sliderOffset:0
        });
        wx.hideToast();
      }
    });
  },
  //�Ź������
  gridsChange: function (e) {
    if (e.currentTarget.id == "�������") {
      this.setData({
        adding: e.currentTarget.id,
        policyKey: e.currentTarget.id
      })
    } else {
      this.setData({
        adding: e.currentTarget.id,
        policyKey: "DB_Policy_" + this.data.tabs[this.data.activeIndex] + "_" + e.currentTarget.id
      })
    }
    

  },
  //��ת��¼��ҳ��
  jmp2policy:function(){
    wx.navigateTo({
      url: "../policyInput/policyInput?id=" + this.data.policyKey    })
  },

  //��˾�л�
  tabClick: function (e) {
    
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      policyKey: "DB_Policy_" + this.data.tabs[e.currentTarget.id] + "_" + this.data.grids[e.currentTarget.id][0]
    });
  }
})