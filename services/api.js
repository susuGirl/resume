
const requestApi = require('./request.js')

class appApi {
    constructor () {
        this.productsUrl = '/sunshine/shop/goods/category/all'
        this.demoUrl = '/sunshine/shop/goods/category/all'
        this.getCredentialsUrl = '/oserve/v1/upload'
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

    getCredentials (params) {
        return requestApi.getCredentials(this.getCredentialsUrl, params).then(res => {
            return res.data
        })
    }
}

module.exports = new appApi