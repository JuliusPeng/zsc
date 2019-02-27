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
  createPolicyTemp: function () {
    let tempArray = this.data.policyTemp.split("#");
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i] == "Key" || tempArray[i] == "UserKey") {
        tempArray.splice(i, 1);
        i--;
      }
    }
    let policyTempDataPara = {};
    for (var i in tempArray) {
      if (tempArray[i] == "�����籣�������ˣ�") {
        policyTempDataPara[tempArray[i]] = "���籣";
      } else if (tempArray[i] == "���޽�ͨ�¹�") {
        policyTempDataPara[tempArray[i]] = "�޽�ͨ�¹�";
      } else if (tempArray[i] == "�Զ�����") {
        policyTempDataPara[tempArray[i]] = "���Զ�����";
      } else if (tempArray[i] == "�ɷѷ�ʽ") {
        policyTempDataPara[tempArray[i]] = "�꽻";
      } else if (tempArray[i] == "����") {
        policyTempDataPara[tempArray[i]] = "1��";
      } else if (tempArray[i] == "��������") {
        policyTempDataPara[tempArray[i]] = "1��";
      } else {
        policyTempDataPara[tempArray[i]] = "";
      }
    }
    this.setData({
      policyTempArray: [],
    })
    this.setData({
      policyTempArray: tempArray,
      policyTempData: policyTempDataPara
    })

    console.log(this.data.policyTempArray)

  },
  submitPolicy: function () {
    let isInputed = true;
    for (let key in this.data.policyTempData) {
      if (this.data.policyTempData[key] == "") {
        wx.showToast({
          title: '������' + key,
          duration: 1000
        });
        isInputed = false;
        break;
      }
    }
    console.log(this.data.policyTempData);
    if (isInputed == true) {

      wx.showToast({
        title: '�����ύ��',
        icon: 'loading',
        duration: 1000000
      })
      let handler = this;
      let a = this.data.para.split("_");


      let company = a[2];
      let policyName = a[3] ;
      let userKey = app.globalData.code;
      let data = this.data.policyTempData;
      let temKey = "DB_Policy_" + company + "_" + policyName;
      data.Key = userKey + "_" + company + "_" + policyName;
      data.UserKey = userKey;
      let policyKey = data.Key;
      data = JSON.stringify(data);
      console.log(data);
      wx.request({
        url: 'http://minetrack.io:3001/WechatuserPolicy/submit',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          UserKey: userKey,
          TemKey: temKey,
          Data: data,
          PolicyKey:policyKey
        },
        success(res) {
          wx.hideToast;
          if (res.data.code == "-6") {//����ʧ��  
            wx.showToast({
              title: '����ʧ��',
              icon: 'success',
              duration: 2000
            })
          } else if (res.data.code == "0") {//���׳ɹ�
            wx.showToast({
              title: '�ύ�ɹ�',
              icon: 'success',
              duration: 2500
            })
            handler.setData({
              policyTempArray: [],
              bol: false
            })

            wx.switchTab({
              url: '../companyAndPolicy/companyAndPolicy',
            })
          } else if (res.data.code == "-9") {//���ױ���
            wx.showToast({
              title: '���ױ���',
              icon: 'success',
              duration: 2000
            })
          }
        },
        fail(error) {
          wx.hideToast;
          wx.showToast({
            title: '�������',
            icon: 'success',
            duration: 2000
          })
        },
      })
    }
  },
  changeValue: function (e) {
    if (e.target.id == "Ͷ����") {//��������
      this.data.policyTempData[e.target.id] = e.detail.value;
    } else if (e.target.id == "�������") {//��������
      this.data.policyTempData[e.target.id] = e.detail.value;
    } else if (e.target.id == "������") {//��������
      this.data.policyTempData[e.target.id] = e.detail.value;
    } else if (e.target.id == "���϶��") {//�����
      this.data.policyTempData[e.target.id] = e.detail.value;
    } else if (e.target.id == "��ʼʱ��") {//ʱ��ؼ�
      this.data.policyTempData[e.target.id] = e.detail.value;
      this.setData({
        date: e.detail.value
      })
    } else if (e.target.id == "����ʱ��") {//ʱ��ؼ�
      this.data.policyTempData[e.target.id] = e.detail.value;
      this.setData({
        date1: e.detail.value
      })

    } else if (e.target.id == "��������") {// �����ؼ�
      this.data.policyTempData[e.target.id] = parseInt(e.detail.value) + 1;
      this.setData({
        accountIndex: e.detail.value
      })
    } else if (e.target.id == "�ɷѷ�ʽ") {//��ѡradio
      var radioItems = this.data.radio;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
        radioItems[i].checked = radioItems[i].value == e.detail.value;
      }
      this.setData({
        radio: radioItems
      });
      for (let i = 0; i < this.data.radio.length; i++) {
        if (this.data.radio[i].value == e.detail.value) {
          this.data.policyTempData[e.target.id] = this.data.radio[i].value;
        }
      }
    } else if (e.target.id == "�Զ�����") {//����
      if (e.detail.value == "true") {
        this.data.policyTempData[e.target.id] = "���Զ�����";
      } else {
        this.data.policyTempData[e.target.id] = "�Զ�����";
      }
    } else if (e.target.id == "����") {//�����ı���
      this.data.policyTempData[e.target.id] = e.detail.value;
    } else if (e.target.id == "�����籣�������ˣ�") {//����
      if (e.detail.value == "true") {
        this.data.policyTempData[e.target.id] = "���籣";
      } else {
        this.data.policyTempData[e.target.id] = "���籣";
      }
    } else if (e.target.id == "���ƺ�") {//�����
      this.data.policyTempData[e.target.id] = e.detail.value;
    } else if (e.target.id == "����") {// �����ؼ�
      this.data.policyTempData[e.target.id] = parseInt(e.detail.value) + 1;
      this.setData({
        accountIndex1: e.detail.value
      })
    } else if (e.target.id == "���޽�ͨ�¹�") {//����
      if (e.detail.value == "true") {
        this.data.policyTempData[e.target.id] = "�޽�ͨ�¹�";
      } else {
        this.data.policyTempData[e.target.id] = "�н�ͨ�¹�";
      }
    }
  }
})