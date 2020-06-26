$(function(){
    var form=layui.form
    form.verify({
        //验证规则，pwd是layui自带
        pwd:[/^[\S]{6,12}$/,'密码必须6~12,且不能出现空格'],
         //value指的是，将这个规则添加到哪，这个value指的就是那个元素的值
        //这指input修改密码
        //value指的是新密码的值，看是否与旧密码的值一致
        samePwd:function(value){
            if(value==$('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        //value指的是确认密码框的内容，看是否与新密码的值一致
        rePwd:function(value){
            console.log(value);
            if(value!==$('[name=newPwd]').val()){
                console.log($('[name=newPwd]').val());
                return '两次密码不一样'
            }
        }
    })
    //表单绑定提交事件，重置密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layui.layer.msg('更新密码失败,可能是原密码错误')
                }
                layui.layer.msg('更新密码成功')
                //重置表单，query中哦没有重置的方法，原生有
                //利用[0]将jquery转换成远程js，再运用reset方法
                $('.layui-form')[0].reset()
            }
        })
    })
})