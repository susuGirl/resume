const sdkApi = require('../../services/sdk.js')

Page({
    data: {
        collectResume: []
    },

    onLoad: function () {
        this.findCollectResume()
    },

    findCollectResume () {
        sdkApi.findCollectResume({}, res => {
            let collectInfo = []
            res.objects[0].collectInfo.forEach((val, index) => {
                collectInfo[index] = val.split(',') // two-dimensional array
            })
            collectInfo = collectInfo.map(val => ({shareResumeId: val[0], userName: val[1]})) // turn into json
            this.setData({
                collectResume: collectInfo
            })
        })
    },

    lookResume (e) {
        console.log('22222222222222----e.currentTarget.dataset', e.currentTarget.dataset)
        wx.navigateTo({
            url: '/pages/' + e.currentTarget.dataset.urlType + '/' + e.currentTarget.dataset.urlType + '?shareResumeId=' + e.currentTarget.dataset.shareresumeId
        })
    },

    handleCancelCollection (e) {

    }
})