const sdkApi = require('../../services/sdk.js')
const app = getApp()

Page({

    data: {
        baseInfo: {
            id: '', // the id of a piece data
            userName: '',
            userGender: 2,
            birthData: '',
            eMail: '',
            phoneNumber: ''
        },
        workInfo: [
            {
                companyName: '',
                datesEmployed: '',
                id: null,
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
            userName: '',
            phoneNumber: ''
        },
        canBaseSubmit: true,
        canOtherSubmit: true,
        rejectEdit: true
    },

    onLoad: function () {
        let that = this
        that.findBaseInfo()
        // that.findworkInfo()
        // that.findOtherkInfo()
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
                if (res.objects[0].birthData) {
                    res.objects[0].birthData = res.objects[0].birthData.substring(0, 10)
                }
               
               this.setData({
                'baseInfo': res.objects[0],
                'rejectEdit': false
               })
            //    wx.setStorageSync('userInfo', {phoneNumber: res.objects[0].phoneNumber, userName: res.objects[0].userName})
            }
            this.findworkInfo()
            this.findOtherkInfo()
       })
    },

    // init user work info data
    findworkInfo: function(e) {
        sdkApi.findworkInfo({}, res => {
            if ( res.objects.length > 0) {
                res.objects.forEach(val => {
                    if (val.datesEmployed) {
                        val.datesEmployed = val.datesEmployed.substring(0, 10)
                    }
                })
                res.objects.push({
                    companyName: '',
                    datesEmployed: '',
                    userName: this.data.baseInfo.userName,
                    phoneNumber: this.data.baseInfo.phoneNumber
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
                        datesEmployed: '',
                        userName: this.data.baseInfo.userName,
                        phoneNumber: this.data.baseInfo.phoneNumber
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

    handlePhoneNumber: function (e) {
        console.log('55555555555555555-----e', e)
        this.setData({
            'baseInfo.phoneNumber': e.detail.value.replace(/\D/g, '')
        })
        // this.patPhone = e.target.value.replace(/\D/g, '')
    },
    
    // base info submit
    handleBaseFormSubmit: function (e) {
        console.log('form submit data ----- @_@', e.detail.value)
        if (!e.detail.value.phoneNumber || !e.detail.value.userName) {
            wx.showToast({
                title: '* is mandatory',
                icon: 'none',
                duration: 2000
              })
            return
        }
        this.setData({
            baseInfo: e.detail.value
        })
        // console.log('7777777777777777-----baseInfo', this.data.baseInfo)
        let params = {
            ...e.detail.value,
            userGender: Number(e.detail.value.userGender)
        }
        if (this.data.canBaseSubmit) {
            this.setData({
                'canBaseSubmit': false
             })
             if (!this.data.baseInfo.id) { // add new user information operation
                sdkApi.addBaseInfo(params, res => {
                    console.log('请求成功了吗----add---6666-----res', res)
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 1500
                        })
                        let index = this.data.workInfo.length - 1
                        setTimeout(() => {
                            this.setData({
                                 'canBaseSubmit': true,
                                 'rejectEdit': false,
                                 ['workInfo[' + index + ']']: {
                                    companyName: '',
                                    datesEmployed: '',
                                    userName: this.data.baseInfo.userName,
                                    phoneNumber: this.data.baseInfo.phoneNumber
                                }
                            })
                        }, 1000)
                    
                })
    
            } else { // modify information operation
                Object.assign(params, {recordID: this.data.baseInfo.id})
                sdkApi.updateBaseInfo(params, res => {
                    wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 1500
                    })
                    let index = this.data.workInfo.length - 1
                    setTimeout(() => {
                        console.log('请求成功了吗----update---6666-----res', res)
                        this.setData({
                            'canBaseSubmit': true,
                            'rejectEdit': false,
                            ['workInfo[' + index + ']']: {
                               companyName: '',
                               datesEmployed: '',
                               userName: this.data.baseInfo.userName,
                               phoneNumber: this.data.baseInfo.phoneNumber
                           }
                        })
                    }, 1000)
                    
                })
    
            }
        }
        
    },

    // work info
    // click card : tap event
    handleWorkInfoCardTap: function (e) {
        if (this.data.rejectEdit) {
            wx.showToast({
                title: 'Please complete your basic information first.',
                icon: 'none',
                duration: 2000
              })
            return
        }
        this.setData({
            'hideWorkDialog': false,
            'singleWorkInfo': this.data.workInfo[e.currentTarget.dataset.singleWorkInfo] || this.data.workInfo[this.data.workInfo.length - 1]
        })
        console.log('66666666666666-----singleWorkInfo', this.data.singleWorkInfo)
    },
    // delete card
    deleteCard: function (e) {
        let that = this
        sdkApi.deleteWorkInfo(e.currentTarget.dataset.cardId, res => {
            that.findworkInfo()
        })
    },
    // close dialog
    _closeDialog: function (e) {
        this.setData({
            'hideWorkDialog': true
        })
    },

    
    // other info

    // titile input input
    hangdleTitleBindinput: function (e) {
        let index = e.currentTarget.dataset.operationalDataIndex
        this.setData({
            ['otherInfo[' + index + '].title' + index]: e.detail.value ? e.detail.value : ''
        })
    },

    // content input input
    hangdleValueBindinput: function (e) {
        let index = e.currentTarget.dataset.operationalDataIndex
        this.setData({
            ['otherInfo[' + index + '].content' + index]: e.detail.value ? e.detail.value : ''
        })
    },

    // delete row
    handleDeleteInfo: function(e) {
        let temp = []
        let infoArray = []
        temp = this.data.otherInfo.slice(0)
        temp.splice(e.currentTarget.dataset.operationalDataIndex, 1)
        this.handleOperationalData(temp, e.currentTarget.dataset.operationalDataIndex, 'delete')
    },

    // add row
    handleAddInfo: function (e) {
        if (this.data.otherInfo.length < 10) { // limit 20 row
            let temp = []
            let indexAdd = e.currentTarget.dataset.operationalDataIndex + 1
            temp = this.data.otherInfo.slice(0)
            this.handleOperationalData(temp, indexAdd, 'add')
        }
    },

    // handle the data hen the row is deleted or added
    handleOperationalData: function (infoAry, operationalDataIndex, type) {
        let infoArray = []
        infoAry.forEach((val, index) => {
            if (index < operationalDataIndex) {
                infoArray.push(val)
            } else {
                if (type === 'add') {
                    infoArray.push({
                        ['title' + (index + 1)]: val['title' + index],
                        ['content' + (index + 1)]: val['content' + index],
                    })
                    
                } 
                if (type === 'delete') {
                    infoArray.push({
                        ['title' + index]: val['title' + (index + 1)],
                        ['content' + index]: val['content' + (index + 1)],
                    })
                }
                
            }
        })

        if (infoArray.length === infoAry.length && type === 'add')
        infoArray.splice(operationalDataIndex, 0, {
            ['title' + operationalDataIndex]: 'title', 
            ['content' + operationalDataIndex]: ''
        })
        
        this.setData({
            'otherInfo': infoArray
        })
    },

    handleOtherFormSubmit: function (e) {
        console.log('handleOtherFormSubmit-----------submit', e)
        if (this.data.rejectEdit) {
            wx.showToast({
                title: 'Please complete your basic information first.',
                icon: 'none',
                duration: 2000
              })
            return
        }
        let detailValue = e.detail.value
        let params = {
            ...e.detail.value,
            userName: this.data.baseInfo.userName,
            phoneNumber: this.data.baseInfo.phoneNumber
        }
        if (this.data.canOtherSubmit) {
            this.setData({
                'canOtherSubmit': false
             })
             if (!this.data.recordId) {
                this.addOtherkInfo(params)
            } else {
                sdkApi.deleteOtherInfo(this.data.recordId, res => {
                    this.addOtherkInfo(params, 'refresh')
                })
            }
        }
    },

    addOtherkInfo: function (params, refresh) {
        sdkApi.addOtherkInfo(params, res => {
            console.log('other-info------add---res--@_@', res)
            wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 1500
            })
            if (refresh === 'refresh') {
              this.findOtherkInfo()
            }
            setTimeout(() => {
                this.setData({
                    'canOtherSubmit': true
                })
            }, 1000)
        })
    }
})