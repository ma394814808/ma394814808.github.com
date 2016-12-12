//判断大鱼和果实的距离
function momFruitCollision(){
	if(!data.gameOver){
		for(var i=0; i<fruit.num; i++){
		if(fruit.alive[i]){
			var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			if(l<900){
				fruit.dead(i);
				data.fruitNum++;
				mom.momBobyCount++;
				if(mom.momBobyCount>7){
					mom.momBobyCount=7;
				}
				if(fruit.fruitType[i]=='blue'){
					data.double=2;
				}
				wave.born(fruit.x[i],fruit.y[i]);//白色的圈产生；
			}
		}
	}
	}
	
}
function momBabyCollision(){
	if(data.fruitNum>0&&!data.gameOver){
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	 if(l<900){
	 	baby.babyBobyTimer=0;
		baby.babyBobyCount=0;
		//data.reset();
		
		mom.momBobyCount=0;
		data.addScore();
		halo.born(baby.x,baby.y);
	}
	
	}
}