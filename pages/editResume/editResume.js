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
        deleteRow: false,
        lastX: 0, // last pageX
        lastY: 0, // last pageY
        windowHeight: app.globalData.systemInfo.windowHeight,
        hideWorkDialog: true,
        singleWorkInfo: {
            companyName: '',
            datesEmployed: '',
            id: null
        }
    },

    onLoad: function () {
        let that = this
        // that.findBaseInfo()
        // that.findworkInfo()
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
            //    console.log('请求数据---get----6666-----res', this.data.baseInfo)
            }
       })
    },

    // init user work info data
    findworkInfo: function(e) {
        // console.log('findworkInfo---------------params', e)
        sdkApi.findworkInfo({}, res => {
            console.log('请求数据---呵呵哒-----findworkInfo----res', res)
            if ( res.objects.length > 0) {
                res.objects.push({
                    companyName: '',
                    datesEmployed: '',
                    id: null
                })
                
                this.setData({
                    'workInfo': res.objects,
                    'hideWorkDialog': true
                })
                console.log('请求数据---呵呵哒-----findworkInfo----res', this.data.workInfo)
            } else {
                this.setData({
                    'workInfo': [{
                        companyName: '',
                        datesEmployed: '',
                        id: null
                    }]
                })
            }
       })
    },

    // init user other info data
    findOtherkInfo: function (e) {
        sdkApi.findOtherkInfo({}, res=> {
            console.log('findOtherkInfo------------init---data', res)
            if (res.objects.length > 0) {
                if (res.objects[0].id) {
                    this.setData({
                        'recordId': res.objects[0].id
                    })
                }
                // let datas = [].slice.call(res.objects[0])
                console.log('555555555555555555-------recordId', this.data.recordId)
                // let temp = []
                let titleArray = []
                let contentArray = []
                for (let i in res.objects[0]) {
                    // temp.push({[i]: res.objects[0][i]})
                    if (i.substr(0, 5) === 'title') {
                        titleArray.push({[i]: res.objects[0][i]})
                        // console.log('66666666666666666------titleArray', titleArray)
                    }
                    if (i.substr(0, 7) === 'content') {
                        contentArray.push({[i]: res.objects[0][i]})
                        // console.log('5555555555555555------contentArray', contentArray)
                    }
                }

                titleArray.forEach((val, index) => {
                    // val['content' + index] = contentArray[index]
                    Object.assign(val, contentArray[index])
                    // console.log('7777777777777777-------@_@', val, contentArray[index])
                })
                // titleArray[titleArray.length] = {id: res.objects[0].id}
                // console.log('33333333333333333333333333---titleArray', titleArray)


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
            Object.assign(params, {recordId: this.data.baseInfo.id})
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
            console.log('success-------------delete', res)
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
    hangdleTitleBindblur: function (e) {
        let index = e.currentTarget.dataset.addInfoIndex
        this.setData({
            ['otherInfo[' + index + '].title' + index]: e.detail.value ? e.detail.value : ''
        })
        console.log('otherInfo-----', this.data.otherInfo)
    },

    hangdleValueBindblur: function (e) {
        let index = e.currentTarget.dataset.addInfoIndex
        this.setData({
            ['otherInfo[' + index + '].content' + index]: e.detail.value ? e.detail.value : ''
        })
        console.log('otherInfo-----', this.data.otherInfo)
    },

    handleDeleteInfo: function(e) {
        // console.log('delete---------row------e', e)
        let temp = []
        let infoArray = []
        temp = this.data.otherInfo.slice(0)
        // console.log('-----55555------@_@', temp)
        temp.splice(e.currentTarget.dataset.addInfoIndex, 1)
        // console.log('-------4444444------@_@', temp)
        temp.forEach((val, index) => {
            // console.log('111111111111------val', val['title' + index])
            if (index < e.currentTarget.dataset.addInfoIndex) {
                infoArray.push(val)
            } else {
                // console.log('111111111111------val', index, '-------', val['title' + (index + 1)])
                infoArray.push({
                    ['title' + index]: val['title' + (index + 1)],
                    ['content' + index]: val['content' + (index + 1)],
                })
            }
        })
        this.setData({
            'otherInfo': infoArray,
            'deleteRow': true
        })
        console.log('222222222222222------otherInfo---delete', this.data.otherInfo)
    },

    handleAddInfo: function (e) {
        if (e.currentTarget.dataset.addInfoIndex < 20) { // limit 20 line
            let temp = []
            let index = e.currentTarget.dataset.addInfoIndex + 1
            temp = this.data.otherInfo.slice(0)
            temp.splice(index, 0, {
                ['title' + index]: 'title', 
                ['content' + index]: ''
            })

            this.setData({
                'otherInfo': temp
            })
            // app.globalData.otherInfo = temp
            console.log('otherInfo-----add-----哈哈', this.data.otherInfo)
        }
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