
const sdkApi = require('../../services/sdk.js')
const app = getApp()
Component({
  

    behaviors: [],
  
    properties: {
      /**
     * 组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段:
     * type 表示属性类型（必填）,目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
     * value 表示属性初始值（可选）,如果未指定则会根据类型选择一个
     * observer 表示属性值被更改时的响应函数,属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
     */
      // myProperty: { 
      //   type: String,
      //   value: '',
      //   observer: function(newVal, oldVal){}
      // },
      // myProperty2: String // 简化的定义方式
      singleWorkInfo: Object
    },
    data: { // 私有数据，可用于模版渲染

    }, 
  
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function(){},
    moved: function(){},
    detached: function(){},
  
    methods: {
        _closeDialog: function () {
          this.triggerEvent('closeDialog')
        },

        // work info submit
        handleWorkFormSubmit: function (e) {
          console.log('form submit data ----- @_@', e.detail.value)
          let params = {
              ...e.detail.value
              // workCardId: `${Math.random()}`.replace(/0\./, app.globalData.loginInfo.openid)
          }
          
          console.log('work--------------work------', params)
          
          if (!this.data.singleWorkInfo.id) { // add new user information operation
              sdkApi.addworkInfo(params, res => {
                  console.log('请求成功了吗----add---6666-----res', res)
                  wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 1500
                    })
                    this.triggerEvent('findworkInfoDialog', 'addNullCard')
                  
              })

          } else { // modify information operation 
              Object.assign(params, {recordID: this.data.singleWorkInfo.id})
              sdkApi.updateWorkInfo(params, res => {
                   console.log('请求成功了吗----update---6666-----res', res)
                   wx.showToast({
                      title: '成功',
                      icon: 'success',
                      duration: 1500
                    })
                    this.setData({
                        'workInfo': []
                    })
                    this.triggerEvent('findworkInfoDialog', 'addNullCard') // 触发的事件名 findworkInfoDialog 不能与外部定义的事件名一样，否则会触发两次请求
              })

          }
      },
    }
  
  })