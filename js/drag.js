function Drag(){
		/*var setting={
			obj:$("<div></div>"),
			parent:$("#container"),
			cssName:"div"
			d:"v"// "h" stands for Horizontal."v" stands for  Vertical
			callBack:function(setting){}
		}*/
		this.init=function(setting){
			//console.log(setting+" "+setting.stringify());
			this.div=setting.obj;
			this.setting=setting;
			this.setting.parent.append(this.div);
			if(setting.cssName != undefined){
				this.div.addClass(setting.cssName);
			}
			this.maxWidth=this.setting.parent.width()-this.setting.obj.width();
			this.maxHeight=this.setting.parent.height()-this.setting.obj.height();
			this.div.mousedown(this.down);
			
		},
		this.down=function(e){
			this.disX = e.pageX-this.div.position().left;
			this.disY=e.pageY-this.div.position().top;
			document.onmousemove=this.move;
			document.onmouseup=this.up;
			return false;
		}.bind(this),
		this.v=1;
		this.move=function(e){
			var e=e||event;
			var left=e.pageX-this.disX;
			var top=e.pageY-this.disY;
			console.log(this.v%10);
			
			
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
		}.bind(this)
	}
	