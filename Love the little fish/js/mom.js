var momObj= function(){
	this.x;
	this.y;
	this.angle;
	//this.bigEye=new Image();
	//this.bigBody= new Image();
	//this.bigTail= new Image();
	this.momTailTimer=0;
	this.momTailCount=0;
	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;
	this.momBobyCount=0;
};
momObj.prototype.init=function(){
	this.x=oC2.width/2;
	this.y=oC2.height/2;
	this.angle=0;
	//this.bigEye.src='img/bigEye0.png';
	//this.bigBody.src='img/bigSwim0.png';
	//this.bigTail.src='img/bigTail0.png';
};
momObj.prototype.draw= function(){
	//lerp x,y 让鼠标的值趋向于某一值
	this.x= lerpDistance(mx,this.x,0.98);
	this.y= lerpDistance(my,this.y,0.98);
	var deltaY= my-this.y;
	var deltaX= mx-this.x;
	var beta= Math.atan2(deltaY,deltaX)+Math.PI;//-PI,PI
	//console.log(beta);
	this.angle=lerpAngle(beta,this.angle,0.6);//目标值， 当前值，百分比。
	//console.log(this.angle);
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}
	//eye
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount==0){
			this.momEyeInterval=Math.random()*1500+2000;
		}else{
			this.momEyeInterval=200;
		}
	}
	gd1.save();
	gd1.translate(this.x,this.y);
	gd1.rotate(this.angle);
	var momTailCount=this.momTailCount;
	gd1.drawImage(momTail[momTailCount],-momTail[momTailCount].width/2+30,-momTail[momTailCount].height/2);
	var momBobyCount=this.momBobyCount;
	if(data.double==1){
		gd1.drawImage(momBobyOra[momBobyCount],-momBobyOra[momBobyCount].width/2,-momBobyOra[momBobyCount].height/2);
	}else{
		gd1.drawImage(momBobyBlue[momBobyCount],-momBobyBlue[momBobyCount].width/2,-momBobyBlue[momBobyCount].height/2);
	}
	var momEyeCount= this.momEyeCount;
	gd1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width/2,-momEye[momEyeCount].height/2);	
	gd1.restore();
};