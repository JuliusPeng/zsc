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

})