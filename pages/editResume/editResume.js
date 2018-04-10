const sdkApi = require('../../services/sdk.js')

Page({

    data: {
        userName: '',
        userGender: 2,
        birthData: '',
        eMail: '',
        noModification: true, // It's not modifying information
        recordID: '' // the id of a piece data
    },

    onReady: function () {
        this.findBaseInfo()
    },

    findBaseInfo: function() {
        wx.showLoading({
            title: '获取数据中...'
          })
        sdkApi.findBaseInfo({},res => {
            console.log('请求数据---get----6666-----res', res)
            if ( res.objects.length > 0) {
               this.setData({
                  userName: res.objects[0].user_name,
                  userGender: res.objects[0].user_gender,
                  birthData: res.objects[0].brith_data,
                  eMail: res.objects[0].e_mail,
                  noModification: false,
                  recordID: res.objects[0].id
               })
               wx.hideLoading()
            }
       })
    },

    handleFormSubmit: function (e) {
        console.log('form submit data ----- @_@', e.detail.value)
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