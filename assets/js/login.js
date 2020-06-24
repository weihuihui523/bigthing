$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //只要导入了layui文件，相当于获取了layui对象，就像导入jquery.js得到$对象一样
    var form = layui.form
    //从layui中获取layer对象
    var layer=layui.layer
    console.log(form);
    // 在layui的form属性中有校验的几种常用的方法
    // 这个类似$.ajax({})
    form.verify({
        //自定义验证规则，第一个参数是验证规则，第二个参数是错误信息
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //自定义确认两次密码是否一致验证规则，形参是确认密码的内容
        repwd: function (value) {
            //获取输入密码的内容
            var pwd = $('.reg-box [name=password]').val()
            console.log(pwd);
            if (pwd !== value) {
                return '两次密码不一样'
            }
        }
    })
    //监听注册表单提交信息，即点击注册按钮，将用户名和密码收集并提交，情趣方式为post
    //给注册表单注册提交submit事件
    $('#form_reg').on('submit',function(e){
        //阻止表单默认行为
        e.preventDefault();
         var data={
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()

        }
        //获取提交表单请求
        $.post('/api/reguser',data,function(res){
            console.log(res);
            if(res.status!==0){
                //layer中有个msg属性，提示信息
                console.log(layer);
                
             return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录')
        //给注册按钮添加一个点击事件，模拟点击，即再注册成功后就跳转到登录页面
        $('#link_login').click()      
        })
    })
    //监听登录表单的提交事件
    $('#form-login').on('submit',function(e){
        //因为是ajax请求，有表单跳转行为，所以阻止表单默认行为
        e.preventDefault();
        var data={
            username:$('#form-login [name=username]').val(),
            password:$('#form-login [name=password]').val()

        }
        $.post('/api/login',data,function(res){
            if(res.status!==0){
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')
            //有权限的接口，必须使用token才能请求成功，把token放到请求头中
            //将token放到localStorage，再localStorage中有个setItem属性是将
            //数据保存里面
            localStorage.setItem('token',res.token)
            location.href='index.html'
        })
    })
})