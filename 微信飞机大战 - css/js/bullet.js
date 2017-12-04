//子弹基类
function BaseBullet(){
	this.b=document.createElement("img");
	this.speed=15;
	this.power=1;
}
//子弹的发射功能
BaseBullet.prototype.fire=function(obj,left){
	this.b.style.top=obj.offsetTop-5+"px";
	this.b.style.left=left+"px";
	main.appendChild(this.b);
	this.fly=setInterval(function(){
		this.b.style.top=this.b.offsetTop - this.speed+"px";
		if(this.b.offsetTop<0){
			clearInterval(this.fly);
			this.b.remove();
			return;
		}
		if(enemyPalinAdapter.isHit(this)){
			if(this.power==1){
				clearInterval(this.fly);
				this.b.remove();
			}
		}
	}.bind(this),30);
}
//普通子弹
function CommonBullet(){
	BaseBullet.apply(this,arguments);
	this.b.className="bullet";
	this.power=1;
}
CommonBullet.prototype=new BaseBullet();
//超级子弹
function SuperBullet(){
	BaseBullet.apply(this,arguments);
	this.b.className="supperBullet";
	this.power=1000;
}
SuperBullet.prototype=new BaseBullet();

function plainBullet(){
	BaseBullet.apply(this,arguments);
	this.b.className="planeBullet";
	this.power=10;
}
plainBullet.prototype=new BaseBullet();
