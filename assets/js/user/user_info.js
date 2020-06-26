$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6之间'
            }
        }
    })
    initUserInfo()
    //获取用户的基本信息,定义函数
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                console.log(res);
                //调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //重置按钮注册点击事件
    $('#btnReset').on('click', function(e) {
        console.log('ok');

        //阻止表单默认重置，默认会将全部内容都清空
        e.preventDefault();
        //重新获取用户信息
        initUserInfo()
    })
    // 监听表单的提交行为
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认提交
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                //并将头像和欢迎名称字样修改
                //调用之前封装的头像函数即可
                //因为它是之前的父页面中的函数，为什么是父函数
                //因为点击左侧就会出现右侧中间区域
                window.parent.getUserInfo()
            }
        })
    })
})
