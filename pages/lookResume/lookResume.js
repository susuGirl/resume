const sdkApi = require('../../services/sdk.js')
const app = getApp()

Page({

    data: {
        shareResumeId: 'oIcL54mQBUD7RIHU5kYzdgM5wEmw', // oIcL54sdBytp58JYbwM3HNM60LEI
        userName: 'susu',
        tapAdd: true,
        collectResume: true,
        recordID: ''
    },
    onLoad: function (queryParams) {
        console.log('88888888888888888888888888------queryParams', queryParams)
        this.findCollectResume() // ++++++++++++++++++++++++ remember delete
        if (queryParams.shareResumeId) {
            this.findCollectResume()
            this.setData({
                'shareResumeId': queryParams.shareResumeId,
                'userName': queryParams.userName
            })
        }
        
    },
    onShow: function () {

    },
    onReady: function () {

    },
    
    findCollectResume () {
        sdkApi.findCollectResume({}, res => {
            console.log('0000000000000-------res', res)
            if (res.objects[0].id) {
                let currentResume = this.data.shareResumeId + ',' + this.data.userName

                if (res.objects[0].collectInfo.indexOf(currentResume) > -1) {
                    this.setData({
                        collectResume: false
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
    onShareAppMessage: function (res) {
        if (this.data.shareResumeId) {
            sdkApi.findBaseInfo({shareResumeId: this.data.shareResumeId}, res => {
                console.log('66666666666------res', res)
                if (res.from === 'button') {
                    // 来自页面内转发按钮
                    console.log('来自页面内转发按钮------res.target', res.target)
                  }
                  return {
                    title: '自定义转发标题',
                    path: '/pages/lookResume/lookResume?shareResumeId=' + app.globalData.loginInfo.openid + '/userName=' + res.userName,
                    success: function(res) {
                      // 转发成功
                    },
                    fail: function(res) {
                      // 转发失败
                    }
                  }
            })
        }
      },

    collectResumeTap () {
        console.log('6666666666666------this.data.collectResume', this.data.collectResume)
        let params = this.data.shareResumeId + ',' + this.data.userName
        if (this.data.collectResume) {
            if (this.data.tapAdd) {
                sdkApi.addCollectResume({recordID: this.data.recordID, collectInfo: [params]}, res => {
                    this.findCollectResume()
                    console.log('66666666666666-----res', res)
                    this.setData({
                        'tapAdd': false,
                        'collectResume': !this.data.collectResume
                    })
                    return
                })
            } else {
                sdkApi.uAppendCollectResume({recordID: this.data.recordID, collectInfo: params }, res => {
                    console.log('66666666666666---update-----res', res)
                    this.setData({
                        'collectResume': !this.data.collectResume
                    })
                    return
                })
            }
            
            
        } else {
            sdkApi.removeCollectResume({recordID: this.data.recordID, collectInfo: params}, res => {
                console.log('66666666666666---remove---res', res)
                this.setData({
                    'collectResume': !this.data.collectResume
                })
                return
            })
        }
        
    },

    baseInfoTap () {
        console.log('6666666666666---baseInfoTap')
        wx.navigateTo({
            url: '/pages/baseInfo/baseInfo?shareResumeId=' + this.data.shareResumeId
        })
    },
    workInfoTap () {
        console.log('55555555555555---workInfoTap')
        wx.navigateTo({
            url: '/pages/workInfo/workInfo?shareResumeId=' + this.data.shareResumeId
        })
    },
    otherInfoTap () {
        console.log('4444444444444444---otherInfoTap')
        wx.navigateTo({
            url: '/pages/otherInfo/otherInfo?shareResumeId=' + this.data.shareResumeId
        })
    },
    selfIntroductionTap () {
        console.log('33333333333333---selfIntroductionTap')
        wx.navigateTo({
            url: '/pages/selfIntroduction/selfIntroduction?shareResumeId=' + this.data.shareResumeId
        })
    }
    
})