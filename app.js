//app.js
App({
  globalData: {
    // serverUrl: 'https://api.it120.cc',
    loginInfo: null,
    userInfo: null,
    clientId: '1dd3e890aaacdd76723a',// 从 BaaS 后台获取 ClientID
    systemInfo: null
  },
  
  onLaunch: function () {
    let that = this
    require('./utils/sdk-v1.2.1.js') 
    let clientId = this.globalData.clientId
    wx.BaaS.init(clientId)


   
    wx.BaaS.login().then(res => {
      that.globalData.loginInfo = res
    }, res => {
      if (res instanceof Error) {
        if (res.code === 600) {
          console.log('网络已断开')
        } else if (err.code === 601) {
          console.log('请求超时')
        }
      } else {
        console.log('用户拒绝授权,用户基本信息', res)
        that.globalData.loginInfo = res
      }
    }),

    wx.getSystemInfo({
      success: function(res) {
          that.globalData.systemInfo = res
      }
    })
  }
  
})