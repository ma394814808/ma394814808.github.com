var waveObj=function(){
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];

};
waveObj.prototype.num=10;
waveObj.prototype.init=function(){
	for(var i=0; i<this.num; i++){
		this.alive[i]=false;
		this.r[i]=0;
	}
};
waveObj.prototype.draw=function(){
	gd1.save();
	gd1.lineWidth=2;
	gd1.shadowBlur=10;
	gd1.shadowColor='#fff';
	for(var i=0; i<this.num; i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.04;
			if(this.r[i]>50){
				this.alive[i]=false;
				break;//
			}			
			var alpha=1-this.r[i]/50;
			gd1.beginPath();
			gd1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			gd1.closePath();
			gd1.strokeStyle='rgba(255,255,255,'+alpha+')';
			gd1.stroke();
		}
	}
	gd1.restore();
};
waveObj.prototype.born=function(x,y){
	for(var i=0; i<this.num; i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
};