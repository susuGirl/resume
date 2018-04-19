const app = getApp()

Page({

    data: {
        shareResumeId: '' // oIcL54sdBytp58JYbwM3HNM60LEI
    },
    onLoad: function (queryParams) {
        console.log('88888888888888888888888888------queryParams', queryParams)
        if (queryParams.shareResumeId) {
            this.setData({
                'shareResumeId': queryParams.shareResumeId // oIcL54mQBUD7RIHU5kYzdgM5wEmw
            })
        }
        
    },
    onShow: function () {

    },
    onReady: function () {

    },

    // share your remuse
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log('来自页面内转发按钮------res.target', res.target)
        }
        return {
          title: '自定义转发标题',
          path: '/pages/lookResume/lookResume?shareResumeId=' + app.globalData.loginInfo.openid,
          success: function(res) {
            // 转发成功
          },
          fail: function(res) {
            // 转发失败
          }
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