function Drag(){
		/*var setting={
			obj:$("<div></div>"),
			parent:$("#container"),
			cssName:"div"
			d:"v"// "h" stands for Horizontal."v" stands for  Vertical
			callBack:function(setting){},
			mouseLeave:function(setting){}
		}*/
		this.init=function(setting){
			this.div=setting.obj;
			this.setting=setting;
			this.setting.parent.append(this.div);
			if(setting.cssName != undefined){
				this.div.addClass(setting.cssName);
			}
			this.maxWidth=this.setting.parent.width()-this.setting.obj.width();
			this.maxHeight=this.setting.parent.height()-this.setting.obj.height();
			if(this.setting.mouseLeave!=undefined){
				this.setting.parent.mouseenter(this.enter);
				
			}else{
				this.div.mousedown(this.down);
			}
		},
		this.down=function(e){
			this.disX = e.pageX-this.div.position().left;
			this.disY=e.pageY-this.div.position().top;
			document.onmousemove=this.move;
			document.onmouseup=this.up;
			return false;
		}.bind(this),
		this.enter=function(e){
			this.disX=this.div.width()/2+this.setting.parent.offset().left;
			this.disY=this.div.height()/2+this.setting.parent.offset().top;
			this.setting.obj.css("display","block");
			document.onmousemove=this.move;//js是等于，jQuery是leave
			this.setting.parent.mouseleave(this.mouseLeave);
		}.bind(this),
		this.v=1,
		this.move=function(e){
			var e=e||event;
			var left=e.pageX-this.disX;
			var top=e.pageY-this.disY;

			var horizontal=true;
			var vertical=true;
			if(this.setting.d == "h"){
				vertical = false;
			}
			else if(this.setting.d == "v"){
				horizontal = false;
			}
			if(horizontal && left<0){
				left=0;
			}
			if(horizontal && left>this.maxWidth){
				left=this.maxWidth;
			}
			if(horizontal){
				this.div.css("left",left);
				if(this.v%5 == 0){
					this.lastLeft=left;
				}
			}
			
			if(vertical && top<0){
				top=0;
			}
			if(vertical && top>this.maxHeight){
				top=this.maxHeight;
				
			}
			if(vertical){
				this.div.css("top",top);
				if(this.v%5 == 0){
					this.lastTop=top;
				}
			}
			this.v++;
			if(this.setting.callBack != undefined){
				this.setting.callBack(this.setting);
			}
		}.bind(this),
		this.up=function(e){
			var e=e||event;
			document.onmousemove="";
			document.onmouseup="";
			var left=e.pageX-this.disX;
			var top=e.pageY-this.disY;
			var dis=Math.sqrt(Math.pow((this.lastLeft-left),2)+Math.pow(this.lastTop-top,2))
			var disx=left-this.lastLeft;
			var disy=top-this.lastTop;
			var finalLeft=left+disx;
			var finalTop=top+disy;
			this.setting.obj.animate({top:""+finalTop,left:""+finalLeft},500)
		}.bind(this),
		this.mouseLeave=function(e){
			document.onmousemove="";
			this.setting.mouseLeave(this.setting);
		}.bind(this)
	}
	