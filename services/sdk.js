

const allTableId = require('./tableId.js')
const app = getApp()

// base info
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
      let updateInfo = resume.getWithoutData(ctx.recordID) // the id of a piece data
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
      // console.log('3333333333333333333------ctx.shareResumeId', ctx)
      query.compare('openId', '=', ctx.shareResumeId ? ctx.shareResumeId : app.globalData.loginInfo.openid)

      resume.setQuery(query)
        .find()
        .then(res => cb(res.data))
        .catch(err => console.dir(err))

  }

// work info
const addworkInfo = (ctx, cb) => {
  let tableId = allTableId.workInfo.createWorkInfo
  let resume = new wx.BaaS.TableObject(tableId)
  let createInfo = resume.create()
  Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
  console.log('66666666--save--传递的参数---ctx', ctx)

  createInfo.set(ctx)
  .save()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

const updateWorkInfo = (ctx, cb) => {
    let tableId = allTableId.workInfo.createWorkInfo
    let resume = new wx.BaaS.TableObject(tableId)
    let updateInfo = resume.getWithoutData(ctx.recordID) // // the id of a piece data
    // Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
    console.log('5555555---update----传递的参数---ctx', ctx)

    updateInfo.set(ctx)
    .update()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

const deleteWorkInfo = (ctx, cb) => {
  let tableId = allTableId.workInfo.createWorkInfo
  let resume = new wx.BaaS.TableObject(tableId)
  console.log('5555555---update----传递的参数---ctx', ctx)

  resume.delete(ctx)
  .then(res => cb(res))
}

const findworkInfo = (ctx, cb) => {
    let tableId = allTableId.workInfo.createWorkInfo
    let resume = new wx.BaaS.TableObject(tableId)
    let query = new wx.BaaS.Query()
    query.compare('openId', '=', ctx.shareResumeId ? ctx.shareResumeId : app.globalData.loginInfo.openid)
    let resData = null

    resume.setQuery(query)
      .find()
      .then(res => cb(res.data))
      .catch(err => console.dir(err))
}

// other info
const addOtherkInfo = (ctx, cb) => {
  let tableId = allTableId.otherInfo.createOtherInfo
  let resume = new wx.BaaS.TableObject(tableId)
  let createInfo = resume.create()
  Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
  console.log('66666666--save--传递的参数---ctx', ctx)

  createInfo.set(ctx)
  .save()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

const updateOtherkInfo = (ctx, cb) => {
  let tableId = allTableId.otherInfo.createOtherInfo
  let resume = new wx.BaaS.TableObject(tableId)
  let updateInfo = resume.getWithoutData(ctx.recordID) // // the id of a piece data
  // Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
  console.log('5555555---update----传递的参数---ctx', ctx)

  updateInfo.set(ctx)
  .update()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

const deleteOtherInfo = (ctx, cb) => {
  let tableId = allTableId.otherInfo.createOtherInfo
  let resume = new wx.BaaS.TableObject(tableId)
  console.log('5555555---update----传递的参数---ctx', ctx)

  resume.delete(ctx)
  .then(res => cb(res))
}

const findOtherkInfo = (ctx, cb) => {
  let tableId = allTableId.otherInfo.createOtherInfo
  let resume = new wx.BaaS.TableObject(tableId)
  let query = new wx.BaaS.Query()
  query.compare('openId', '=', ctx.shareResumeId ? ctx.shareResumeId : app.globalData.loginInfo.openid)
  let resData = null

  resume.setQuery(query)
    .find()
    .then(res => cb(res.data))
    .catch(err => console.dir(err))
}

// lookResume page for your collected resume
const findCollectResume = (ctx, cb) => {
  let tableId = allTableId.collectResume.createCollectResume
  let resume = new wx.BaaS.TableObject(tableId)
  let query = new wx.BaaS.Query()
  query.compare('openId', '=', app.globalData.loginInfo.openid)
  let resData = null

  resume.setQuery(query)
    .find()
    .then(res => cb(res.data))
    .catch(err => console.dir(err))
}

const addCollectResume = (ctx, cb) => {
  let tableId = allTableId.collectResume.createCollectResume
  let resume = new wx.BaaS.TableObject(tableId)
  let createInfo = resume.create()
  Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
  console.log('66666666--save--传递的参数---ctx', ctx)

  createInfo.set(ctx)
  .save()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

const uAppendCollectResume = (ctx, cb) => {
  let tableId = allTableId.collectResume.createCollectResume
  let resume = new wx.BaaS.TableObject(tableId)
  let updateInfo = resume.getWithoutData(ctx.recordID) // the id of a piece data
  console.log('5555555---update----传递的参数---ctx', ctx)

  updateInfo.uAppend('collectInfo', ctx.collectInfo)
  .update()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

const removeCollectResume = (ctx, cb) => {
  let tableId = allTableId.collectResume.createCollectResume
  let resume = new wx.BaaS.TableObject(tableId)
  let updateInfo = resume.getWithoutData(ctx.recordID) // the id of a piece data
  console.log('5555555---remove----传递的参数---ctx', updateInfo)

  updateInfo.remove('collectInfo', ctx.collectInfo)
  .update()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

// recently viewed resume
const findRecentlyViewResume = (ctx, cb) => {
  let tableId = allTableId.recentlyViewed.createRecentlyViewed
  let resume = new wx.BaaS.TableObject(tableId)
  let query = new wx.BaaS.Query()
  query.compare('openId', '=', app.globalData.loginInfo.openid)
  let resData = null

  resume.setQuery(query)
    .find()
    .then(res => cb(res.data))
    .catch(err => console.dir(err))
}

const addRecentlyViewResume = (ctx, cb) => {
  let tableId = allTableId.recentlyViewed.createRecentlyViewed
  let resume = new wx.BaaS.TableObject(tableId)
  let createInfo = resume.create()
  Object.assign(ctx, {openId: app.globalData.loginInfo.openid})
  console.log('66666666--save--传递的参数---ctx', ctx)

  createInfo.set(ctx)
  .save()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

const uAppendRecentlyViewResume = (ctx, cb) => {
  let tableId = allTableId.recentlyViewed.createRecentlyViewed
  let resume = new wx.BaaS.TableObject(tableId)
  let updateInfo = resume.getWithoutData(ctx.recordID) // the id of a piece data
  console.log('5555555---update----传递的参数---ctx', ctx)

  updateInfo.uAppend('recentlyViewed', ctx.recentlyViewed)
  .update()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

const removeRecentlyViewResume = (ctx, cb) => {
  let tableId = allTableId.recentlyViewed.createRecentlyViewed
  let resume = new wx.BaaS.TableObject(tableId)
  let updateInfo = resume.getWithoutData(ctx.recordID) // the id of a piece data
  console.log('5555555---remove----传递的参数---ctx', updateInfo)

  updateInfo.remove('recentlyViewed', ctx.recentlyViewed)
  .update()
  .then(res => cb(res))
  .catch(err => console.dir(err))
}

  
  module.exports = {
    addBaseInfo,
    updateBaseInfo,
    findBaseInfo,
    addworkInfo,
    updateWorkInfo,
    deleteWorkInfo,
    findworkInfo,
    addOtherkInfo,
    updateOtherkInfo,
    deleteOtherInfo,
    findOtherkInfo,
    addCollectResume,
    uAppendCollectResume,
    findCollectResume,
    removeCollectResume,
    findRecentlyViewResume,
    addRecentlyViewResume,
    uAppendRecentlyViewResume,
    removeRecentlyViewResume,
  }

  // 在这里可以把相同功能的接口请求合并成起来，然后通过参数来调不同的tableId，但是大项目开发中不建议使用，还是一个请求单独一个方法比较好，避免要处理某些特殊数据的时候复杂化