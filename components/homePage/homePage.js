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
      userName: {
        type: String,
        value: ''
      }
    },
    data: {}, // 私有数据，可用于模版渲染
  
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function(){},
    moved: function(){},
    detached: function(){},
  
    methods: {
      _baseInfoTap: function () {
        this.triggerEvent('baseInfoTap')
      },
      _workInfoTap: function () {
        this.triggerEvent('workInfoTap')
      },
      _otherInfoTap: function () {
        this.triggerEvent('otherInfoTap')
      },
      _selfIntroductionTap: function () {
        this.triggerEvent('selfIntroductionTap')
      }
    }
  
  })