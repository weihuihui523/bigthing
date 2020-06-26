$(function () {
    //调用函数
    getUserInfo()
    //给退出按钮绑定点击事件
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        //confirm  第一个参数是提示信息，第二个参数是对象，icon是指定显示什么图标，title是上面的提示；
        //第三个参数是回调，当用户点击确定按钮才会触发回调函数
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token，用localStorage.removeItem是移除
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'
            // 关闭 confirm 询问框，官方提供
            layer.close(index)
        })
    })
})
//定义函数获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        //请求头信息,登录的请求都要加请求头，它是登录进后台页面的凭证，
        //没有加应该会登录失败
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        data: '',
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                //失败就会有提示信息
                return layui.layer.msg('获取用户信息失败！')
            }
            //成功了就调用渲染用户头像的函数
            //将用户数据即res.data传递
            renderAvatar(res.data)
        },
        //无论请求是否成功，都会有complete函数的调用
        // complete: function (res) {
        //     console.log(res);
        //     //通过res.responseJSON可以拿到响应的数据
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败') {
        //         //强制清空token
        //         localStorage.removeItem('token')
        //         //强制跳转到登录页面
        //         location.href = '/login.html'

        //     }
        // }
    })
    //渲染用户的头像
    function renderAvatar(user) {
        //获取用户名称，用户名称有两个
        var name = user.nickname || user.username
        //设置欢迎的文本,将欢迎后面的省略号变成用户名
        $('#welcome').html('欢迎&nbsp;&nbsp' + name)
        //按需渲染用户的头像
        //如果存在头像头像就渲染
        if (user.user_pic !== null) {
            //将图像图片换成user.user_pic
            $('.layui-nav-img').attr('src', user.user_pic).show()
            //将文本头像隐藏
            $('.text-avatar').hide()
        } else {
            //如果不存在就渲染字体头像
            //将头像隐藏
            $('.layui-nav-img').hide()
            //文本头像显示第一个字符，无论大写小写统一显示大写
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
}