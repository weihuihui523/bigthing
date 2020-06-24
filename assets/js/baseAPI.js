//每次调用$.get()、$.post、$.ajax(),都会先调用
//ajaxPrefilter这个函数，用来获取属性url
//options指的是ajax请求提交过来所有的请求,即$.ajax({})中的内容
$.ajaxPrefilter(function(options){
    console.log(options);
    options.url='http://ajax.frontend.itheima.net'+options.url;
    console.log(options.url);
})