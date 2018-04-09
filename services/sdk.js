

const allTableId = require('./tableId.js')
const app = getApp()

const createBaseInfo = (ctx, cb) => {
  
      let tableId = allTableId.baseInfo.createBaseInfo
      let resume = new wx.BaaS.TableObject(tableId)
      let createInfo = resume.create()
      Object.assign(ctx, {open_id: app.globalData.loginInfo.openid})
      console.log('66666666----传递的参数---ctx', ctx)
  
      createInfo.set(ctx)
      .save()
      .then(res => cb(res))
      .catch(err => console.dir(err))
  }

const findBaseInfo = (ctx, cb) => {
      let tableId = allTableId.baseInfo.createBaseInfo
      let resume = new wx.BaaS.TableObject(tableId)
      let query = new wx.BaaS.Query()
      query.compare('open_id', '=', app.globalData.loginInfo.openid)
      let resData = null

      resume.setQuery(query)
        .find()
        .then(res => cb(res.data))
        .catch(err => console.dir(err))

  }
  
  module.exports = {
    createBaseInfo,
    findBaseInfo
  }