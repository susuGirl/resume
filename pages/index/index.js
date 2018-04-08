//index.js
//获取应用实例
const app = getApp()
const request = require('../../services/api.js')
const sdkApi = require('../../services/sdk.js')

Page({
  data: {

  },

  onLoad: function () {
    
  },

  openDialog: function() {
    // wx.showToast({
    //   title: '操作成功',
    //   icon: 'loading',
    //   image: '/images/rose.jpg',
    //   mask: true
    // })


    // wx.showLoading({
    //   title: '操作成功'
    // })

    // setTimeout(() => {
    //   console.log('333333333-----333')
    //   wx.hideLoading()
    // }, 1000)


    // wx.showModal({
    //   title: '操作成功',
    //   content: '<view>666</view>',
    //   cancelText: '取消？？',
    //   success: res => {
    //     console.log('7777777777-----', res)
    //   }
    // })


    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },


  requestTap: function() {
    sdkApi.createBaseInfo({
      real_name: '苏苏222'
    }, res => {
      console.log('请求成功了吗-------6666-----res', res)
    })
    
    // request.productsQuery({data: '5555'}).then(res => {
    //   console.log('请求成功了吗-------6666-----res', res)
    // })
  }

})
