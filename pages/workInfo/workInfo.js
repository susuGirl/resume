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
    },
    onLoad: function () {
        this.findworkInfo()
    },
    findworkInfo: function(e) {
        sdkApi.findworkInfo({}, res => {
            if ( res.objects.length > 0) {
                res.objects.forEach(val => {
                    val.datesEmployed = val.datesEmployed.substring(0, 10)
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
            'singleWorkInfo': this.data.workInfo[e.currentTarget.dataset.singleWorkInfo] || this.data.workInfo[this.data.workInfo.length - 1]
        })
    },
    // close dialog
    _closeDialog: function (e) {
        this.setData({
            'hideWorkDialog': true
        })
    },
})