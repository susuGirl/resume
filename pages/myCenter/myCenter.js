Page({
    data: {
        canIUse: false
    },
    onLoad: function () {
        this.setData({
            canIUse: wx.canIUse('open-data')
        })
        console.log('66666666666666-----canIUse', this.data.canIUse)
    },
    editResumeTap: function () {
        wx.navigateTo({
            url: '/pages/editResume/editResume'
        })
    },
    getUserInfo (e) {
        console.log('555555555555555-----e', e)
    },
    collectResumeTap: function () {
        wx.navigateTo({
            url: '/pages/collectResume/collectResume'
        })
    },
    recentlyViewedResumeTap: function () {
        wx.navigateTo({
            url: '/pages/recentlyViewed/recentlyViewed'
        })
    },
    searchReusmeTap: function () {
        wx.navigateTo({
            url: '/pages/searchReusme/searchReusme'
        })
    },
})