$(function () {
    /***
     * 音乐控制器：点击控制音乐播放暂停
     * 思路：
     *     1.获取音乐--音频视频标签---操作原生js  DOM元素获取内容
     *     2.点击按钮--判断当前的音乐是否是暂停的  如果暂停-true  否则false 
     *     3.当前的点击的音乐是暂停---让音乐播放 同时图片修改  否则反之
     *     4.当前音乐开始播放的时候---获取当前播放的时间  总时间
     *     5.当前音乐播放后 获取音乐的进度条的比例：=当前的播放时间/总时间 *100 +'%'
     *     6.设置进度条的宽度 
     *     7.音乐播放完毕---播放的按钮图片修改
     */
    //注意：音频 视频 JS提供 API是一样的
    //1.获取音频
    var audio = document.getElementById('audio');  //jquery获取---转DOM 
    //备注：想实现---进入页面就获取-----获取当前的总时长
    // console.log(audio.duration);//NaN 直接获取获取不到   jquery入口函数：加载完DOM 直接js代码 注意：此时src资源没有加载完毕
    //oncanplay	在用户可以开始播放视频/音频（audio/video）时触发 可以获取总时间
    audio.oncanplay = function () {
        // console.log(audio.duration);
        $(".duration").html(times(audio.duration));
        //当视频或者音频 获取网上资源的时候--不能进入页面就立马点击，有可能数据资源没有获取，点击可能导致没有播放
        //在oncanplay触发 点击播放事件 
        //2.点击按钮--判断当前的音乐是否是暂停的
        $(".play img").click(function () {
            //3.判断当前的音乐是否是暂停的  paused		暂停状态  暂停 true  false播放
            if (audio.paused) {//true-暂停
                //音乐播放
                audio.play();
                $(".play img").attr('src', 'images/pause.png');

            } else {
                //音乐暂停
                audio.pause();		//暂停
                $(".play img").attr('src', 'images/play-btn_03.png');
            }
        })

    }
    //4.当前音乐开始播放的时候---获取当前播放的时间  总时间
    //方法1：可以用计时器 监听音乐播放  ---获取时间 ---
    //方法2：音频里面有个事件--监听音乐或者是视频是否播放：---ontimeupdate	当前音频/视频播放时间发生改变时触发
    audio.ontimeupdate = function () {
        // console.log('当前的播放时间:',audio.currentTime);//currentTime	返回当前音频/视频的播放时间 秒
        // console.log('音频的总的时间:',audio.duration);//duration 返回当前音频/视频的总时长  秒
        //获取当前的播放的时间  ---处理时间--秒为单位增
        $(".current").html(times(audio.currentTime));
        //5.获取音乐的进度条的比例：=当前的播放时间/总时间 *100 +'%'
        var pre = audio.currentTime / audio.duration * 100 + '%';
        // console.log(pre);
        //设置进度条的宽度
        $(".innerProgress").css('width', pre);

        //6.播放完毕---按钮图片切换----ended 返回当前音频/视频是否播放结束 true结束
        if (audio.ended) {
            audio.pause();
            $(".play img").attr('src', 'images/play-btn_03.png');
        }
    }

    //时间函数---秒 
    //函数功能：给我一个秒的单位数值 转成多少分多少秒 00:00 时间
    function times(num) {//num秒 例子：num=325秒   num/60得分 num%60得秒
        var m = parseInt(num / 60);
        var s = parseInt(num % 60);
        m = m > 9 ? m : '0' + m;
        s = s > 9 ? s : '0' + s;

        return m + ':' + s;
    }

    //动态获取音频数据------------------
    $.ajax({
        type:'get',
        url:'http://iwenwiki.com/api/blueberrypai/getSongInfo.php',
        data:{
            song:'mo'
        },
        success:function(res){
            console.log(res);//注意点:1 获取dom元素 插入内容 不是像首页全部内容都动态出入DOM元素 
            var songInfo=res.songInfo;
            //获取音乐的标题
            $(".music_title").html(songInfo.song_title);
            //作者图片 song_pic
            //注意点：2.图片地址不完善 图片相对路径  拼接基础路径+相对路径 
            $(".author_img").attr('src','http://iwenwiki.com/api/blueberrypai/'+songInfo.song_pic);//http://iwenwiki.com/api/blueberrypai/indexImg/naying.png

            $(".author_info").html(songInfo.song_intro_cont);
            //获取音乐路径
            //song_source   路径：http://iwen.wiki/sxtstu/blueberrypai/那英-默.mp3
            var songurl=songInfo.song_source.replace(/iwen.wiki\/sxtstu/g,'iwenwiki.com/api');
            // $("audio").attr() 不建议这样太添加   建议原生操作赋值
            audio.setAttribute('src',songurl);
        }
    })

    //文章内容--------------------------------------
    $.get('http://iwenwiki.com/api/blueberrypai/getInterestingInfo.php',function(res){
        console.log(res);
        //1.文章数据获取----- interestingInfo
        var interestingInfo=res.interestingInfo;
        getArtice(interestingInfo);
        
        //2.旅游标签

        //3.热门推荐
    
    })  

    //文章数据获取---定义函数---解析数据
    function getArtice(obj){//obj=interestingInfo
        console.log(obj);
        //显示标题信息 interest_title
        $(".content h3").html(obj.interest_title);
        //文章内容区域-- interest_cont
        // $(".content_text").html(obj.interest_cont);//不能直接添加文本数据---没有换行一堆文字
        // console.log(obj.interest_cont);
        
        //方法1.文章的后台返回的文字信息处理   标签<pre></pre>
        // $(".content_text").html('<pre>'+obj.interest_cont+'</pre>');

        //方法2：处理数据 根据后台返回的数据换行 进行切割  本身内容=string--按回车--数组
        //php语法：后台回车 \r\n   转成数组---再遍历数组---渲染数据
        // var arr=obj.interest_cont.split('\r\n');
        // // console.log(arr);
        // var str='';
        // for(var i=0;i<arr.length;i++){
        //     str+=`<p>${arr[i]}</p>`;
        // }
        // //for结束后---获取数据
        // $(".content_text").html(str);

        //方法3：当内容是空的时候  2次换行的时候  自定义p标签的高度
        var arr=obj.interest_cont.split('\r\n');
        // console.log(arr);
        var str='';
        for(var i=0;i<arr.length;i++){
            if(arr[i]){
                str+=`<p>${arr[i]}</p>`;
            }else{
                str+='<div class="juli"></div>';
            }
        }
        //juli自定义间距 
        //for结束后---获取数据
        $(".content_text").html(str);       
    }










    


























})