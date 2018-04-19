const sdkApi = require('../../services/sdk.js')

Page({
    data: {
        workInfo: [
            {
                companyName: '',
                datesEmployed: '',
                id: null
            }
        ],
        hideWorkDialog: true,
        shareResumeId: ''
    },
    onLoad: function (option) {
        if (option.shareResumeId) {
            this.setData({
                'shareResumeId': option.shareResumeId
            })
        }
        this.findworkInfo()
    },
    findworkInfo: function(e) {
        let params = this.data.shareResumeId ? {'shareResumeId': this.data.shareResumeId} : {}
        sdkApi.findworkInfo(params, res => {
            if ( res.objects.length > 0) {
                res.objects.forEach(val => {
                    if (val.datesEmployed) {
                        val.datesEmployed = val.datesEmployed.substring(0, 10)
                    }
                })
                this.setData({
                    'workInfo': res.objects
                })
                console.log('请求数据---呵呵哒-----findworkInfo---- this.data.workInfo', this.data.workInfo)
            } else {
                this.setData({
                    'workInfo': [{
                        companyName: '',
                        datesEmployed: ''
                    }]
                })
            }
       })
    },
    // click card : tap event
    handleWorkInfoCardTap: function (e) {
        this.setData({
            'hideWorkDialog': false,
            'singleWorkInfo': this.data.workInfo[e.currentTarget.dataset.singleWorkInfo]
        })
    },
    // close dialog
    _closeDialog: function (e) {
        this.setData({
            'hideWorkDialog': true
        })
    },
})