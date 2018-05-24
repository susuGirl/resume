const sdkApi = require('../../services/sdk.js')
const app = getApp()

Page({

    data: {
        shareResumeId: '', // oIcL54sdBytp58JYbwM3HNM60LEI
        userName: '',
        tapAdd: true,
        collectResume: true,
        recordID: ''
    },
    onLoad: function (queryParams) {
        if (!app.globalData.loginInfo || !app.globalData.loginInfo.openid) {
            wx.BaaS.login().then(res => {
                app.globalData.loginInfo = res
                this.handleOnload(queryParams)
              }, res => {
                app.globalData.loginInfo = res
                this.handleOnload(queryParams)
              })
        } else {
            this.handleOnload(queryParams)
        }
        
    },
    onShow: function () {

    },
    onReady: function () {

    },

    handleOnload (queryParams) {
        if (queryParams.shareResumeId) {
            this.findCollectResume()
            this.setData({
                'shareResumeId': queryParams.shareResumeId,
                'userName': queryParams.userName
            })
        } else {
            this.findBaseInfo()
        }

    },

    findBaseInfo () {
        sdkApi.findBaseInfo({shareResumeId: app.globalData.loginInfo.openid}, res => {
            if (!res.objects[0] || !res.objects[0].userName || !res.objects[0].openId) {
                wx.hideShareMenu()
                return
            }
            this.setData({
                userName: res.objects[0].userName
            })
        })
    },
    
    findCollectResume () {
        sdkApi.findCollectResume({}, res => {
            if (res.objects[0].id) {
                let currentResume = this.data.shareResumeId + ',' + this.data.userName

                if (res.objects[0].collectInfo.indexOf(currentResume) > -1) {
                    this.setData({
                        'collectResume': false
                    })
                }
                this.setData({
                    'tapAdd': false,
                    'recordID': res.objects[0].id
                })
            } else {
                this.setData({
                    'tapAdd': true
                })
            }
        })
    },

    // share your remuse
    onShareAppMessage (res) {
        if (!this.data.shareResumeId) { // share own resume
            if (this.data.userName) {
                return {
                    title: this.data.userName + ' resume',
                    path: '/pages/lookResume/lookResume?shareResumeId=' + app.globalData.loginInfo.openid + '&userName=' + this.data.userName,
                    success: function(res) {
                        // 转发成功
                     },
                    fail: function(res) {
                        // 转发失败
                     }
                }
            }    
        } else { // share other resume
            return {
                title: this.data.userName + ' resume',
                path: '/pages/lookResume/lookResume?shareResumeId=' + this.data.shareResumeId + '&userName=' + this.data.userName,
            }
        }
      },

    collectResumeTap () {
        let params = this.data.shareResumeId + ',' + this.data.userName
        if (this.data.collectResume) {
            if (this.data.tapAdd) {
                sdkApi.addCollectResume({recordID: this.data.recordID, collectInfo: [params]}, res => {
                    this.findCollectResume()
                    this.setData({
                        'tapAdd': false,
                        'collectResume': !this.data.collectResume
                    })
                    return
                })
            } else {
                sdkApi.uAppendCollectResume({recordID: this.data.recordID, collectInfo: params }, res => {
                    this.setData({
                        'collectResume': !this.data.collectResume
                    })
                    return
                })
            }
            
            
        } else {
            sdkApi.removeCollectResume({recordID: this.data.recordID, collectInfo: params}, res => {
                this.setData({
                    'collectResume': !this.data.collectResume
                })
                return
            })
        }
        
    },

    baseInfoTap () {
        wx.navigateTo({
            url: '/pages/baseInfo/baseInfo?shareResumeId=' + this.data.shareResumeId
        })
    },
    workInfoTap () {
        wx.navigateTo({
            url: '/pages/workInfo/workInfo?shareResumeId=' + this.data.shareResumeId
        })
    },
    otherInfoTap () {
        wx.navigateTo({
            url: '/pages/otherInfo/otherInfo?shareResumeId=' + this.data.shareResumeId
        })
    },
    selfIntroductionTap () {
        wx.navigateTo({
            url: '/pages/selfIntroduction/selfIntroduction?shareResumeId=' + this.data.shareResumeId
        })
    }
    
})