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
        workInfo: [
            {
                companyName: '',
                datesEmployed: '',
                id: null
            }
        ],
        otherInfo: [
            {
                title0: 'title',
                content0: ''
            }
        ],
        recordId: null,
        windowHeight: app.globalData.systemInfo.windowHeight, // swiper component's height
        hideWorkDialog: true,
        singleWorkInfo: {
            companyName: '',
            datesEmployed: '',
        }
    },

    onLoad: function () {
        let that = this
        that.findBaseInfo()
        that.findworkInfo()
        that.findOtherkInfo()
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
            if ( res.objects.length > 0) {
               res.objects[0].birthData = res.objects[0].birthData.substring(0, 10)
               this.setData({
                'baseInfo': res.objects[0]
               })
            }
       })
    },

    // init user work info data
    findworkInfo: function(e) {
        sdkApi.findworkInfo({}, res => {
            if ( res.objects.length > 0) {
                res.objects.forEach(val => {
                    val.datesEmployed = val.datesEmployed.substring(0, 10)
                })
                res.objects.push({
                    companyName: '',
                    datesEmployed: ''
                })
                
                this.setData({
                    'workInfo': res.objects,
                    'hideWorkDialog': true
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

    // init user other info data
    findOtherkInfo: function (e) {
        sdkApi.findOtherkInfo({}, res=> {
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
            } else {
                this.setData({
                    'otherInfo': [{
                        title0: 'title',
                        content0: ''
                    }]
                })
            }
            
            console.log('otherInfo--------------666-----@_@', this.data.otherInfo)
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

    // work info
    // click card : tap event
    handleWorkInfoCardTap: function (e) {
        this.setData({
            'hideWorkDialog': false,
            'singleWorkInfo': this.data.workInfo[e.currentTarget.dataset.singleWorkInfo] || this.data.workInfo[this.data.workInfo.length - 1]
        })
    },
    // delete card
    deleteCard: function (e) {
        let that = this
        console.log('555555555555555555---------e', e.currentTarget.dataset.cardId)
        sdkApi.deleteWorkInfo(e.currentTarget.dataset.cardId, res => {
            that.findworkInfo()
            console.log('success-------------delete-----workInfo', this.data.workInfo)
        }, res => {
            console.log('fail--------------delete', res)
        })
    },
    // close dialog
    _closeDialog: function (e) {
        this.setData({
            'hideWorkDialog': true
        })
    },

    
    // other info
    // titile input blur
    hangdleTitleBindblur: function (e) {
        let index = e.currentTarget.dataset.operationalDataIndex
        this.setData({
            ['otherInfo[' + index + '].title' + index]: e.detail.value ? e.detail.value : ''
        })
        console.log('otherInfo-----', this.data.otherInfo)
    },

    // content input blur
    hangdleValueBindblur: function (e) {
        let index = e.currentTarget.dataset.operationalDataIndex
        this.setData({
            ['otherInfo[' + index + '].content' + index]: e.detail.value ? e.detail.value : ''
        })
        console.log('otherInfo-----index-------', index)
    },

    // delete row
    handleDeleteInfo: function(e) {
        let temp = []
        let infoArray = []
        temp = this.data.otherInfo.slice(0)
        temp.splice(e.currentTarget.dataset.operationalDataIndex, 1)
        this.handleOperationalData(temp, e.currentTarget.dataset.operationalDataIndex)
    },

    // add row
    handleAddInfo: function (e) {
        if (this.data.otherInfo.length < 10) { // limit 20 row
            let temp = []
            let index = e.currentTarget.dataset.operationalDataIndex + 1
            temp = this.data.otherInfo.slice(0)
            this.handleOperationalData(temp, index, 'add')
        }
    },

    // handle the data hen the row is deleted or added
    handleOperationalData: function (array, operationalDataIndex, type) {
        let infoArray = []
        array.forEach((val, index) => {
            if (index < operationalDataIndex) {
                infoArray.push(val)
            } else {
                if (type === 'add') {
                    infoArray.push({
                        ['title' + (index + 1)]: val['title' + index],
                        ['content' + (index + 1)]: val['content' + index],
                    })
                } else {
                    infoArray.push({
                        ['title' + index]: val['title' + (index + 1)],
                        ['content' + index]: val['content' + (index + 1)],
                    })
                }
                
            }
        })
        if (type === 'add') {
            infoArray.splice(operationalDataIndex, 0, {
                ['title' + operationalDataIndex]: 'title', 
                ['content' + operationalDataIndex]: ''
            })
        }
        
        this.setData({
            'otherInfo': infoArray
        })
        console.log('222222222222222------otherInfo---delete', this.data.otherInfo)
    },

    handleOtherFormSubmit: function (e) {
        console.log('handleOtherFormSubmit-----------submit', e)
        let detailValue = e.detail.value
        let params = {
            ...e.detail.value
        }
        if (!this.data.recordId) {
            sdkApi.addOtherkInfo(params, res => {
                console.log('other-info------add---res--@_@', res)
            })
        } else {
            Object.assign(params, {recordID: this.data.recordId})
            sdkApi.updateOtherkInfo(params, res => {
                console.log('other-info------update---res', res)
            })
        }
    }
})