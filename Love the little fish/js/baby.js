var babyObj = function(){
	this.x=0;
	this.y=0;
	this.angle=0;
	//this.babyEye= new Image();
	//this.babyBody=new Image();
	this.babyTailTimer=0;
	this.babyTailCount=0;
	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;//图片持续多长时间；
	this.babyBobyTimer=0;
	this.babyBobyCount=0;
	

}
babyObj.prototype.init= function(){
	this.x=oC1.width/2-50;
	this.y=oC1.height/2+50;
	//this.babyEye.src='img/babyEye0.png';
	//this.babyBoby.src='img/babyFade0.png';
	
};
babyObj.prototype.draw=function(){
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);
	var deltaY= mom.y-this.y;
	var deltaX= mom.x-this.x;
	var beta= Math.atan2(deltaY,deltaX)+Math.PI;//-PI,PI
	//console.log(beta);
	this.angle=lerpAngle(beta,this.angle,0.6);
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;
	}
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeInterval;
	
	if(this.babyEyeCount==0){
		this.babyEyeInterval=Math.random()*1500+2000;
	}else{
		this.babyEyeInterval=200;
	}
}
	this.babyBobyTimer+=deltaTime;
	if(this.babyBobyTimer>3000){
	
			this.babyBobyCount=this.babyBobyCount+1;
			
		}
		
		
		if(this.babyBobyCount>19){
			this.babyBobyCount=19;//game over
			
			data.gameOver=true;
		}
	
	gd1.save();
	gd1.translate(this.x,this.y);
	gd1.rotate(this.angle);
	var babyTailCount=this.babyTailCount;
	gd1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width/2+23,-babyTail[babyTailCount].height/2);
	var babyBobyCount=this.babyBobyCount;
	gd1.drawImage(babyBoby[babyBobyCount],-babyBoby[babyBobyCount].width/2,-babyBoby[babyBobyCount].height/2);
	var babyEyeCount=this.babyEyeCount;
	//console.log(babyBoby[babyBobyCount])
	gd1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width/2,-babyEye[babyEyeCount].height/2);
	gd1.restore();
};