let ajaxTime = 0
export const request = (params) => {
    let header = {...params.header };
    if (params.url.includes('/my/')) {
        header["Authorization"] = wx.getStorageSync("token");
    }

    ajaxTime++
    wx.showLoading({
        title: "加载中",
        mask: true,
    });

    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {

        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result)

            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {
                ajaxTime--;
                if (ajaxTime == 0) {
                    wx.hideLoading()
                }

            }

        })

    })
}