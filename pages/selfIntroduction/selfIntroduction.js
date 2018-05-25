const requestApi = require('../../services/api.js')
// const { recentlyViewResume } = require('../../commit/commit.js')
const app = getApp()

Page({
    data: {
        imgArr: []
    },

    upLoadImage () {
        if (this.data.imgArr.length >= 9) return
        let that = this
        wx.chooseImage({
          count: 9 - this.data.imgArr.length, // 最多可以选择的图片张数，默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            // 返回选定照片的本地文件路径列表，tempFilePath 可以作为 img 标签的 src 属性显示图片
            console.log('1111111111111111111-------res', res)
            that.setData({
                imgArr: that.data.imgArr.concat(res.tempFilePaths)
            })
          }    
        })    
      },
    formSubmit (e) {
        let that = this
        // let params = {   // 指定 data 以 "Content-Type": 'application/json' 传送
        //     filename: 'aTest.xlsm',
        //     categories: '5b07c9ca1375842add126614'
        // }
        that.data.imgArr.forEach((val, index) => {
            console.log('33333333333------imgArr', this.data.imgArr)
            requestApi.getCredentials({
                filename: app.globalData.loginInfo.openid + 'images' + index + '.png',
                categories: '5b07c9ca1375842add126614'
              }).then(res => {
                  console.log('2222222222222222---@_@---res', res)
              })
            // wx.getImageInfo({
            //     src: val,
            //     success: (res) => {
            //       console.log('------5555-----', res)
            //       console.log('-------6666------filename----', app.globalData.loginInfo.openid + 'image' + index + '.' + res.type)
            //       requestApi.getCredentials({
            //         filename: app.globalData.loginInfo.openid + 'image' + index + '.' + res.type,
            //         categories: '5b07c9ca1375842add126614'
            //       }).then(res => {
            //           console.log('2222222222222222---@_@---res', res)
            //       })
            //     }
            //   })
            // wx.uploadFile({
            //     url: app.globalData.uploadFileServer, // 开发者服务器 url
            //     filePath: that.data.imgArr[index], // 要上传文件资源的路径
            //     name: app.globalData.loginInfo.openid + 'image' + index, // 文件对应的 key,开发者在服务器端通过这个key可以获取到文件二进制内容
            //     formData:{ // HTTP 请求中其他额外的form data
            //       'user': 'test'
            //     },
            //     success: (res) => {
            //         console.log('success-----------------res', res)
            //       var data = res.data
            //       //do something
            //     },
            //     fail: (res) => {
            //         console.log('fail-----------------res', res)
            //     }
            // })
            
        })
        
    }
    
 
})
// var adds = {}  
// Page({    
//   data: {    
//     img_arr: [],    
//     formdata: '',    
//   },    
//   formSubmit: function (e) {    
//     var id = e.target.id    
//     adds = e.detail.value;     
//     adds.program_id = app.jtappid    
//     adds.openid = app._openid    
//     adds.zx_info_id = this.data.zx_info_id    
//     this.upload()    
//   },    
    
//   upload: function () {    
//     var that = this    
//       for (var i=0; i < this.data.img_arr.length; i++) {    
//         wx.uploadFile({    
//           url: 'https:***/submit',    
//           filePath: that.data.img_arr[i],    
//           name: 'content',    
//           formData: adds,     
//           success: function (res) {    
//             console.log(res)    
//             if (res) {    
//               wx.showToast({    
//                 title: '已提交发布！',    
//                 duration: 3000    
//               });    
//             }    
//           }    
//         })    
//       }    
//       this.setData({    
//         formdata: ''    
//       })    
//   },

// })