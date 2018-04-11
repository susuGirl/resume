const sdkApi = require('../../services/sdk.js')
const app = getApp()

Page({

    data: {
        baseInfo: {
            id: '', // the id of a piece data
            userName: '',
            userGender: 2,
            birthData: '',
            eMail: ''
        },
        workInfo: {
            companyName: '',
            datesEmployed: '',
            workCardId: null
        },
        otherInfo: [
            {
                title: 'hobby',
                value: ''
            }
        ],
        lastX: 0, // last pageX
        lastY: 0, // last pageY
        windowHeight: app.globalData.systemInfo.windowHeight
    },

    onReady: function () {
        let that = this
        // that.findBaseInfo()
        // this.findworkInfo()
        that.setData({
            windowHeight: app.globalData.systemInfo.windowHeight
        })
    },
    
    // init user base info  data
    findBaseInfo: function() {
        wx.showLoading({
            title: '获取数据中...'
          })
        sdkApi.findBaseInfo({}, res => {
            wx.hideLoading()
            console.log('请求数据---get----6666-----res', res)
            if ( res.objects.length > 0) {
               res.objects[0].birthData = res.objects[0].birthData.substring(0, 10)
               this.setData({
                'baseInfo': res.objects[0]
               })
            }
       })
    },

    // init user work info data
    findworkInfo: function() {
        sdkApi.findworkInfo({}, res => {
            console.log('请求数据---get----6666-----res---openId', res)
            if ( res.objects.length > 0) {
            
            }
       })
    },

    // base info date picker change event
    handleDateChange: function(e) {
        this.setData({
            'baseInfo.birthData': e.detail.value
        })
        },
    
    // base info submit
    handleBaseFormSubmit: function (e) {
        console.log('form submit data ----- @_@', e.detail.value)
        let params = {
            ...e.detail.value,
            userGender: Number(e.detail.value.userGender)
        }
        if (!this.data.baseInfo.id) { // add new user information operation
            sdkApi.addBaseInfo(params, res => {
                 console.log('请求成功了吗----add---6666-----res', res)
                 wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1500
                  })
                 
            })

        } else { // modify information operation 
            Object.assign(params, {recordID: this.data.baseInfo.id})
            sdkApi.updateBaseInfo(params, res => {
                 console.log('请求成功了吗----update---6666-----res', res)
                 wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1500
                  })
                 
            })

        }
    },

    // work info submit
    handleWorkFormSubmit: function (e) {
        console.log('form submit data ----- @_@', e.detail.value)
        return
        let params = {
            ...e.detail.value,
            workCardId: Math.random().replace(/\./, app.globalData.openid)
        }
        return params
        
        // if (this.data.noModification) { // add new user information operation
            sdkApi.addBaseInfo(params, res => {
                 console.log('请求成功了吗----add---6666-----res', res)
                 wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1500
                  })
                 
            })

        // } else { // modify information operation 
        //     Object.assign(params, {recordID: this.data.baseInfo.id})
        //     sdkApi.updateBaseInfo(params, res => {
        //          console.log('请求成功了吗----update---6666-----res', res)
        //          wx.showToast({
        //             title: '成功',
        //             icon: 'success',
        //             duration: 1500
        //           })
                 
        //     })

        // }
    },
    
    // other info
    hangdleTitleBindblur: function (e) {
        this.setData({
            ['otherInfo[' + e.currentTarget.dataset.addInfoIndex + '].title']: e.detail.value ? e.detail.value : ''
        })
        console.log('otherInfo-----', this.data.otherInfo)
    },

    hangdleValueBindblur: function (e) {
        this.setData({
            ['otherInfo[' + e.currentTarget.dataset.addInfoIndex + '].value']: e.detail.value ? e.detail.value : ''
        })
        console.log('otherInfo-----', this.data.otherInfo)
    },

    handleAddInfo: function (e) {
        var temp = []
        temp = this.data.otherInfo.slice(0)
        temp.splice(e.currentTarget.dataset.addInfoIndex + 1, 0, {title: 'title', value: ''})

        this.setData({
            'otherInfo': temp
        })
        app.globalData.otherInfo = temp
        console.log('globalData----------哈哈', app.globalData)
    },

})