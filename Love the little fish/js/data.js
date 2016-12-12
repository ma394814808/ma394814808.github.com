var dataObj= function(){
	this.fruitNum=0;
	this.double=1;
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
};

dataObj.prototype.draw=function(){
	var w=oC1.width;
	var h=oC1.height;
	gd1.save();
	gd1.shadowBlur=10;
	gd1.shadowColor='#fff';
	gd1.fillStyle='#fff';
	
	/*gd1.fillText('num '+this.fruitNum,w/2,h-50);
	gd1.fillText('double '+this.double,w/2,h-80);*/
	gd1.fillText('SCORE: '+this.score,w/2,h-20);
	if(this.gameOver){
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1){
			this.alpha=1;
		}
		gd1.fillStyle='rgba(255,255,255,'+this.alpha+')';
		gd1.fillText('GAMEOVER',w/2,h/2);
	}
	gd1.restore();
};
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this.double;
	this.fruitNum=0;
	this.double=1;
};