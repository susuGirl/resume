const sdkApi = require('../../services/sdk.js')

Page({

    data: {
        userName: '',
        userGender: 2,
        birthData: '',
        eMail: ''
    },

    onReady: function () {
        sdkApi.findBaseInfo({},res => {
             console.log('请求数据---get----6666-----res', res)
             this.setData({
                userName: res.objects[0].user_name,
                userGender: res.objects[0].user_gender,
                birthData: res.objects[0].brith_data,
                eMail: res.objects[0].e_mail
             })
        })
    },

    handleFormSubmit: function (e) {
        console.log('form submit data ----- @_@', e.detail.value)
        sdkApi.createBaseInfo({
            user_name: e.detail.value.userName,
            user_gender: e.detail.value.userGender,
            brith_data: e.detail.value.birthData,
            e_mail: e.detail.value.eMail
        }, res => {
             console.log('请求成功了吗-------6666-----res', res)
        })
    }
})