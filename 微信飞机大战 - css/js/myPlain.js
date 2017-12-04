//我所操作的飞机
function MyPlain(){
	if(MyPlain.instance==null){
		MyPlain.instance={
			me:document.createElement("img"),
			start:function(){
//				var myPl=document.getElementById("myPlain");
//				if(myPl==null){
					this.me.className="my-warplain";
					this.me.style.top=(main.offsetHeight-100)+"px";
					this.me.style.left=main.offsetWidth/2+"px";
					this.me.setAttribute("id","myPlain");
					main.appendChild(this.me);
					//myPl=document.getElementById("myPlain");
				//}	
				var setting={
					obj:$("#myPlain"),
					parent:$("#main"),
					nodown:true
				}
				new Drag().init(setting);
				setInterval(function(){
					this.fire(this.me,(this.me.offsetLeft+(this.me.offsetWidth/2)-2),1);
				}.bind(this),200);
				document.onkeydown=function(e){
					 if(e.keyCode==37){
					 	this.me.style.left=this.me.offsetLeft-10+"px";
					 }else if(e.keyCode==38){
					 	this.me.style.top=this.me.offsetTop-10+"px";
					 }else if(e.keyCode==40){
					 	this.me.style.top=this.me.offsetTop+10+"px";
					 }else if(e.keyCode==39){
					 	this.me.style.left=this.me.offsetLeft+10+"px";
					 }else if(e.keyCode==32){
					 	this.fire(this.me,(this.me.offsetLeft+(this.me.offsetWidth/2)-2),1);
					 }else if(e.keyCode==96){
					 	//alert(e.keyCode);
					 	var l=this.me.offsetWidth/2
					 	for(var v=0;v<parseInt(main.offsetWidth/(this.me.offsetWidth/2));v++){
					 		
					 		this.fire(this.me,l*(v+1),2);
					 	}
					 }else if(e.keyCode==97){
					 	this.fire(this.me,this.me.offsetLeft,3);
					 }
					 //alert(e.keyCode);
				}.bind(this);
			},
			fire:function(obj,left,level){
				if(level==1){
					new CommonBullet().fire(obj,left);
				}else if(level==2){
					new SuperBullet().fire(obj,left);
				}else if(level==3){
					new plainBullet().fire(obj,left);
				}
				
			}
		}
	}
	return MyPlain.instance;
}
