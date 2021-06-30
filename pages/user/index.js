// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        collectList: {}
    },

    onShow() {
        const userInfo = wx.getStorageSync('userInfo');
        const collectList = wx.getStorageSync('collectList')
        this.setData({
            userInfo,
            collectList
        })

    }
})