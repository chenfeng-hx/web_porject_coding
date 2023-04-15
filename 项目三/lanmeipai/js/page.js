$(function(){
    /***
     * 总的思路：
     *  1.分页的内容 是动态添加 --服务器内容
     *  2.两个变量 总的页码数  和当前的选中的页码
     *  3.元素的创建--是从左到右以此追加 添加数据
     *  4.函数--动态创建分页的元素html  
     *  5.定义函数----页码点击事件
     * 
     */
     //一、定义函数 ---函数是动态创建html页码的内容 
    //  addPage(7,10);
     function addPage(current,maxPage){//current当前选中的页码  maxPage是最大页码数
            //清空容器
            $(".ts-page").html('');
            //元素的创建--是从左到右以此追加 添加数据
            //1.显示 [首页] [上一页]
            if(current>1){
                $(".ts-page").append('<span class="tspage-start">首页</span><span class="tspage-before">上一页</span>');
            }else{
                $(".ts-page").append('<span class="tspage-before disable">上一页</span>');
            }
            //2.首页 上一页 【...】  注意:当前的选中元素>3 同时注意显示一直是5个页面 1 2 3 4 5 控制maxPage>5
            if(current>3 && maxPage>5){
                $(".ts-page").append('<span class="tspage-ell">...</span>');
            }

            //3.显示页码  首页 上一页 ...  2 3 【4】 5 6 ...  先找中间规律  显示5个页码
            //页码5个：current-2   current-1  [current]  current+1  current+2 
            var start=current-2;//开始位置
            var end=current+2;//结束的条件
            //特殊的位置：开头位置 current=1 / 2 
            if(current <= 2 ){
                start=1;//开始的页码  
                end=maxPage>5?5:maxPage;//结束的值？总的页码数>5 可以显示5 但是如果小于5 
            }
            //特殊结尾的：2个内容
            if(current >= maxPage-1){
                start=maxPage-4>0?maxPage-4:1;//用减的时候 特别注意：
                end=maxPage;
            }
            for(;start<=end;start++){
               if(start==current){
                    $(".ts-page").append('<span class="page on">'+start+'</span>');
               }else{
                $(".ts-page").append('<span class="page">'+start+'</span>');
               }
            }

            //4. 显示 首页 上一页 ...  2 3 4 5 6 [...] 控制 
            //总的页码<=5 直接展示所有的页码 -总的页码数>5 并且 current <maxPage-2 
            if(maxPage>5 && current < maxPage-2){
                $(".ts-page").append('<span class="tspage-ell">...</span>');
            }

            //5.下一页 和 尾页
            if(current<maxPage){
                $(".ts-page").append('<span class="tspage-after">下一页</span><span class="tspage-end">尾页</span>');
            }else{
                $(".ts-page").append('<span class="tspage-after disable">下一页</span>');
            }


     }

     //二、点击事件 ---动态创建的元素---必须通过绑定添加事件
    //  addEvent(10);
    function addEvent(maxPage){
        //点击事件穿透 on()  动态  解绑
        $(".ts-page").off('click');
        //1.点击中间页码的时候--切换选中的页码 
        $(".ts-page").on('click','.page',function(){
            console.log($(this).html());//string 
            //获取页码
            var num=parseInt($(this).html());
            //切换选中内容
            // addPage(num,maxPage);  
            //点击的时候---请求当前的页码的数据接口
            getData(num);  
        })

        //2.点击首页
        $(".ts-page").on('click','.tspage-start',function(){
            // addPage(1,maxPage)
            getData(1);  
        })
        //3.点击尾页
        $(".ts-page").on('click','.tspage-end',function(){
            // addPage(maxPage,maxPage)
            getData(maxPage)
        })

        //4.点击下一页  思路:1.获取当前的兄弟元素是on选中高亮的标签内容  2.让on高亮元素 num++   动态创建
        $(".ts-page").on('click','.tspage-after',function(){
           var num=parseInt($(this).siblings('.on').html());
           num++;
           console.log(num);
           if(num<=maxPage){
                // addPage(num,maxPage);
                getData(num)
           } 
        })
        //5.点击上一页
        $(".ts-page").on('click','.tspage-before',function(){
            var num=parseInt($(this).siblings('.on').html());
            num--;
            console.log(num);
            if(num >= 1){
                //  addPage(num,maxPage);
                getData(num)
            } 
         })
    }


    //三、网络请求----------------------
    //1.ajax请求分页数据 会多次触发  只要页码修改重新请求   2.页码做变量 函数()获取数据 
    getData(1);
    function getData(num){
        $.get('http://iwenwiki.com/api/blueberrypai/getBlueBerryJamInfo.php',{
            blueBerryjam_id:num
        },function(res){
            console.log(res);
            showData(res,num)
        })
    }

    function showData(res,num){p[' ']
        var maxPage=res.maxPage;//最大页码数--总数
        var arr=res.blueBerryJam;
        var str='';
        for(var i=0;i<arr.length;i++){
            var newImg=arr[i].img.replace(/iwen.wiki\/sxtstu/g,'iwenwiki.com/api');
            str+=` <li>
                    <img src="${newImg}" alt="">
                    <span>${arr[i].title}</span>
                </li>`;
        }
        //for结束
        $(".list").html(str);
        //页码插入数据完毕---才能显示分页---
        addPage(num,maxPage);
        addEvent(maxPage);
        //点击分页后---页面要返回顶部---不能停留在下面
        $(window).scrollTop(0);
    }



    

})