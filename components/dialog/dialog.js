
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
      title: { // title 弹窗标题 属性名
        type: String,
        value: '标题'
      },
      content :{ // 弹窗内容
        type : String ,
        value : '弹窗内容'
      },
      cancelText :{ // 弹窗取消按钮文字
        type : String ,
        value : '取消'
      },
      confirmText :{ // 弹窗确认按钮文字
        type : String ,
        value : '确定'
      } 
    },
  
    /**
     * 组件的内部数据，和 properties 一同用于组件的模版渲染
     */
    data: {
      isShow: false // 控制弹窗显示
    },
  
    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    methods: {
      /*
       * 公有方法
       */
  
      //隐藏弹框
      hideDialog(){
        this.setData({
          isShow: !this.data.isShow
        })
      },
      //展示弹框
      showDialog(){
        this.setData({
          isShow: !this.data.isShow
        })
      },
       /*
       * 内部私有方法建议以下划线开头
       * triggerEvent 用于触发事件
       */
      _cancelEvent(){
        //触发 取消回调
        this.triggerEvent("cancelEvent")
      },
      _confirmEvent(){
        //触发 成功回调
        this.triggerEvent("confirmEvent");
      }
    }
  })