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

  //ͳ������
  statisticData:function(data) {
    let userKey = app.globalData.code;
    console.log(data);
    if(data){
      for (var i in data) {
        let temp = data[i].substr(userKey.length + 1, data[i].length).split("_");

        let policyisfind = false;
        for (var j in this.data.policyDatatemp) {
          if (temp[0] + temp[1] == this.data.policyDatatemp[j].name) {
            this.data.policyDatatemp[j].data++;
            policyisfind = true;
          }
        }
        if (policyisfind == false) {
          this.data.policyDatatemp.push({ name: temp[0] + temp[1],data:1});
        }



        let companyisfind = false;
        for (var k in this.data.companyDatatemp.categories) {
          if ((temp[0]) == this.data.companyDatatemp.categories[k]){
            this.data.companyDatatemp.data[k]++;
            companyisfind = true;
          }
        }
        if (companyisfind == false) {
          this.data.companyDatatemp.categories.push(temp[0]);
          this.data.companyDatatemp.data.push(1);
        }
      }

      this.sortData();
      
    } else {
      wx.showToast({
        title: 'û����Ч��������',
        icon: 'success',
        duration: 2000
      })
    }
  },
  sortData:function() {
    for (let i = 0; i < this.data.policyDatatemp.length; i++) {
      for (let j = 0; j < this.data.policyDatatemp.length-i-1; j++){
        if (this.data.policyDatatemp[j].data < this.data.policyDatatemp[j+1].data) {
          let temp = this.data.policyDatatemp[j];
          this.data.policyDatatemp[j] = this.data.policyDatatemp[j + 1];
          this.data.policyDatatemp[j + 1] = temp;
        }
      }
    };

    for (let i = 0; i < this.data.companyDatatemp.data.length; i++) {
      for (let j = 0; j < this.data.companyDatatemp.data.length - i - 1; j++) {
        if (this.data.companyDatatemp.data[j] < this.data.companyDatatemp.data[j + 1]) {
          let temp1 = this.data.companyDatatemp.data[j];
          let temp2 = this.data.companyDatatemp.categories[j];
          this.data.companyDatatemp.data[j] = this.data.companyDatatemp.data[j + 1];
          this.data.companyDatatemp.categories[j] = this.data.companyDatatemp.categories[j + 1];
          this.data.companyDatatemp.data[j + 1] = temp1;
          this.data.companyDatatemp.categories[j + 1] = temp2;
        }
      }
    };
    if (this.data.policyDatatemp.length>5) {
      this.data.policyDatatemp = this.data.policyDatatemp.slice(0, 5);
    }
    if (this.data.companyDatatemp.data.length>5) {
      this.data.companyDatatemp.data = this.data.companyDatatemp.data.slice(0, 5);
      this.data.companyDatatemp.categories = this.data.companyDatatemp.categories.slice(0, 5);
    }

    this.setData({
      companyData:this.data.companyDatatemp,
      policyData:this.data.policyDatatemp
    })

    this.createPie();
    this.createColumn();
  },
  //��״ͼ
  createPie:function() {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: this.data.policyData,
      width: windowWidth,
      height: 300,
      dataLabel: true,
    });
  },

  pieTouchHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  }, 
  //��״ͼ
  createColumn: function() {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: this.data.companyData.categories,
      series: [{
        name: '�ɽ���',
        data: this.data.companyData.data,
        format: function (val, name) {
          return val;
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        title: '������',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  },

  colunmTouchHandler: function (e) {
    console.log(columnChart.getCurrentDataIndex(e));
  },
})
