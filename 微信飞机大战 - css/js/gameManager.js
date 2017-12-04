var options=null;
var dataManager=null;
var main=null;
var enemyPalinAdapter=null;
$m("plain").style.display="none";
window.onload=function(){
	options=$m("options").children;
	main=$m("main");
	enemyPalinAdapter=new EnemyPalinAdapter();
	dataManager=new DataManager();
	dataManager.init();
}
function DataManager(){
	if(DataManager.instance==null){
		DataManager.instance={
			dialog:$m("options"),
			level:1,/*当前难度*/
			currentStep:1,/*当前关卡*/
			currentLifeVal:100,
			score:0,
			currentTime:0,
			die:function(){},
			stucked:function(){},
			addLife:function(){//吃血增加生命
				
			},
			init:function(){
				
				function fn(k){
					return function(){//闭包
						$m("options").style.display="none";
						this.level=k;
						new MeManager().init();
						new EnemyManager().createEnemy();
					}
				}
				for(var v=0;v<options.length;v++){
					options[v].onclick=fn(v);
				}
				
			}
		}
	}
	return DataManager.instance;
}
function MeManager(){
	if(MeManager.instance==null){
		MeManager.instance={
			init:function(){
				new MyPlain().start();
			}
		}
	}
	return MeManager.instance;
}
function EnemyManager(){
	if(EnemyManager.instance==null){
		EnemyManager.instance={
			createTime:1000,
			data:{
					p1:dataManager.level*3+dataManager.currentStep*6,
					p2:dataManager.level*2+dataManager.currentStep*3,
					p3:dataManager.level*3
			},
			getType:function(){
				if(dataManager.level==1){
					var t=getRand(1,10);
					if(t>=1&&t<=6){
						return "p1";
					}else if(t>6&&t<=9){
						return "p2";
					}else{
						return "p3";
					}
				}else if(dataManager.level==2){
					var t=getRand(1,10);
					if(t>=1&&t<=3){
						return "p1";
					}else if(t>3&&t<7){
						return "p2";
					}else{
						return "p3";
					}
				}else if(dataManager.level==3){
					var t=getRand(1,10);
					if(t>=1&&t<=2){
						return "p1";
					}else if(t>2&&t<=3){
						return "p2";
					}else{
						return "p3";
					}
				}
				
			},
			createEnemy:function(){
		
				EnemyManager.timer=setInterval(function(){
					var t=this.getType();
					//var t=gett();
					new EnemyPalinAdapter().create(t);
				}.bind(this),this.createTime);
			}
		}
	}
	return EnemyManager.instance;
}
function EnemyPalinAdapter(){
	if(EnemyPalinAdapter.instance==null){
		EnemyPalinAdapter.instance={
			livingEnemies:[],
		
			isHit:function(bullet){
				for(var i=0;i<this.livingEnemies.length;i++){
					
					if(pz(this.livingEnemies[i].plain,bullet.b)){
						this.livingEnemies[i].crash(bullet);//打中飞机，生命力减少
						return true;
					}
				}
				return false;
			},
			remove:function(obj){

				var num=this.livingEnemies.indexOf(obj);
				if(num!=-1){
					this.livingEnemies.splice(num,1);
				}
			},
	
			create:function(type){
				
				var p;
				if(type=="p1"){
					p=new Plain1();
				}else if(type=="p2"){
					p=new Plain2();
				}else if(type=="p3"){
					p=new Plain3();
				}
				this.livingEnemies.push(p);
			}
		}
	}
	return EnemyPalinAdapter.instance;
}
