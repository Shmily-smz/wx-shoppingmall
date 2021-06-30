// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        tabs: [{
                id: 1,
                name: "综合",
                isActive: true,
            },
            {
                id: 2,
                name: "销量",
                isActive: false,
            },
            {
                id: 3,
                name: "价格",
                isActive: false,
            },
        ],
        goodsItem: []
    },
    totalPagenum: 0,
    pages: 0,
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.QueryParams.cid = options.cid;
        this.getGoodList()
    },
    tabsClick(e) {
        let currentIndex = e.currentTarget.dataset.index;
        this.setData({
            currentIndex
        })

    },
    async getGoodList() {
        const { data: res } = await request({
            url: "/goods/search",
            data: this.QueryParams
        })
        let goodsItem = res.message.goods;
        this.totalPagenum = res.message.total,
            this.pages = Math.ceil(this.totalPagenum / this.QueryParams.pagesize)

        this.setData({
            goodsItem: [...this.data.goodsItem, ...goodsItem]
        })

    },
    onReachBottom() {
        if (this.pages > this.QueryParams.pagenum) {
            //总页数大于当前页，还可以上拉加下一页
            this.QueryParams.pagenum++;
            this.getGoodList()
        } else {
            wx.showToast({
                title: '不可以下一页',

            });
        }

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

        this.setData({
            goodsItem: []
        })
        this.QueryParams.pagenum = 1
        this.getGoodList()
        wx.stopPullDownRefresh()

    },

    /**
     * 页面上拉触底事件的处理函数
     */


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})