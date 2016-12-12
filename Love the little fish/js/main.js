var lastTime=Date.now();
var deltaTime=0;
var oC1= document.getElementById('c1');
var oC2=document.getElementById('c2');
var gd1=oC1.getContext('2d');
var gd2=oC2.getContext('2d');
var bgPic=new Image(); 
var ane=null;
var fruit=null;
var mom=null;
var mx=null;
var my=null;
var baby=null;
var babyTail=[];
var babyEye=[];
var babyBoby=[];
var momTail=[];
var momEye=[];
var momBobyOra=[];
var momBobyBlue=[];
var data=null;
var wave=null;
var halo=null;
var dust=null;
var dustPic=[];
oC1.addEventListener('mousemove',onMouseMove,false);
bgPic.src='img/background.jpg';
document.body.onload=game;
 function game(){

	    ane = new aneObj();
		ane.init();
		fruit= new fruitObj();
		fruit.init();
		mom= new momObj();
		mom.init();
		baby= new babyObj();
		baby.init();
		mx= oC1.width/2;
		my= oC1.height/2;
		for(var i=0; i<8; i++){
			babyTail[i]=new Image();
			babyTail[i].src='img/babyTail'+i+'.png';
		}
		for(var i=0; i<2; i++){
			babyEye[i]=new Image();
			babyEye[i].src='img/babyEye'+i+'.png';
		}
		for(var i=0; i<20; i++){
			babyBoby[i]=new Image();
			babyBoby[i].src='img/babyFade'+i+'.png';
		}
		for(var i=0; i<8; i++){
			momTail[i]=new Image();
			momTail[i].src='img/bigTail'+i+'.png';
		}
		for(var i=0; i<2; i++){
			momEye[i]=new Image();
			momEye[i].src='img/bigEye'+i+'.png';
		}
		data= new dataObj();
		for(var i=0; i<8; i++){
			momBobyOra[i]=new Image();
			momBobyBlue[i]=new Image();
			momBobyOra[i].src='img/bigSwim'+i+'.png';
			momBobyBlue[i].src='img/bigSwimBlue'+i+'.png';
		}
		gd1.font='30px Verdana';
	    gd1.textAlign='center';
	    wave= new waveObj();
	    wave.init();
	     halo= new haloObj();
	    halo.init();
	    for(var i=0; i<7; i++){
	    	dustPic[i]=new Image();
	    	dustPic[i].src='img/dust'+i+'.png';
	    }
	    dust=new dustObj();
	    dust.init();
 	gameloop();
 }
	function gameloop(){
		window.requestAnimFrame(gameloop);
		var now=Date.now();
		deltaTime=now-lastTime;
		lastTime=now;
		if(deltaTime>40){
			deltaTime=40;
		}
	    drawBackground();
	   	ane.draw(); 
	   	fruitMonitor();
	   	fruit.draw();
	   	gd1.clearRect(0,0,oC1.width,oC1.width);
	   	mom.draw();
	   	momFruitCollision();
	   	baby.draw();
	   	momBabyCollision();
	   	data.draw();
	   	wave.draw();
	   	halo.draw();
	   	dust.draw();
	}
	//跟随鼠标移动
	function onMouseMove(ev){
		if(!data.gameOver){
			if(ev.offSetX||ev.layerX){
			mx=ev.offSetX== undefined?ev.layerX:ev.offSetX;//获取鼠标位置
			my= ev.offSetY== undefined?ev.layerY:ev.offSetY;
		}
		}
		
	}
