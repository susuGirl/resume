
const sdkApi = require('../services/sdk.js')

const recentlyViewResume = (shareResumeId, userName) => {
    console.log('6666666666------shareResumeId', shareResumeId,'-----userName---', userName)
    let recentlyViewed = shareResumeId + ',' + userName
    sdkApi.findRecentlyViewResume({}, res => {
        console.log('77777777777777777----res', res)
        if (res.objects.length > 0 && res.objects[0].id) {
            sdkApi.uAppendRecentlyViewResume({recentlyViewed: [recentlyViewed], recordID: res.objects[0].id}, updateRes => {
                console.log('9999999999999999-----updateRes', updateRes)
                if (updateRes.data.recentlyViewed.length > 20) {
                    console.log('4444444444444444444444--------')
                    sdkApi.removeRecentlyViewResume({recentlyViewed: [updateRes.data.recentlyViewed[0]], recordID: updateRes.data.id}, deleteRes => {
                        console.log('55555555555555--------deleteRes', deleteRes)
                    }) 
                }
            })
        } else {
            sdkApi.addRecentlyViewResume({recentlyViewed: [recentlyViewed]}, addRes => {
                console.log('88888888888888888--------addRes', addRes)
            })
        }
    })
}

// handleDeleteLastResume = (res) => {
//     console.log('6666666666666-----e', res)
//     let params = e.detail.shareresumeId + ',' + e.detail.userName
//     sdkApi.removeRecentlyViewResume({recordID: this.data.recordID, recentlyViewed: params}, res => {
//         this.findRecentlyViewResume()
//     })

// }

module.exports = {
    recentlyViewResume
}