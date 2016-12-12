var dustObj= function(){
	this.x=[];
	this.y=[];
	this.amp=[];
	this.No=[];
	this.alpha=0;
};
dustObj.prototype.num=30;
dustObj.prototype.init= function(){
	for(var i=0; i<this.num; i++){
		this.x[i]=Math.random()*oC1.width;
		this.y[i]=Math.random()*oC1.height;
		this.amp[i]=20+Math.random()*15;
		this.No[i]=Math.floor(Math.random()*7);
	}
	this.alpha=0;
};
dustObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);
	for(var i=0; i<this.num; i++){
		var no=this.No[i];
		gd1.drawImage(dustPic[no],this.x[i]+this.amp[i]*l,this.y[i]);
	}
};