
const sdkApi = require('../services/sdk.js')

const recentlyViewResume = (shareResumeId, userName) => {
    console.log('6666666666------shareResumeId', shareResumeId,'-----userName---', userName)
    let recentlyViewed = shareResumeId + ',' + userName
    sdkApi.findRecentlyViewResume({}, res => {
        console.log('77777777777777777----res', res)
        if (res.objects.length > 0 && res.objects[0].id) {
            sdkApi.uAppendRecentlyViewResume({recentlyViewed: [recentlyViewed], recordID: res.objects[0].id}, updateRes => {
                console.log('9999999999999999-----updateRes', updateRes)
            })
        } else {
            sdkApi.addRecentlyViewResume({recentlyViewed: [recentlyViewed]}, addRes => {
                console.log('88888888888888888--------addRes', addRes)
            })
        }
    })
}

module.exports = {
    recentlyViewResume
}