

const allTableId = require('./tableId.js')

let createBaseInfo = (ctx, cb) => {
  
      let tableId = allTableId.baseInfo.createBaseInfo
      let resume = new wx.BaaS.TableObject(tableId)
      console.log('2222222222222----resume', resume)
      let createInfo = resume.create()
  
      createInfo.set(ctx)
      .save()
      .then(res => cb(res))
      .catch(err => console.dir(err))
  }






let getBooks = (ctx, cb) => {

    let tableId = getApp().globalData.tableId,
      Books = new wx.BaaS.TableObject(tableId)
  
    Books.find()
      .then(res => cb(res))
      .catch(err => console.dir(err))
  }
  
  let addBook = (ctx, cb) => {
  
    let tableId = getApp().globalData.tableId,
      Books = new wx.BaaS.TableObject(tableId),
      Book = Books.create(),
      bookName = ctx.data.creatingBookName
  
    let data = {
      bookName,
    }
  
    Book.set(data)
      .save()
      .then(res => cb(res))
      .catch(err => console.dir(err))
  
  }
  
  let updateBook = (ctx, cb) => {
    let tableId = getApp().globalData.tableId,
      recordId = ctx.data.curRecordId,
      bookName = ctx.data.editingBookName
  
    let Books = new wx.BaaS.TableObject(tableId),
      Book = Books.getWithoutData(recordId)
  
    let data = {
      bookName
    }
  
    Book.set(data)
      .update()
      .then(res => cb(res))
      .catch(err => console.dir(err))
  }
  
  let deleteBook = (ctx, cb) => {
    let tableId = getApp().globalData.tableId,
      recordId = ctx.data.curRecordId
  
    let Books = new wx.BaaS.TableObject(tableId)
  
    Books.delete(recordId)
      .then(res => cb(res))
      .catch(err => console.dir(err))
  }
  
  module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    createBaseInfo
  }