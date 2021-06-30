//Page Object
import { request } from '../../request/index.js';
Page({
    data: {
        swiperList: [],
        cartList: [],
        homeList: []
    },
    //options(Object)
    onLoad: function(options) {
        this.getSwiperList()
        this.getCateList()
        this.getHomeList()
    },
    getSwiperList() {
        request({ url: '/home/swiperdata' }).then(result => {
            this.setData({
                swiperList: result.data.message
            })
        }).catch((error) => {
            console.log(error)
        })
    },
    getCateList() {
        request({ url: "/home/catitems" }).then(result => {

            this.setData({
                cartList: result.data.message

            })

        })
    },

    getHomeList() {
        request({ url: "/home/floordata" }).then(result => {
            this.setData({
                homeList: result.data.message

            })

            console.log(this.data.homeList);
        })
    },

    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});