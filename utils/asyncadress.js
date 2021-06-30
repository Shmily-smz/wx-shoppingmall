export const getAdress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
    })
}

export const showToast = ({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'success',
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        })
    })
}
export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
    })
}
export const payin = (params) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...params,
            success: (result) => {
                resolve(result)
            },
            fail: (error) => {
                reject(error)
            },
            complete: () => {}
        });
    })
}
export const getUserInfo = (desc) => {
    return new Promise((resolve, reject) => {
        wx.getUserProfile({
            desc: desc, // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                resolve(res)
            }
        })
    })
}
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)); //为什么加空的字符串，因为把传来的年份变成字符串
        //substr:截取前面的年份
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};


export const debounce = (fn, delay) => {
    let timer = null //借助闭包
    return function() {
        if (timer) {
            clearTimeout(timer) //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
            timer = setTimeout(fn, delay)
        } else {
            timer = setTimeout(fn, delay) // 进入该分支说明当前并没有在计时，那么就开始一个计时
        }
    }
}