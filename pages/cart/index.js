// pages/cart/index.js
import { getAdress, setCart, showToast } from "../../utils/asyncadress"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        adress: {},
        cart: [],
        allChecked: "",
        totalNum: 0,
        totalPrice: 0
    },
    onShow() {
        const adress = wx.getStorageSync("adress");
        const cart = wx.getStorageSync('cart') || []

        this.setCart(cart)
        this.setData({
            adress,
        })

    },
    async handleChooseAdress() {
        const result = await getAdress()
        let adress = result;
        adress.all = adress.provinceName + adress.cityName + adress.countyName + adress.detailInfo
        wx.setStorageSync("adress", adress);
    },
    handelitemChange(e) {
        const { index } = e.currentTarget.dataset;

        let { cart } = this.data;
        var index1 = cart.findIndex(item => item.goods_id === index)
        cart[index1].checked = !cart[index1].checked;
        this.setCart(cart)

    },
    setCart(cart) {

        let totalNum = 0;
        let totalPrice = 0;
        let allChecked = cart.length ? cart.every(item => item.checked) : false;
        cart.forEach((item) => {
            if (item.checked) {
                totalPrice += item.num * item.goods_price
                totalNum += item.num
            } else {
                allChecked = false
            }
        })
        this.setData({
            cart,
            allChecked,
            totalPrice,
            totalNum
        })
        wx.setStorageSync('cart', cart)
    },
    allChange() {
        let { cart, allChecked } = this.data;
        allChecked = !allChecked;
        cart.forEach(item => {
            item.checked = allChecked
        })
        this.setData({
            allChecked
        })
        this.setCart(cart)
    },
    changenum(e) {
        if (this.data.allChecked == true) {
            const { index, operation } = e.currentTarget.dataset
            let { cart } = this.data
            const index2 = cart.findIndex(item => item.goods_id === index)
            if (cart[index2].num === 1 && operation === -1) {
                wx.showModal({
                    title: '提示',
                    content: '是否要删除',
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                    success: (result) => {
                        if (result.confirm) {
                            cart.splice(index2, 1)
                            this.setCart(cart)
                        } else if (result.cancel) {
                            console.log('用户点击取消');
                        }
                    },
                });
            } else {
                cart[index2].num += operation
                this.setCart(cart)
            }

        }
    },
    async showAll() {
        const { adress, totalNum } = this.data
        if (!adress.userName) {
            await showToast({
                title: "您还没有选择收货地址"
            })
            return
        }
        if (totalNum == 0) {
            await showToast({
                title: "您还没有选择商品"
            })
            return
        }
        wx.navigateTo({
            url: '/pages/pay/index',

        });

    }
})