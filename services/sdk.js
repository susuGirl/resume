

const allTableId = require('./tableId.js')
const app = getApp()

const addBaseInfo = (ctx, cb) => {
  
      let tableId = allTableId.baseInfo.createBaseInfo
      let resume = new wx.BaaS.TableObject(tableId)
      let createInfo = resume.create()
      Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
      console.log('66666666--save--传递的参数---ctx', ctx)
  
      createInfo.set(ctx)
      .save()
      .then(res => cb(res))
      .catch(err => console.dir(err))
  }

const updateBaseInfo = (ctx, cb) => {
      let tableId = allTableId.baseInfo.createBaseInfo
      let resume = new wx.BaaS.TableObject(tableId)
      let updateInfo = resume.getWithoutData(ctx.recordID) // // the id of a piece data
      Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
      console.log('5555555---update----传递的参数---ctx', ctx)

      updateInfo.set(ctx)
      .update()
      .then(res => cb(res))
      .catch(err => console.dir(err))
  }

const findBaseInfo = (ctx, cb) => {
      let tableId = allTableId.baseInfo.createBaseInfo
      let resume = new wx.BaaS.TableObject(tableId)
      let query = new wx.BaaS.Query()
      query.compare('openId', '=', app.globalData.loginInfo.openid)

      resume.setQuery(query)
        .find()
        .then(res => cb(res.data))
        .catch(err => console.dir(err))

  }


  const addworkInfo = (ctx, cb) => {
    let tableId = allTableId.workInfo.creatWorkInfo
    let resume = new wx.BaaS.TableObject(tableId)
    let createInfo = resume.create()
    Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
    console.log('66666666--save--传递的参数---ctx', ctx)

    createInfo.set(ctx)
    .save()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

const updateworkInfo = (ctx, cb) => {
    let tableId = allTableId.workInfo.creatWorkInfo
    let resume = new wx.BaaS.TableObject(tableId)
    let updateInfo = resume.getWithoutData(ctx.recordID) // // the id of a piece data
    Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
    console.log('5555555---update----传递的参数---ctx', ctx)

    updateInfo.set(ctx)
    .update()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

const findworkInfo = (ctx, cb) => {
    let tableId = allTableId.workInfo.creatWorkInfo
    let resume = new wx.BaaS.TableObject(tableId)
    let query = new wx.BaaS.Query()
    query.compare('openId', '=', app.globalData.loginInfo.openid)
    let resData = null

    resume.setQuery(query)
      .find()
      .then(res => cb(res.data))
      .catch(err => console.dir(err))
}
  
  module.exports = {
    addBaseInfo,
    updateBaseInfo,
    findBaseInfo,
    addworkInfo,
    updateworkInfo,
    findworkInfo
  }