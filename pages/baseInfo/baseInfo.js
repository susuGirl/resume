const sdkApi = require('../../services/sdk.js')
const { recentlyViewResume } = require('../../commit/commit.js')
const app = getApp()

Page({
    data: {
        baseInfo: {
            id: '',
            userName: '',
            userGender: 2,
            birthData: '',
            eMail: '',
            job: '',
            salary: '',
            address: '',
        },
        shareResumeId: '',
        nullData: false
    },
    onLoad: function(option){
        if (option.shareResumeId) {
            this.setData({
                'shareResumeId': option.shareResumeId
            })
        }
        this.findBaseInfo()
    },
    findBaseInfo () {
        wx.showLoading({
          title: '获取数据中...'
        })
        let params = this.data.shareResumeId ? {'shareResumeId': this.data.shareResumeId} : {}
        sdkApi.findBaseInfo(params, res => {
            wx.hideLoading()
            if ( res.objects.length > 0) {
                if (res.objects[0].birthData) {
                    res.objects[0].birthData = res.objects[0].birthData.substring(0, 10)
                }
                
                this.setData({
                   'baseInfo': res.objects[0],
                   'nullData': false
                })
                if (this.data.shareResumeId && app.globalData.loginInfo && this.data.shareResumeId !== app.globalData.loginInfo.openid) {
                    recentlyViewResume(this.data.shareResumeId, res.objects[0].userName)
                }
            } else {
                this.setData({
                    'nullData': true
                 })
            }
        })
    },
})