Page({
    data: {
        canIUse: false
    },
    onLoad: function () {
        this.setData({
            'canIUse': wx.canIUse('open-data')
        })
    },
    editResumeTap () {
        wx.navigateTo({
            url: '/pages/editResume/editResume'
        })
    },
    getUserInfo (e) {
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