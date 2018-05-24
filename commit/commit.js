
const sdkApi = require('../services/sdk.js')

const recentlyViewResume = (shareResumeId, userName) => {
    let recentlyViewed = shareResumeId + ',' + userName
    sdkApi.findRecentlyViewResume({}, res => {
        if (res.objects.length > 0 && res.objects[0].id) {
            sdkApi.uAppendRecentlyViewResume({recentlyViewed: [recentlyViewed], recordID: res.objects[0].id}, updateRes => {
                if (updateRes.data.recentlyViewed.length > 20) {
                    sdkApi.removeRecentlyViewResume({recentlyViewed: [updateRes.data.recentlyViewed[0]], recordID: updateRes.data.id}, deleteRes => {
                    }) 
                }
            })
        } else {
            sdkApi.addRecentlyViewResume({recentlyViewed: [recentlyViewed]}, addRes => {
            })
        }
    })
}

module.exports = {
    recentlyViewResume
}