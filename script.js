window.onload = function(){

	var canvas = document.getElementById("pix");
	var ctx = canvas.getContext("2d");
	
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	
	var wid = 140,
		wid2 = wid/2;
		
	var hig = wid/2,
		hig2 = hig/2;
	
	function rando(min,max){
		return Math.floor(Math.random()*max)+min;	
	}
	
	function randomColor() {
		var rm = 255,
			gm = 255,
			bm = 255;
		var r = Math.round(Math.random()*rm);
		var g = Math.round(Math.random()*gm);
		var b = Math.round(Math.random()*bm);
		var a = (Math.random()*.3)+.4;
		var rgba = "rgba("+r+", "+g+", "+b+", "+a+")";
		return rgba;
	}

	var pixels = [];
	function setup(){
		var yGap = hig,
			xGap = wid + wid2; //50 gap
		var x = 0, y = hig*4;
		var i = 0;
		while(y<=10*H/11){//3*H/4){
			if(rando(0,8)>0)
				var cy = y+rando(-wid,wid);
				pixels.push(new drawPixel(x+rando(wid/10,wid/2),H,randomColor(),cy));
			x+=xGap;
			if(x>W+xGap){
				y+=yGap;
				if(i%2==0) x = wid2 + 25; //50/2
				else x = 0;
				i++;
			}
		}
	}
	
	function drawPixel(x,y,c,init){
		this.y = y;
		this.x = x;
		this.initY = init;
		this.c = c; //color
		this.d = rando(2,4);//rando((wid/10)/8,(wid/10)/6);//rate of change
		this.dir = (rando(1,2)==1) ? -1 : 1;
		this.goToY = y + this.dir*rando(wid2,wid);
		if(this.goToY < hig*3 || this.goToY > H){
			this.dir*=-1;
			this.goToY = y + this.dir*rando(wid2,wid);
		}
		
		//Top Diamond
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x+wid2 , y+hig2);
		ctx.lineTo(x , y+hig);
		ctx.lineTo(x-wid2, y+hig2);
		ctx.fillStyle = "#555555";
		ctx.fill();
		ctx.closePath();
		
		//Left Side
		ctx.beginPath();
    	ctx.moveTo(x-wid2 , y+hig2);
		ctx.lineTo(x , y+hig);
		ctx.lineTo(x , y+hig+H);
		ctx.lineTo(x-wid2, y+H+hig2);
		ctx.lineTo(x-wid2, y+hig);
		ctx.fillStyle = "#444444";
		ctx.fill();
		ctx.closePath();
		
		//Right Side
		ctx.beginPath();
    	ctx.moveTo(x+wid2 , y+hig2);
		ctx.lineTo(x , y+hig);
		ctx.lineTo(x , y+hig+H);
		ctx.lineTo(x+wid2, y+H+hig2);
		ctx.lineTo(x+wid2, y+hig);
		ctx.fillStyle = "#222222";
		ctx.fill();
		ctx.closePath();
		
		//Color;
		ctx.beginPath();
		ctx.moveTo(x,y);
		ctx.lineTo(x+wid2 , y+hig2);
		//ctx.lineTo(x , y+hig);
		//ctx.lineTo(x-wid2, y+hig2);
		ctx.lineTo(x+wid2, y+hig2+H);
		ctx.lineTo(x, y+hig+H);
		ctx.lineTo(x-wid2, y+hig2+H);
		ctx.lineTo(x-wid2, y+hig2);
		ctx.lineTo(x,y);
		ctx.fillStyle = c;
		ctx.fill();
		ctx.closePath();
		return false;
	}
	
	//return { x: px, y: py };
	
	function drawBackground(){
		ctx.rect(0,0,W,H);
		ctx.fillStyle = "#1c1c1c";
		ctx.fill();
	}
	
	function animate(){
		drawBackground();
		//drawGround();
		var re = (rando(1,2)>1) ? false : true;
		for(var i = 0; i<pixels.length;i++){
			p = pixels[i];
			if(p.y>=p.goToY-10 && p.y<p.goToY+10){
				p.dir*=-1;
				//in not reset goToY, change to random
				if(!re) {
					p.goToY = p.y + p.dir*rando(wid2,wid);
				}
				//if reset and direction is correct, go to default
				
				else if((p.dir==-1 && p.initY < p.y) || (p.dir==1 && p.initY > p.y)){
					p.goToY = p.initY;
				}
				//if resent and direction is worng, go to default after direction change
				else {
					p.dir*= -1;
					p.goToY = p.initY;
				}
				
				//make sure goToY is in range
				if(p.goToY < hig*3 || p.goToY > H){
					p.dir=1;
					p.goToY = y + p.dir*rando(wid2,wid);
				}
				else if(p.goToY < 0 || p.y < hig*3){
					p.dir=1;
					p.goToY = H/4;
				}
			}
			p.y += p.d*p.dir;
			drawPixel(p.x , p.y , p.c, p.initY);
			//drawPixel(p.x,p.y,rainbowColor(p.y-hig*4,H),p.init);
		}
	}
	//MAIN
	setup();

	setInterval(animate,32);
		
}