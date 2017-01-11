var x = 20;
var y = 250;
var vida = 0;
var tiempo=0;
var duracion = 0;
var rotacion = 0;
var msg = 0;
var punto=0;
var hum= [[aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)],
		   [aleatorio(700),aleatorio(500)]];

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.fillStyle = "#610B0B"; 
	contextoBuffer.clearRect(0,0,700,500);
	contextoBuffer.font = "bold 50px sans-serif";
	contextoBuffer.fillText("WELCOME TO", 170, 200);
	contextoBuffer.fillStyle = "#FBEFEF"; 
	contextoBuffer.font = "bold 30px sans-serif";
	contextoBuffer.fillText("Zombie VS Humans", 210, 270);
	contexto.clearRect(0,0,700,500);
	contexto.drawImage(buffer, 0, 0);
	$('#brisa')[0].play();
	$("button").click(function(){	
		x = 50;
		y = 350;	
		punto = 0;
		tiempo = 0;
		run();		
	});
}

function aleatorio(tope){
	return Math.floor((Math.random() * tope) + 1);
} 

function capturaTeclado(event){
	if(event.keyCode=='39'){//si la tecla presionada es direccional derecho
		if (x<300){
			x+=10;//mueve la nave 5 pixeles a la derecha
		}		
	}
	if(event.keyCode=='37'){//si la tecla presionada es direccional izquierdo
		if (x>50){
			x-=10;//mueve la nave 5 pixeles a la izquierda
		}
	}
	if(event.keyCode=='38'){//si la tecla presionada es direccional arriba
		if (y>10){
			y-=10;//sube la nave
		}
	}
	if(event.keyCode=='40'){// si la tecla presionada es direccional abajo
		if (y<355){
			y+=10;//baja la nave
		}
	}
}

function Zombies(){
	this.img = [$("#zombie")[0],$("#sangre")[0]];
	
	this.dibujar = function(ctx,i){
		var img = this.img[i];
		ctx.drawImage(img, x, y);
		ctx.save();
		ctx.restore();
	}
	
	this.colision = function(xx,yy){
		var distancia=0;
		distancia=Math.sqrt( Math.pow( (xx-x), 2)+Math.pow( (yy-y),2));
		if(distancia>80)
		   return false;
		else
		   return true;	
	}
}

function Humans(){
	this.img = $("#human")[0];			
	this.dibujar = function(ctx, x1, y1){
		var img = this.img;
		ctx.save();
		ctx.translate(x1,y1);
		ctx.drawImage(img,img.width,img.height);
		ctx.restore();
	} 
}

function run(){ 
	var lienzo = $("#lienzo")[0];
	var contexto = lienzo.getContext("2d");
	var buffer = document.createElement("canvas");
	buffer.width = lienzo.width;
	buffer.height = lienzo.height;
	contextoBuffer = buffer.getContext("2d");
	contextoBuffer.fillStyle = "#ffffff"; 
	if(tiempo <= 60){ 
		tiempo+=0.05; 		
		duracion++;	
		if(tiempo % 50 == 0)
			msg = aleatorio(7);
		var objzombies = new Zombies();
		var objhumans = [new Humans(),new Humans(),new Humans(),
						   new Humans(),new Humans(),new Humans(),
						   new Humans(),new Humans(),new Humans(),
						   new Humans()]; 
		contextoBuffer.clearRect(0,0,700,500);

		contextoBuffer.font = "bold 25px sans-serif";
		contextoBuffer.fillText("Tiempo = "+tiempo, 50, 25);
		contextoBuffer.fillText("Puntos = "+parseInt(punto), 50, 50);
		objzombies.dibujar(contextoBuffer,0);
		//rotacion -= 5;
		for(i=0;i<10;i++){			
			objhumans[i].dibujar(contextoBuffer,hum[i][0],hum[i][1]);
			if(objzombies.colision(hum[i][0],hum[i][1])){
				punto +=1;
				objzombies.dibujar(contextoBuffer,1);
				$('#explode')[0].play();
                                
                                hum[i][0] =- 5 ;
			        hum[i][1] = aleatorio(500);
                                //x1=- 500;
                                //y1=- 700;
			}
			hum[i][0]-=5;
			//hum[i][1]+=3;
			hum[i][0] = (700 + hum[i][0])%700;
			hum[i][1] = (500 + hum[i][1])%500;
		}
		contexto.clearRect(0,0,700,500);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		$("button").css("display","none");
	}else{
		$('#brisa')[0].pause();
		
		contextoBuffer.clearRect(0,0,700,500);

		contextoBuffer.font = "bold 50px sans-serif";
		contextoBuffer.fillText("MATASTE", 240, 200);
		contextoBuffer.fillText(parseInt(punto), 310, 260);
		contextoBuffer.font = "30px sans-serif";
		contextoBuffer.fillText(" mujeres difrazadas de ancianos :D", 110, 310);
		contexto.clearRect(0,0,700,500);
		contexto.drawImage(buffer, 0, 0);
		$("button").css("display","inline");
		
	}
}

