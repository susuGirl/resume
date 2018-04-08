
const requestApi = require('./request.js')

class appApi {
    constructor () {
        this.productsUrl = '/sunshine/shop/goods/category/all'
        this.demoUrl = '/sunshine/shop/goods/category/all'
    }

    productsQuery (params) {
        return requestApi.request(this.productsUrl, params).then(res => {
            return res.data
        })
    }

    demoQuery (params) {
        return requestApi.request(this.demoUrl, params).then(res => {
            return res.data
        })
    }
}

module.exports = new appApi