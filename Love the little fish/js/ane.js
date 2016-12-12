var aneObj = function(){
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.amp=[];
	this.alpha=0;
}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
	for(var i=0; i<this.num; i++){
		this.rootx[i]=i*16+Math.random()*20;//[0,1)
		this.headx[i]=this.rootx[i];
		this.heady[i]=oC2.height-250+Math.random()*50;
		this.amp[i]=Math.random()*50+50;

	}
	
}
aneObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);
	gd2.save();
	gd2.globalAlpha=0.6;
	gd2.lineWidth=20;
	gd2.lineCap='round';
	gd2.strokeStyle='#3b154e';
	for(var i=0; i<this.num; i++){
		//beginPath,moveTo,lineTo,strole,strokeStyle,lineWidth,lineCap
		gd2.beginPath();
		gd2.moveTo(this.rootx[i],oC2.height);
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		gd2.quadraticCurveTo(this.rootx[i],oC2.height-100,this.headx[i],this.heady[i]);
		
		gd2.stroke();
	}
	gd2.restore();
}