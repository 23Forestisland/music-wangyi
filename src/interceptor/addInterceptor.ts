
let needLogin = ['/pages/roam/roam','/pages/note/note','/pages/mine/mine','/pages/search/search','/pages/detail/detail']
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];


list.forEach(item => {
    uni.addInterceptor(item, {
        invoke(e) {
            const token = uni.getStorageSync('token');
            const url = e.url.split('?')[0];
                if (needLogin.includes(url) && !token) {
                    uni.showToast({
                        title: '该页面需要登录才能访问，请先登录',
                        icon: 'none'
                    });
                    uni.navigateTo({
                    url: "/pages/login/login"
                });
                return false;
            }
            return true;
        },
        fail(err) {
			// 失败回调拦截
			console.log(err);
		},

    });
});