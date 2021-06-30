// pages/search/index.js
import { request } from '../../request/index'
import { debounce } from '../../utils/asyncadress'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchList: [],
        isFouse: false,
        inpValue: ""
    },
    timer: null,
    changeInput(e) {

        let inputValue = e.detail.value;
        if (!inputValue.trim()) {
            clearTimeout(this.timer);
            this.setData({
                searchList: [],
                isFouse: false
            })
            return;
        }
        this.setData({
            isFouse: true
        })
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.searchQuery(inputValue)
        }, 1000)
    },
    async searchQuery(value) {
        const res = await request({ url: "/goods/search", data: { query: value } })
        let searchList = res.data.message.goods;
        this.setData({
            searchList
        })
    },
    iptClose() {
        this.setData({
            searchList: [],
            isFouse: false,
            inpValue: ''
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
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