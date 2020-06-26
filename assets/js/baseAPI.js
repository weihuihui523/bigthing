//每次调用$.get()、$.post、$.ajax(),都会先调用
//ajaxPrefilter这个函数，用来获取属性url
//options指的是ajax请求提交过来所有的请求,即$.ajax({})中的内容
$.ajaxPrefilter(function (options) {
    // console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // console.log(options.url);
    //统一为有权限的接口，设置header请求头
    //只有/my开头登录后的接口才会需要请求头信息,查看url地址中是否包含以my开头的地址
    //indexOf方法是看是否含有被检查的信息
    if (options.url.indexOf('/my') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
          // 1. 强制清空 token
          localStorage.removeItem('token')
          // 2. 强制跳转到登录页面
          location.href = '/login.html'
        }
      }
})