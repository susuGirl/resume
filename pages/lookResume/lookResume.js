Page({
    onShow: function () {

    },
    onReady: function () {

    },

    baseInfoTap () {
        console.log('6666666666666---baseInfoTap')
        wx.navigateTo({
            url: '/pages/baseInfo/baseInfo?id=1'
        })
    },
    workInfoTap () {
        console.log('55555555555555---workInfoTap')
        wx.navigateTo({
            url: '/pages/workInfo/workInfo?id=1'
        })
    },
    otherInfoTap () {
        console.log('4444444444444444---otherInfoTap')
        wx.navigateTo({
            url: '/pages/otherInfo/otherInfo?id=1'
        })
    },
    selfIntroductionTap () {
        console.log('33333333333333---selfIntroductionTap')
        wx.navigateTo({
            url: '/pages/selfIntroduction/selfIntroduction?id=1'
        })
    }
    
})