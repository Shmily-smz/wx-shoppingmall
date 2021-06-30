// pages/cart/index.js
import { request } from '../../request/index'
import { payin, showToast } from '../../utils/asyncadress'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        adress: {},
        cart: [],
        totalNum: 0,
        totalPrice: 0
    },
    onShow() {
        const adress = wx.getStorageSync("adress");
        let cart = wx.getStorageSync('cart') || []
        cart = cart.filter(item => item.checked == true)
        let totalNum = 0;
        let totalPrice = 0;
        cart.forEach((item) => {
            totalPrice += item.num * item.goods_price
            totalNum += item.num
        })
        this.setData({
            cart,
            totalPrice,
            totalNum,
            adress
        })

    },
    async handelOrderPay() {
        try {
            const token = wx.getStorageSync('token');
            if (!token) {
                wx.navigateTo({
                    url: '/pages/auth/index',
                });
                return
            }
            const { cart, adress, totalPrice } = this.data

            let goods = []
            cart.forEach(item => goods.push({
                goods_id: item.goods_id,
                goods_number: item.num,
                goods_price: item.goods_price
            }))
            const payParams = { order_price: totalPrice, consignee_addr: adress.all, goods: goods }
            const res = await request({ url: "/my/orders/create", method: "POST", data: payParams })
            const order_number = res.data.message.order_number;
            const { data: result } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } })
            console.log(result.message.pay);
            const payFor = result.message.pay

            const res2 = await payin(payFor)
                //查询后台订单状态
            const res3 = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } })
            await showToast({ title: "支付成功" })
            let newCart = wx.getStorageSync('cart')
            newCart = newCart.filter((item) => {
                !item.checked
            })
            wx.setStorageSync("cart", newCart);

            wx.navigateTo({
                url: "/pages/order/index"
            })

        } catch (error) {
            await showToast({ title: "支付失败" })
            console.log(error);
        }

    }


})