const sdkApi = require('../../services/sdk.js')
const { recentlyViewResume } = require('../../commit/commit.js')
const app = getApp()

Page({
    data: {
        otherInfo: [
            {
                title0: 'title',
                content0: ''
            }
        ],
        shareResumeId: ''
    },
    onLoad: function (option) {
        if (option.shareResumeId) {
            this.setData({
                'shareResumeId': option.shareResumeId
            })
        }
        this.findOtherkInfo()
    },
    findOtherkInfo: function (e) {
        let params = this.data.shareResumeId ? {'shareResumeId': this.data.shareResumeId} : {}
        sdkApi.findOtherkInfo(params, res=> {
            console.log('findOtherkInfo------------init---res', res)
            if (res.objects.length > 0) {
                if (res.objects[0].id) {
                    this.setData({
                        'recordId': res.objects[0].id
                    })
                }
                let titleArray = []
                let contentArray = []
                for (let i in res.objects[0]) { // loop througth the object
                    if (i.substr(0, 5) === 'title') {
                        titleArray.push({[i]: res.objects[0][i]})
                    }
                    if (i.substr(0, 7) === 'content') {
                        contentArray.push({[i]: res.objects[0][i]})
                    }
                }

                titleArray.forEach((val, index) => { // There are problem with the data order.It't hasn't been solved yet. -- Waiting for optimization
                    Object.assign(val, contentArray[index])
                })

                this.setData({
                    'otherInfo': titleArray
                })
                if (this.data.shareResumeId && app.globalData.loginInfo && this.data.shareResumeId !== app.globalData.loginInfo.openid) {
                    recentlyViewResume(this.data.shareResumeId, res.objects[0].userName)
                }
            } else {
                this.setData({
                    'otherInfo': [{
                        nullData: true
                    }]
                })
            }
            
            console.log('otherInfo--------------666-----@_@', this.data.otherInfo)
        })
    },
})