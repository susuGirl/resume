//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('tctoken', '哈哈哈哈')
    wx.setStorageSync('tctoken', 'value222222222')
    require('./utils/sdk-v1.2.1.js') 
    let clientId = this.globalData.clientId
    wx.BaaS.init(clientId)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {   

          var code = res.code; // 服务器用来获取sessionKey的必要参数
          wx.getUserInfo({ // getUserInfo流程
            success: function (res2) { // 获取userinfo成功
              console.log(res2)
              var encryptedData = encodeURIComponent(res2.encryptedData) // 加密过的字符串 一定要把加密串转成URI编码
              var iv = res2.iv // 加密算法的初始向量
                // 请求自己的服务器
              // Login(code,encryptedData,iv)
            }
          })
          //发起网络请求
          // console.log('login----登录状态------res', res)
          // wx.request({
          //   url: 'http://dapi.radida.com/wechat/getWXBasicParams/appGetOpendId',
          //   data: {
          //     code: code
          //   }
          // })

              
        } else {    
            console.log('获取用户登录态失败！' + res.errMsg)    
        } 
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('66666666-------666----', res)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  

  globalData: {
    serverUrl: 'https://api.it120.cc',
    // serverUrl: 'https://dapi.radida.com/wechat',
    userInfo: null,
    clientId: '1dd3e890aaacdd76723a', // 从 BaaS 后台获取 ClientID
    tableId: 31373, // 从 https://cloud.minapp.com/dashboard/ 管理后台的数据表中获取
  }
})