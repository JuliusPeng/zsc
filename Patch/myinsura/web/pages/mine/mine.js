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
  //��ȡ�û����б�����Ϣ
  getAllPolicy:function() {
    let handler = this;
    let userKey = app.globalData.code;
    //let userKey ="ddroyce@163.com";

    if (handler.data.userAllPolicy = [0]) {
      wx.showToast({
        title: '���ݼ�����',
        icon: 'loading',
        duration: 10000
      })
    }
    wx.request({
      url: 'http://minetrack.io:3001/WechatuserPolicy/getPolicies',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        UserKey: userKey
      },
      success(res) {
        if (res.data.code == "-1" || res.data.code == "-2" || res.data.code == "-3") {
          wx.showToast({
            title: 'û�б���',
            icon: 'success',
            duration: 2000
          })
          console.log(res.data.msg);
        } else if (res.data.code == "-9") {
          console.log(res.data.error);
        } else if (res.data.code == "0") {
          wx.hideToast();
          let userPolicy = res.data.data[1].split(",");
          for (var i in userPolicy) {
            handler.data.isGet.push(false);
          }
          let para = [];
          let isHashhiddentemp = [];
          for (var i in userPolicy) {
            let temp = userPolicy[i].substr(userKey.length + 1, userPolicy[i].length).split("_");
            para.push({
              name: temp[0] + "��˾" + temp[1],
              key: userPolicy[i],
              value: {}
            });
            isHashhiddentemp.push(false);
          }
          handler.setData({
            userAllPolicytemp : para,
            isHashHidden: isHashhiddentemp
          })
          console.log(handler.data.isHashHidden)
          for (let i = 0; i < handler.data.userAllPolicytemp.length; i++) {
            handler.getPolicyInfo(i);
          }
        }
      },
      fail(error) {
        wx.showToast({
          title: '�������',
          icon: 'success',
          duration: 2000
        })
        console.log("�������");
      },
    })
  },
  //��ȡ�ض�������������Ϣ
  getPolicyInfo: function(i){
    let handler = this;
    let key = handler.data.userAllPolicytemp[i].key;
    wx.request({
      url: 'http://minetrack.io:3001/WechatPolicy/getByKey',
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        Key: key
      },
      success(res) {
        if (res.data.code == "-1" || res.data.code == "-2" || res.data.code == "-3") {//���׳ɹ�û�õ�ֵ
          wx.showToast({
            title: '��Ŀǰû�б���',
            icon: 'success',
            duration: 2000
          })
          handler.setData({
            hasPolicy: false
          })
        } else if (res.data.code == "-9") {
          handler.getPolicyInfo(i);
          wx.showToast({
            title: '���ױ���',
            icon: 'success',
            duration: 2000
          })
        } else if (res.data.code == "0") {
          let temp = JSON.parse(res.data.data[1]);
          console.log(temp);
          delete temp.Size;
          delete temp.Key;
          delete temp.UserKey;
          handler.data.userAllPolicytemp[i].value = temp
          handler.data.isGet[i] = true;

          if(handler.check() == true) {
            let temp = [];
            for (let i = 0; i < handler.data.userAllPolicytemp.length; i++) {
              temp.push(true);
            }
            handler.setData({
              userAllPolicy:handler.data.userAllPolicytemp,
              userAllPolicyHiddenValue:temp,
              hasPolicy: true
            })
          }
        }
      },
      fail(error) {
        wx.showToast({
          title: '�������',
          icon: 'success',
          duration: 2000
        })
        console.log("�������");
      },
    })
  },
  //����Ƿ��ȡ������Ϣ
  check: function() {
    for(let i = 0; i < this.data.isGet.length; i++) {
      if(this.data.isGet[i] == false) {
        return false;
      }
    }
    return true;
  },
  //��������չʾ
  show: function(e) {
    let id = parseInt(e.currentTarget.id);
    let temp = this.data.userAllPolicyHiddenValue;
    if (temp[id] == false) {
      temp[id] = true;
    } else {
      temp[id] = false;
    }
    this.setData({
      userAllPolicyHiddenValue: temp,
    })
  },
  //��ת��������
  jmp2rinkeby:function(e){
    console.log(e)
    wx.navigateTo({
      url: "../rinkeby/rinkeby?id=" + e.currentTarget.id,
    })

  },
  switchIdHidden: function() {
    if(this.data.isIdHidden == false) {
      this.setData({
        isIdHidden:true
      });
    } else {
      this.setData({
        isIdHidden: false
      });
    }
  },
  switchHashHidden: function(e) {
    let index = parseInt(e.currentTarget.id);
    if (this.data.isHashHidden[index] == false) {
      let temp = this.data.isHashHidden;
      temp[index] = true;
      this.setData({
        isHashHidden: temp
      });
    } else {
      let temp = this.data.isHashHidden;
      temp[index] = false;
      this.setData({
        isHashHidden: temp
      });
    }
  }
})