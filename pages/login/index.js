// pages/login/index.js
import { getUserInfo } from '../../utils/asyncadress'
Page({
    data: {
        userInfo: {},

    },

    async getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        console.log(e);
        const res = await getUserInfo('aaa')
        const { userInfo } = res
        wx.setStorageSync("userInfo", userInfo);
        wx.navigateBack({
            delta: 1
        });
    },
})