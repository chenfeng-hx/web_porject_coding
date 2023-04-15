# 整体架构

1. 前端三件套
2. jQuery
3. swiper.css



原生js在资源加载结束之后进行介入，jQuery较快，先介入，此时资源还没有加载结束



音频和视频的API方法：

<audio src='' autoplay controls></audio>	

\<audio src='' autoplay controls></audio>

        常用属性:
        autoplay	自动播放
        controls	显示控件
        currentTime	返回当前音频/视频的播放时间
        duration	    返回当前音频/视频的总时长
        ended		返回当前音频/视频是否播放结束
        paused		暂停状态  暂停 true  false播放
        src			音频/视频路径
        volume		设置音量

        常用事件：
        oncanplay	在用户可以开始播放视频/音频（audio/video）时触发   视频/音频（audio/video）在加载过程中，触发的
        ontimeupdate	当前音频/视频播放时间发生改变时触发   
        object.addEventListener("timeupdate", myScript); function myScript(){ }
        play()		播放
        pause()		暂停



1.什么是跨域 什么情况下产生跨域？
    从当前的域下去访问其他的域下的资源,浏览器的同源策略出于安全考虑默认是不允许的是阻止的。

2.同源策略？
    同源策略是 浏览器最核心的最基本的安全的功能。如果是同源的可以页面数据可以相互访问，非同源不允许
    同源策略即是 协议  域名  端口号 三个必须一致  有一个不同就跨域

3.跨域解决方案 (重点)
    1.jsonp 
    2.cors 资源共享
    3.代理 proxy  (四阶段)
    4.iframe 

4. php代理 
    $con=file_get_content('');  echo $con;

5.jsonp实现原理 (重点)
    动态创建script标签,利用script标签的src属性可以访问浏览器上的任意资源，不存在跨域。所以我们让src访问服务器资源
    服务器接受请求 处理内容。前端需要定义函数接受后台返回的数据。

    备注：
        jsonp只有get请求 

6.jsonp 实现 (掌握)
    1.script写法  ---百度案例
    2.jquery写法
        $.ajax({
            type:'get',
            url:'',
            data:{},
            dataType:'jsonp',
            jsonp:'后台接受的变量-函数名',
            jsonpCallback:'返回给前端的函数名-可以省略',
            success:callback
        })

7.cors 资源共享 (掌握)  


8.项目 ---目的：
    1.布局
    2.swiper使用 ---轮播图---(1.轮播图插件 2.自己写   3.swiper--首页多次使用)
    3.网络请求---前后端交互  
    4.html5  音频视频 
    5.分页 --插件
    6.登录

boostrap（框架---响应式框架--自适应）