import apiKeys from './apikeys'

window.onload=function(){
    //设置半径为20，并查找所有.neitem子元素的i标签（可以改为.neitem i)
    var r = 20;
    var imgNodes = document.querySelectorAll(".neitem > a > i");

    var contentLiNodes = document.querySelectorAll(".procontent li");
	var circleLiNodes = document.querySelectorAll(".circle li");
	var procontent = document.querySelector(".procontent");
    var leftarrow = document.querySelector(".project .la");
    var rightarrow = document.querySelector(".project .ra");
			
			//第一屏3D效果
	var oldIndex = 0;
	var timer3D = "11";
	var autoIndex = 0;
    
    document.onmousemove=function(event){
        event =  event||window.event;
        for(var i=0;i<imgNodes.length;i++){
            var a = imgNodes[i].getBoundingClientRect().left + imgNodes[i].offsetWidth/2 - event.clientX;
            var b = imgNodes[i].getBoundingClientRect().top + imgNodes[i].offsetHeight/2 - event.clientY;
            var c = Math.sqrt(a*a+b*b);
            
            
            if(c>=r){
                c=r;
            }
            imgNodes[i].style.fontSize = 2 - c*0.04 +"em";
            imgNodes[i].style.fontWeight = 900 - c*15;
        }
    }

    home3D()
    function home3D(){
        for(var i=0;i<circleLiNodes.length;i++){
                circleLiNodes[i].index = i;
                //注册回调函数(同步)   执行回调函数(异步)
            circleLiNodes[i].onclick=function(){
                clearInterval(timer3D);
                for(var i=0;i<circleLiNodes.length;i++){
                    circleLiNodes[i].classList.remove("active");
                }
                this.classList.add("active");
                    
                    
                    //从左往右  当前索引大于上一次索引  rightShow
                if(this.index>oldIndex){
                    contentLiNodes[this.index].classList.remove("leftShow");
                    contentLiNodes[this.index].classList.remove("leftHide");
                    contentLiNodes[this.index].classList.remove("rightHide");
                    contentLiNodes[this.index].classList.add("rightShow");
                        
                        
                    contentLiNodes[oldIndex].classList.remove("leftShow");
                    contentLiNodes[oldIndex].classList.remove("rightShow");
                    contentLiNodes[oldIndex].classList.remove("rightHide");
                    contentLiNodes[oldIndex].classList.add("leftHide");
                }
                    
                    //从右往左  当前索引小于上一次索引 leftShow
                if(this.index<oldIndex){
                    contentLiNodes[this.index].classList.remove("rightShow");
                    contentLiNodes[this.index].classList.remove("leftHide");
                    contentLiNodes[this.index].classList.remove("rightHide");
                    contentLiNodes[this.index].classList.add("leftShow");
                        
                        
                    contentLiNodes[oldIndex].classList.remove("leftShow");
                    contentLiNodes[oldIndex].classList.remove("rightShow");
                    contentLiNodes[oldIndex].classList.remove("leftHide");
                    contentLiNodes[oldIndex].classList.add("rightHide");
                }
                    
                oldIndex = this.index;
                    
                    //手动轮播  ---> 自动轮播的同步问题！！
                    //手动点完是需要自动轮播的，自动轮播从哪个面开始播？--->手动点的这个面开始自动轮播
                    //手动轮播的逻辑必须药告诉自动轮播 我刚刚点了哪一个面
                autoIndex = this.index;
                    
                    //重新开启自动轮播
                    //move();
            }
        }
    }

    
    move();
    function move(){
        
        clearInterval(timer3D);         //定时器的调用(同步)  定时器回调函数的执行(异步)
        timer3D = setInterval(function(){
            autoIndex ++;
                     
                         //无缝
            if(autoIndex == contentLiNodes.length ){
                autoIndex =0;
            }
                     
                     
            for(var i=0;i<circleLiNodes.length;i++){
                circleLiNodes[i].classList.remove("active");
            }
            circleLiNodes[autoIndex].classList.add("active");
                     
            contentLiNodes[autoIndex].classList.remove("leftShow");
            contentLiNodes[autoIndex].classList.remove("leftHide");
            contentLiNodes[autoIndex].classList.remove("rightHide");
            contentLiNodes[autoIndex].classList.add("rightShow");
                        
                        
            contentLiNodes[oldIndex].classList.remove("leftShow");
            contentLiNodes[oldIndex].classList.remove("rightShow");
            contentLiNodes[oldIndex].classList.remove("rightHide");
            contentLiNodes[oldIndex].classList.add("leftHide");
                     
                         //自动轮播 --> 手动轮播的同步问题！！
                         //自动轮播一直运行...autoIndex一直在加加,自动轮播到一半时有可能触发手动轮播
                         //这个时候自动轮播的逻辑必须要告诉手动轮播  我播到哪一个面上了
            oldIndex = autoIndex;
                         
        },10000);
        
    }
    
    // arrowclick();
    // function arrowclick(){
    //     la.onclick=function(){
    //         clearInterval(timer3D);
    //             for(var i=0;i<circleLiNodes.length;i++){
    //                 circleLiNodes[i].classList.remove("active");
    //             }
    //             circleLiNodes[autoIndex-1].classList.add("active");

    //                 contentLiNodes[autoIndex-1].classList.remove("rightShow");
    //                 contentLiNodes[autoIndex-1].classList.remove("leftHide");
    //                 contentLiNodes[autoIndex-1].classList.remove("rightHide");
    //                 contentLiNodes[autoIndex-1].classList.add("leftShow");
                        
                        
    //                 contentLiNodes[oldIndex-1].classList.remove("leftShow");
    //                 contentLiNodes[oldIndex-1].classList.remove("rightShow");
    //                 contentLiNodes[oldIndex-1].classList.remove("leftHide");
    //                 contentLiNodes[oldIndex-1].classList.add("rightHide");

                    
    //             oldIndex = oldIndex -1;
    //             autoIndex = autoIndex-1;
    //     }
        
    // }


            
    procontent.onmouseenter=function(){
        clearInterval(timer3D);
    }
            
    procontent.onmouseleave=function(){
        move();
    }


    emailjs.init(apiKeys.PUBLIC_KEY);
    document.getElementById('contact_form').addEventListener('submit', function(event) {
        event.preventDefault();
        // generate a five digit number for the contact_number variable
        // this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm(apiKeys.Service_ID, apiKeys.TEMPLATE_KEY, this)
            .then(function() {
                console.log('SUCCESS!');
                alert("SUCCESS!");
            }, function(error) {
                console.log('FAILED...', error);
                alert("FAILED...");
            });
    });
}