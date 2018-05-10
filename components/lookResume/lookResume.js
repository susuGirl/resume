
// 使用请在json文件用 "usingComponents": { "dialog": "路径" } 引入

Component({
    options: {
      multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的对外属性，是属性名到属性设置的映射表，属性设置中可包含三个字段:
     * type 表示属性类型（必填）,目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
     * value 表示属性初始值（可选）,如果未指定则会根据类型选择一个
     * observer 表示属性值被更改时的响应函数
     */
    properties: {
        resumeInfo: { // title 弹窗标题 属性名
        type: Array,
        value: []
      }
    },
  
    /**
     * 组件的内部数据，和 properties 一同用于组件的模版渲染
     */
    data: {
      
    },
  
    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    methods: {
        lookResume (e) {
            wx.navigateTo({
                url: '/pages/' + e.currentTarget.dataset.urlType + '/' + e.currentTarget.dataset.urlType + '?shareResumeId=' + e.currentTarget.dataset.shareresumeId
            })
        },
        _handleDelete (e) {
            console.log('333333333333333333----e', e.currentTarget.dataset)
            this.triggerEvent("handleDelete", e.currentTarget.dataset)
        }
    }
  })