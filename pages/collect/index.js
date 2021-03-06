// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 1,
                name: "商品收藏",
                isActive: true,
            },
            {
                id: 2,
                name: "品牌收藏",
                isActive: false,
            },
            {
                id: 3,
                name: "店铺收藏",
                isActive: false,
            }, {
                id: 4,
                name: "浏览足迹",
                isActive: false,
            }
        ],
        currentIndex: 0,
        collectList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    tabsClick(e) {

        let { index } = e.currentTarget.dataset
        let currentIndex = index
        this.setData({
            currentIndex
        })
    },
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        const collectList = wx.getStorageSync("collectList");
        this.setData({
            collectList
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})