;(function(){
    var DropDown = function(){
        var self = this;
        this.doc = document;
        this.main = document.getElementById("main");
        this.sPos ={};
        this.mPos ={};
        this.doc.addEventListener('touchstart',function(even){
            return self.start(even);
        },false);
        this.doc.addEventListener('touchmove',function(even){
            return self.move(even);
        },false);
        this.doc.addEventListener('touchend',function(even){
            return self.end(even);
        },false);
    };

    DropDown.prototype = {
        // 滑动事件
        start:function(even){
            var point = even.touches ? even.touches[0] : even;
            this.sPos.y = point.screenY;
        },
        move:function(even){
            var point = even.touches ? even.touches[0] : even;
            this.mPos.y = point.screenY;
            this.dropDownNum = this.mPos.y - this.sPos.y;
            // 只有在负数时才可以滑动
            if(this.isNegInt(this.dropDownNum)){
                document.querySelector('.showFont').style.display = "block";
                this.main.getElementsByTagName('ul')[0].setAttribute("style","transform: translate(0px, "+this.dropDownNum+"px);")
            }
        },
        end:function(even){
            document.querySelector('.showFont').style.display = "none";
            this.main.getElementsByTagName('ul')[0].setAttribute("style","transform: translate(0px, 0px);transition-duration:500ms")
            if(this.isNegInt(this.dropDownNum)){
                this.list();
            }
        },
        // 判断是否为负数
        isNegInt:function(num){
            return (typeof num === 'number' && num < 0 && Number.isInteger(num));
        },
        list:function(){
            var numList = ["11111","22222","33333","44444","555555","66666","777777","88888","999999","101010010"],i;
            for(i=0;i<numList.length;i++){
                var node = document.createElement("LI");
                var textnode=document.createTextNode(numList[i]);
                    node.appendChild(textnode);
                this.main.getElementsByTagName('ul')[0].appendChild(node);
            }
        }
    };

    window["DropDown"] = DropDown;
})()