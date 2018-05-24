Page({
    data: {
        canIUse: false
    },
    onLoad: function () {
        this.setData({
            'canIUse': wx.canIUse('open-data')
        })
        console.log('66666666666666-----canIUse', this.data.canIUse)
    },
    editResumeTap () {
        wx.navigateTo({
            url: '/pages/editResume/editResume'
        })
    },
    getUserInfo (e) {
        console.log('555555555555555-----e', e)
    },
    collectResumeTap () {
        wx.navigateTo({
            url: '/pages/collectResume/collectResume'
        })
    },
    recentlyViewedResumeTap () {
        wx.navigateTo({
            url: '/pages/recentlyViewed/recentlyViewed'
        })
    },
    searchReusmeTap () {
        wx.navigateTo({
            url: '/pages/searchReusme/searchReusme'
        })
    },
    showOwnResume () {
        wx.reLaunch({
            url: '/pages/lookResume/lookResume'
        })
    }
})