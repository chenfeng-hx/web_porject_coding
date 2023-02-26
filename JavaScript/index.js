// 在所有 DOM 节点加载完成后再进行逻辑处理
window.onload = function () {
    // 定义一个全局变量用于替换大图片中的路径
    let bigImgIndex = 0;

    // 定义一个全局变量用于选择标签结果的删除功能之间的数据通信
    let _dlNodesLength = 0;
    let resArr = new Array(_dlNodesLength);
    resArr.fill(0);

    // 路径导航部分数据渲染
    function navPathDataLoad() {
        let pathData = goodData.path;
        let navPath = document.querySelector('.navPath');
        // 进行遍历 
        for (let j = 0; j < pathData.length; j++) {
            // 创建节点
            let aNode = document.createElement('a');
            aNode.href = pathData[j].url;
            aNode.innerText = pathData[j].title;
            navPath.appendChild(aNode);
            let spanNode = document.createElement('span');
            spanNode.innerText = '/';
            if (j !== pathData.length - 1) {
                navPath.appendChild(spanNode);
            }
        }
    }
    navPathDataLoad();

    // 放大镜动态效果展示
    function manGlass() {
        let smallPic = document.querySelector('.smallPic');
        let imagesSrc = goodData.imagessrc;
        let leftTop = document.querySelector('.leftTop');

        // 鼠标进入，展示效果
        smallPic.onmouseenter = function (e) {
            // 动态创建和删除遮罩层元素和放大图片
            let mask = document.createElement('div');
            mask.className = 'mask';
            let bigPic = document.createElement('div');
            bigPic.className = 'bigPic';
            let bigImg = document.createElement('img');
            bigImg.src = imagesSrc[bigImgIndex].b;

            bigPic.appendChild(bigImg);
            smallPic.appendChild(mask);
            leftTop.appendChild(bigPic);
            // 鼠标移动效果
            smallPic.onmousemove = function (e) {
                // 遮罩层元素移动
                let left = e.clientX - mask.offsetWidth / 2 - smallPic.getBoundingClientRect().left;
                let top = e.clientY - mask.offsetHeight / 2 - smallPic.getBoundingClientRect().top;
                if (left < 0) {
                    mask.style.left = 0;
                } else if (left > smallPic.offsetWidth - mask.offsetWidth) {
                    mask.style.left = smallPic.offsetWidth - mask.offsetWidth + 'px';
                } else {
                    mask.style.left = left + 'px';
                }
                if (top < 0) {
                    mask.style.top = 0;
                } else if (top > smallPic.offsetHeight - mask.offsetHeight) {
                    mask.style.top = smallPic.offsetHeight - mask.offsetHeight + 'px';
                } else {
                    mask.style.top = top + 'px';
                }
                // 大图片移动
                let scale = (smallPic.clientWidth - mask.offsetWidth) / (bigImg.offsetWidth - bigPic.clientWidth);
                bigImg.style.left = -parseFloat(mask.style.left) / scale + 'px';
                bigImg.style.top = -parseFloat(mask.style.top) / scale + 'px';
            }
            // 鼠标离开，移除效果
            smallPic.onmouseleave = function (e) {
                smallPic.removeChild(mask);
                leftTop.removeChild(bigPic);
            }
        }
    }
    manGlass();

    // 缩略图动态渲染
    function imagesLoop() {
        let ul = document.querySelector('.picList ul');
        let normalImg = document.querySelector('.smallPic img');
        let imagesSrc = goodData.imagessrc;
        for (let i = 0; i < imagesSrc.length; i++) {
            let liNode = document.createElement('li');
            let imgNode = document.createElement('img');
            imgNode.src = imagesSrc[i].s;
            liNode.appendChild(imgNode);
            ul.appendChild(liNode);
        }
        // 同时改变正常图片和放大显示图片的路径
        // 必须将 lis 放在后面获取，因为是动态生成的，有先后顺序关系
        let lis = document.querySelectorAll('.picList ul li');
        normalImg.src = imagesSrc[0].s;
        for (let i = 0; i < lis.length; i++) {
            lis[i].index = i;  // 可以使用 setAttribute()，自定义属性
            // 事件函数的this 永远执行发生事件的对象
            lis[i].onclick = function () {
                bigImgIndex = this.index;
                normalImg.src = imagesSrc[bigImgIndex].s;
            }
        }
    };
    imagesLoop();

    // 缩略图轮播效果
    function transImgs() {
        // 1. 获取箭头元素和 ul列表
        let lt = document.querySelector('#lt');
        let gt = document.querySelector('#gt');
        let picList = document.querySelector('.picList');
        let ul = document.querySelector('.picList ul');
        let lis = document.querySelectorAll('.picList ul li');
        let start = 0;
        let step = (lis[0].offsetWidth + 20) * 2;
        let end = (lis.length - 5) * (lis[0].offsetWidth + 20);
        lt.onclick = function () {
            start -= step;
            if (start < 0) start = 0;
            ul.style.left = -start + 'px';
        };
        gt.onclick = function () {
            start += step;
            if (start > end) start = end;
            ul.style.left = -start + 'px';
        };
    };
    transImgs();

    // 排他思想应用于选择标签并同时更新选择结果列表
    function clickddBind() {
        let dlNodes = document.querySelectorAll('.choosees dl');
        _dlNodesLength = dlNodes.length;
        let chooseResults = document.querySelector('.chooseResults');
        for (let i = 0; i < dlNodes.length; i++) {
            // 使用闭包
            (function (i) {
                let ddNodes = dlNodes[i].querySelectorAll('dd')
                for (let j = 0; j < ddNodes.length; j++) {
                    ddNodes[j].onclick = function () {
                        chooseResults.innerHTML = '';
                        for (let k = 0; k < ddNodes.length; k++) {
                            ddNodes[k].style.color = "#666";
                        }
                        this.style.color = "red";
                        resArr[i] = this.innerText;
                        resArr.forEach((item, index) => {
                            if (item) {
                                let mask = document.createElement('div');
                                let aNode = document.createElement('a');
                                aNode.href = "javascript:;";
                                aNode.innerText = "X";
                                aNode.setAttribute('index', index);
                                // mask.innerHTML = `${item} <a href="Javascript:;">X</a>`;
                                mask.className = 'mask';
                                mask.innerText = item;
                                mask.appendChild(aNode);
                                chooseResults.appendChild(mask);
                            };
                        });
                    };
                };
                // 选择标签结果列表删除功能
                // 删除功能未实现
            })(i);
        };
    };
    clickddBind();

    // 
    function deleteDd() {

    };
    deleteDd();
}