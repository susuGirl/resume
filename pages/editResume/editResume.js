const sdkApi = require('../../services/sdk.js')

Page({

    data: {
        card: 'baseInfoCard',
        cardArray: ['baseInfoCard', 'workInfoCard', 'otherInfoCard'],
        cardIndex: 0,
        currentGesture: '', // left right up down
        baseInfo: {
            userName: '',
            userGender: 2,
            birthData: '',
            eMail: ''
        },
        noModification: true, // It's not modifying information
        recordID: '', // the id of a piece data
        lastX: 0, // last pageX
        lastY: 0 // last pageY
    },

    onReady: function () {
        // this.findBaseInfo()
    },

    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          'baseInfo.birthData': e.detail.value
        })
      },

    handleTouchstart: function(event) {
        console.log('handleTouch start-------111', event)
        this.data.lastX = event.touches[0].pageX
        this.data.lastY = event.touches[0].pageY
    },
    handleTouchmove: function(event) {
        console.log('handleTouch move-------222', event)
        let currentX = event.touches[0].pageX
        let currentY = event.touches[0].pageY
        if ((currentX - this.data.lastX) < 0) {
            this.setData({
                'currentGesture': 'left'
            })
        } else if ((currentX - this.data.lastX) > 0) {
            this.setData({
                'currentGesture': 'right'
            })
        }
        // save the current coordinates for the next calculation
        this.data.lastX = currentX
        this.data.lastY = currentY
    },
    handleTouchend: function (event) {
        if (this.data.currentGesture === 'left' && this.data.cardIndex < this.data.cardArray.length - 1) {
            this.data.cardIndex = this.data.cardIndex + 1
        } else if (this.data.currentGesture === 'right' && this.data.cardIndex > 0) {
            this.data.cardIndex = this.data.cardIndex - 1
        }
        this.setData({
            'card': this.data.cardArray[this.data.cardIndex]
        })

    },

    findBaseInfo: function() {
        wx.showLoading({
            title: '获取数据中...'
          })
        sdkApi.findBaseInfo({},res => {
            console.log('请求数据---get----6666-----res', res)
            if ( res.objects.length > 0) {
               this.setData({
                  'baseInfo.userName': res.objects[0].user_name,
                  'baseInfo.userGender': res.objects[0].user_gender,
                  'baseInfo.birthData': res.objects[0].brith_data,
                  'baseInfo.eMail': res.objects[0].e_mail,
                  'noModification': false,
                  'recordID': res.objects[0].id
               })
               wx.hideLoading()
            }
       })
    },

    handleFormSubmit: function (e) {
        console.log('form submit data ----- @_@', e.detail.value)
        return
        let params = {
            user_name: e.detail.value.userName,
            user_gender: e.detail.value.userGender,
            brith_data: e.detail.value.birthData,
            e_mail: e.detail.value.eMail
        }
        
        if (this.data.noModification) { // add new user information operation
            sdkApi.addBaseInfo(params, res => {
                 console.log('请求成功了吗----add---6666-----res', res)
                 wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1500
                  })
                 
            })

        } else { // modify information operation 
            Object.assign(params, {recordID: this.data.recordID})
            sdkApi.updateBaseInfo(params, res => {
                 console.log('请求成功了吗----update---6666-----res', res)
                 wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 1500
                  })
                 
            })

        }
    }
})