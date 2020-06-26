$(function () {
    var layer = layui.layer
    //获取裁剪区域的dom元素
    var $image = $('#image')
    //配置选项
    const options = {
        //纵横比,宽和高的比例
        aspectRatio: 1,
        //指定预览区域，有两个，一个100一个50
        preview: '.img-preview',
    }
    //创建裁剪区域
    $image.cropper(options)
    //给上传注册点击事件，并在页面中输入一个隐藏的input的file文件上传
    //当点击上传按钮，随之触发文件上传功能
    $('#btnChooseImage').on('click', function () {
        //模拟文件上传点击
        $('#file').click()
    })
    //给文件选择框注册change事件，只要文件发生变化就会触发事件
    $('#file').on('change', function (e) {
        //用事件对象e得到用户选择的文件
        //e.target.files可以获取用户选择的文件
        console.log(e);
        var filters = e.target.files
        if (filters.length <= 0) {
            return layer.msg('请选择文件')
        }
        //更换裁剪的照片
        //1.拿到用户现在的文件,e.target.files是一个数组，e.target.files[0]指的是被选文件的name属性
        var file = e.target.files[0]
        //2.根据选择的文件，创建一个url地址
        //将文件转换成路径，展示到头像区域，用URL下的createObjectURL方法可以将文件转换成路径
        var newImgUrl = URL.createObjectURL(file)
        //3.先销毁旧的裁剪区域，再设置新的图片路径，之后再创建新的裁剪区域
        $image.cropper('destroy').attr('src', newImgUrl).cropper(options)
    })
    //为确定按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        //将用户裁剪的图片区域获取到，存放到dataURL中
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
            .toDataURL('image/png')
            $.ajax({
                type:'post',
                url:'/my/update/avatar',
                //data是用户裁剪过后的文件，即dataURL 
                data:{
                    avatar:dataURL 
                },
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('更换头像失败')
                    }
                    layer.msg('更换头像成功')
                    window.parent.getUserInfo()
                }
            })

    })

})
