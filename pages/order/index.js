// pages/order/index.js
import { request } from '../../request/index'
import { formatDate } from '../../utils/asyncadress'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [],
        tabs: [{
                id: 1,
                name: "全部",

            },
            {
                id: 2,
                name: "待付款",

            },
            {
                id: 3,
                name: "代发货",

            },
            {
                id: 4,
                name: "退款/退货",

            },
        ],
        currentIndex: 0,
    },

    tabsClick(e) {

        let currentIndex = e.currentTarget.dataset.index;

        this.setData({
            currentIndex
        })


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(optionss) {
        console.log(optionss);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function(options) {
        const token = wx.getStorageSync("token");
        if (!token) {
            wx.navigateTo({
                url: "/pages/auth/index"
            })
            return
        }
        var curPages = getCurrentPages();
        let currentPages = curPages[curPages.length - 1]
            //console.log(currentPages.options);
        const { type } = currentPages.options
            //console.log(type);
        this.setData({
            currentIndex: type - 1
        })
        this.getOrders(1)
    },
    async getOrders(type) {
        const res = await request({ url: "/my/orders/all", data: { type } })
        let orders = res.data.message.orders

        this.setData({
            orders: orders.map(v => ({...v, create_time_cn: formatDate(new Date(v.create_time * 1000), 'yyyy-MM-dd') }))
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