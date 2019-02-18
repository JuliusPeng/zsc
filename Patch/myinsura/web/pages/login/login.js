const app = getApp()

Page({
  data: {
    motto: '�������Myinsura',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isLogining:false
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // ���� getUserInfo ���������󣬿��ܻ��� Page.onLoad ֮��ŷ���
      // ���Դ˴����� callback �Է�ֹ�������
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // ��û�� open-type=getUserInfo �汾�ļ��ݴ���
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },
  getUserInfo: function (e) {
    console.log("getUserInfo");
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jmp2getOpenID:function(){
    wx.switchTab({
      url: '../companyAndPolicy/companyAndPolicy'
    })
  },
  loginIn: function () {
    if(this.data.isLogining == false) {
      this.setData({
        isLogining:true
      })
      wx.showToast({
        title: '��ݵ�¼��',
        icon: 'loading',
        duration: 50000
      })
      let handler = this;
      wx.request({
        url: 'http://minetrack.io:3001/WechatIndex/login',
        method: 'post',
        data: {
          Code: app.globalData.code,
          NickName: handler.data.userInfo.nickName
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        success(res) {
          if (res.data.code == 0) {//���û�
            app.globalData.code = res.data.data;
            app.globalData.isLogin = true;
            app.globalData.notice = '��ӭ���û�'
            // wx.showToast({
            //   title: '��ӭ���û�',
            //   icon: 'success',
            //   duration: 3000,
            //   success: function () {
            //     wx.switchTab({
            //       url: '../index/index',
            //     })
            //   }
            // })
            wx.switchTab({
              url: '../companyAndPolicy/companyAndPolicy',
            })

          } else if (res.data.code == 3) {//���û�����dataֵ
            app.globalData.isLogin = true;
            app.globalData.code = res.data.data;
            app.globalData.notice = '��ӭ���û�'
            console.log(app.globalData.isLogin);

            wx.switchTab({
              url: '../companyAndPolicy/companyAndPolicy',
            })
          } else {
            console.log(res.data)
            //��ʾ�û����ʶ������
            wx.showToast({
              title: '���ʶ������',
              icon: 'success',
              duration: 1500
            })
          }
          app.globalData.notice = '���ʶ������'
        },
        fail(error) {
          //console.log(error);
          //�����ӳ٣���������
          wx.showToast({
            title: '�򿪵���',
            icon: 'success',
            duration: 1500
          })


        },
      })
    }
    
  }
})
