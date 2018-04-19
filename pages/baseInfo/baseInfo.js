const sdkApi = require('../../services/sdk.js')

Page({
    baseInfo: {
        id: '',
        userName: '',
        userGender: 2,
        birthData: '',
        eMail: ''
    },
    onLoad: function(option){
        console.log('6666----路由参数', option)
        this.findBaseInfo()
    },
    findBaseInfo: function() {
        wx.showLoading({
          title: '获取数据中...'
        })
        sdkApi.findBaseInfo({}, res => {
            console.log('222222222222222222-------------res', res)
            wx.hideLoading()
            if ( res.objects.length > 0) {
                res.objects[0].birthData = res.objects[0].birthData.substring(0, 10)
                this.setData({
                   'baseInfo': res.objects[0]
                })
            }
        })
    },
})