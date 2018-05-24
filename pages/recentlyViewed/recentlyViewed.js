const sdkApi = require('../../services/sdk.js')

Page({
    data: {
        recentlyViewed: [],
        recordID: ''
    },

    onLoad: function () {
        this.findRecentlyViewResume()
    },

    findRecentlyViewResume () {
        sdkApi.findRecentlyViewResume({}, res => {
            if (res.objects.length > 0) {
                let recentlyViewed = []
                res.objects[0].recentlyViewed.forEach((val, index) => {
                    recentlyViewed[index] = val.split(',') // two-dimensional array
                })
                recentlyViewed = recentlyViewed.map(val => ({shareResumeId: val[0], userName: val[1]}))
                this.setData({
                    'recentlyViewed': recentlyViewed,
                    'recordID': res.objects[0].id
                })
            }
            
        })

    },
    handleDeleteResume (e) {
        let params = e.detail.shareresumeId + ',' + e.detail.userName
        sdkApi.removeRecentlyViewResume({recordID: this.data.recordID, recentlyViewed: params}, res => {
            this.findRecentlyViewResume()
        })

    }
})