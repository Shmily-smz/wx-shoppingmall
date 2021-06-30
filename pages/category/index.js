// pages/category/index.js
import { request } from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //总数据
        cates: [],
        //左侧数据
        leftList: [],
        aaa: 'aaa',
        //右侧数据
        rightList: [],
        currentIndex: 0,
        scrollTop: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log('aaa');
        const Cates = wx.getStorageSync("cates");
        if (!Cates) {
            this.getCategory()
        } else {
            if (Date.now() - Cates.time > 1000 * 100) {
                this.getCategory()
            } else {
                this.cates = Cates.data
                let leftList = this.cates.map((v) => v.cat_name);
                let rightList = this.cates[this.data.currentIndex].children;
                this.setData({
                    leftList,
                    rightList
                })
            }
        }
    },
    async getCategory() {
        const result = await request({ url: "/categories" })
        this.cates = result.data.message;
        //把接口数据存入到本地存储中
        wx.setStorageSync("cates", {
            time: Date.now(),
            data: this.cates
        });
        let leftList = this.cates.map((v) => v.cat_name);
        let rightList = this.cates[this.data.currentIndex].children;
        this.setData({
            leftList,
            rightList
        })

    },
    clickLeftlist(e) {
        let currentIndex = e.currentTarget.dataset.index;
        let rightList = this.cates[currentIndex].children;
        console.log(this.cates);
        this.setData({
                currentIndex,
                rightList,
                scrollTop: 0
            })
            //this.getCategory()
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