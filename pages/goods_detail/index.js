// pages/goods_detail/index.js
import { request } from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj: {},
        swiperLists: []
    },
    swiperLists: [],
    showIf: false,
    goodsObj: {},
    collectList: [],
    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function() {
        var curPages = getCurrentPages();
        let currentPages = curPages[curPages.length - 1]
        let options = currentPages.options
        let { goods_id } = options
        this.getGoodslist(goods_id)

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    async getGoodslist(goods_id) {

        const { data: res } = await request({
            url: "/goods/detail",
            data: { goods_id }
        })
        let goodsObj = res.message
        this.goodsObj = res.message
        const swiperLists = res.message.pics
        this.swiperLists = res.message.pics
        let collectList = wx.getStorageSync("collectList") || [];
        let showIf = collectList.some(item => item.goods_id === this.goodsObj.goods_id);
        this.setData({
            goodsObj: {
                goods_name: goodsObj.goods_name,
                goods_price: goodsObj.goods_price,
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
                pics: goodsObj.pics
            },
            swiperLists,
            showIf
        })
    },
    handleprevewImage(e) {
        console.log(this.swiperLists)
        console.log(e)
        const urls = this.swiperLists.map((item) => item.pics_mid)
        const { url } = e.currentTarget.dataset
        console.log(url);
        wx.previewImage({
            current: url,
            urls
        })
    },
    addCart() {
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex((item) => item.goods_id === this.goodsObj.goods_id)
        if (index != -1) {
            cart[index].num++
                wx.showToast({
                    title: '+1',
                    icon: 'success',
                    mask: true,
                });
        } else {
            this.goodsObj.checked = true
            this.goodsObj.num = 1
            cart.push(this.goodsObj)
            wx.showToast({
                title: '加入成功',
                icon: 'success',
                mask: true,
            });
        }
        wx.setStorageSync("cart", cart);


    },
    collect() {
        let collectList = wx.getStorageSync("collectList") || [];
        let index2 = collectList.findIndex(item => item.goods_id === this.goodsObj.goods_id)
        let showIf = false;
        if (index2 != -1) {
            collectList.splice(index2, 1)
            wx.showToast({
                title: '取消收藏',
                icon: 'success',
                mask: true,
            });
            showIf = false
        } else {
            collectList.push(this.goodsObj)
            wx.showToast({
                title: '收藏成功',
                icon: 'success',
                mask: true,
            });
            showIf = true
        }
        wx.setStorageSync('collectList', collectList)
        this.setData({
            showIf
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */

})