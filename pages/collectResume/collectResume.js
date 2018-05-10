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
            if (res.objects.length > 0) {
                res.objects[0].collectInfo.forEach((val, index) => {
                    collectInfo[index] = val.split(',') // two-dimensional array
                })
                collectInfo = collectInfo.map(val => ({shareResumeId: val[0], userName: val[1]})) // turn into json
                this.setData({
                    'collectResume': collectInfo,
                    'recordID': res.objects[0].id
                })
            }
        })
    },

    handleCancelCollection (e) {
        console.log('222222222222222222222222222222', e.detail)
        let params = e.detail.shareresumeId + ',' + e.detail.userName
        sdkApi.removeCollectResume({recordID: this.data.recordID, collectInfo: params}, res => {
            this.findCollectResume()
        })
    }
})