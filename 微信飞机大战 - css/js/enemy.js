//飞机的基类，创建了图片，并定义了move方法
function BasePlain(){
	this.plain=$m("plain").cloneNode(true);
	this.plain.style.display="block";
	this.speed=5;
	this.overImg=[];
	this.bombImg=['images/die1.png','images/die2.png']
	this.bgIndex=0;
	var left=getRand(0,$m("main").offsetWidth-100);
	this.plain.style.left=left+"px";
	this.flag=true;
	this.lifeVal=10;
}
function getUrlStr(obj){
	return "url("+obj+")"
}
BasePlain.prototype.crash=function(bullet){
	this.plain.children[0].style.left=bullet.b.offsetLeft-this.plain.offsetLeft+"px";
	
	if(this.crashTimer==0||this.flag){
		//子弹爆炸效果
		this.flag=false;
		var bombIndex=0;
		this.plain.children[0].style.background="url("+this.bombImg[bombIndex++]+")"
		this.crashTimer=setInterval(function(){
			this.plain.children[0].style.background="url("+this.bombImg[bombIndex++]+")"
			if(bombIndex==2){
				bombIndex=0;
				this.plain.children[0].style.background="";
				clearInterval(this.crashTimer);
				this.crashTimer=0;
			}
		}.bind(this),200);
	}
	//this.plain.style.background="url("+this.overImg[this.bgIndex]+")"
	//this.lifeVal=0
	console.log(this.lifeVal+"*******"+bullet.power);
	this.lifeVal=this.lifeVal-bullet.power;
	console.log(this.lifeVal+"   "+bullet.power);
	if(this.lifeVal<=10){
		this.plain.style.background=getUrlStr(this.overImg[0]);
	}
	if(this.lifeVal<=0){
		this.over();
	}
}
BasePlain.prototype.over=function(){
	clearInterval(this.fly);
	enemyPalinAdapter.remove(this);
	if(this.lifeVal<=0){
		this.bgIndex=0;
		this.crash=setInterval(function(){
		if(this.bgIndex<this.overImg.length){
			this.plain.style.background="url("+this.overImg[this.bgIndex++]+")";
		}else{
			this.plain.remove();
			clearInterval(this.crash);
		}
		}.bind(this),100);
	}else{
		this.plain.remove();
	}
	
}
BasePlain.prototype.move=function(){
	this.fly=setInterval(function(){
		this.plain.style.top=this.plain.offsetTop+this.speed+"px";
		if(this.plain.offsetTop+this.plain.offsetHeight>main.offsetHeight){
			this.over();
		}
	}.bind(this),30);
}
//小战斗机，也拥有敌机的属性
function Plain1(){
	BasePlain.apply(this,arguments);
	this.overImg=['images/plain1_die1.png','images/plain1_die2.png','images/plain1_die3.png']
	this.plain.className="enemy-small";
	this.lifeVal=4;
	main.appendChild(this.plain);
	this.move();
}
Plain1.prototype=new BasePlain();

function Plain2(){
	BasePlain.apply(this,arguments)
	this.overImg=['images/plain2_die1.png','images/plain2_die2.png','images/plain2_die3.png','images/plain2_die4.png']
	this.plain.className="enemy-middle";
	main.appendChild(this.plain);
	this.speed=3;
	this.lifeVal=8;
	this.move();
}
Plain2.prototype=new BasePlain();

function Plain3(){
	BasePlain.apply(this,arguments)
	this.overImg=['images/plain3_die1.png','images/plain3_die2.png','images/plain3_die3.png','images/plain3_die4.png','images/plain3_die4.png'];
	this.plain.className="enemy-large";
	this.speed=2;
	main.appendChild(this.plain);
	this.lifeVal=20;
	this.move();
}
Plain3.prototype=new BasePlain();


