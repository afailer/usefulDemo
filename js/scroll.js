var that=null;
function Scroll(){
//	this.setting={
//		objList : [
//			{
//				obj:$(".div").eq(0),
//				dis:600
//			}
//		]
//		
//	}
	this.init=function(setting){
		this.setting=setting;
		that=this;
		this.setOnscroll();
		for(var v=0;v<that.setting.objList.length;v++){
			var obj = that.setting.objList[v].obj;
			var con=$("<div class='con'></div>");
			con.attr("cleft",obj.offset().left);
			con.attr("ctop",obj.offset().top);
			con.attr("dis",that.setting.objList[v].dis);
			this.setting.objList[v].obj.after(con);
			con.append(obj);
			con.css({"width":obj.width(),"height":obj.height()})
		}
		this.conList=$(".con");
		for(var v=0;v<this.conList.length;v++){
				var obj=this.conList.eq(v);
				console.log(obj.attr("ctop"));
				
			}
		//this.setting.obj.after(s);
	}
	this.setOnscroll=function(){
		window.onscroll=function(){
		
			
			for(var v=0;v<that.conList.length;v++){
				var obj=that.conList.eq(v);
				var t=parseInt(obj.attr("ctop"))+parseInt(obj.attr("dis"));
				if($(document).scrollTop()>obj.attr("ctop") && $(document).scrollTop()<t){
					obj.children().eq(0).css({"top":0,"position":"fixed","left":obj.attr("cleft")})				
				}else{
					obj.children().eq(0).css({"position":""})
				}
			}
		}
	}
}
