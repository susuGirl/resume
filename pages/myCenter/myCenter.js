Page({
    editResumeTap: function () {
        wx.navigateTo({
            url: '/pages/editResume/editResume'
        })
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