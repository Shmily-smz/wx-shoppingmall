// pages/feedback/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        tabs: [{
                id: 1,
                name: "体验问题",
                isActive: true,
            },
            {
                id: 2,
                name: "商品商家投诉",
                isActive: false,
            },

        ],
        textVal: "",
        chooseImage: []
    },
    tabsClick(e) {
        let currentIndex = e.currentTarget.dataset.index;
        this.setData({
            currentIndex
        })

    },
    handleChooseImg() {
        wx.chooseImage({
            count: 9,
            //图片格式
            sizeType: ['original', 'compressed'],
            //图片的来源。相册，照相机
            sourceType: ['album', 'camera'],
            success: (result) => {
                console.log(result);
                this.setData({
                    chooseImage: [...this.data.chooseImage, ...result.tempFilePaths]
                })
            },
            fail: () => {},
            complete: () => {}
        });
    },
    handleRemoveImg(e) {
        console.log(e);
        const { index } = e.currentTarget.dataset;
        let chooseImage = this.data.chooseImage;
        chooseImage.splice(index, 1)
        this.setData({
            chooseImage
        })
    },
    handleTextInput(e) {
        this.setData({
            textVal: e.detail.value,
        })

    },
    handleFormSubmit() {
        const { textVal, chooseImage } = this.data;
        if (!textVal.trim()) {
            wx.showToast({
                title: '输入不合法',
                icon: 'none',
                image: '',
                duration: 1500,
                mask: true,

            });
            return;
        }
        chooseImage.forEach((item, index) => {
            console.log(item);
            wx.uploadFile({
                url: 'https://imgchr.com/',
                filePath: item,
                name: "file",
                formData: {},
                success: (result) => {
                    console.log(result);
                    if (index == chooseImage.length - 1) {
                        this.setData({
                            textVal: "",
                            chooseImage: []
                        })
                        wx.navigateTo({
                            url: '/pages/index/index',
                            success: (result) => {

                            },
                            fail: () => {},
                            complete: () => {}
                        });

                    }
                },
                fail: () => {},
                complete: () => {}
            });

        })


    },
    /**
     * 生命周期函数--监听页面加载
     */

})