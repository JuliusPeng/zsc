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
  
})
