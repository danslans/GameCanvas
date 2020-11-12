window.addEventListener("load",init,false);
var ctx={};
var data=[];
var temData={
};
var listCircles= [];
var circlesSelects=[];
var diametro = 4;
var countSelectCircle = 0;
var linesBetweenCircles = [];
function init(event){
	var body = document.body;
	body.style.margin=0;
	body.style.padding=0;
	var canvas = document.createElement("canvas");
	//canvas.style.height="100%";
	//canvas.style.width="100%";
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth;
	canvas.addEventListener("touchstart",drawStart,false);
	canvas.addEventListener("touchend",drawEnd,false);
	canvas.addEventListener("touchmove",drawMove,false);
	body.appendChild(canvas);
	canvas.style.backgroundColor="white";
	ctx = canvas.getContext("2d");
	var positionCircleY=20;
	var positionCircleX=20;
	var nivel=50;
	var distance =20;
	
	for(var f=1;f<=nivel;f++){
		var y = (positionCircleY);
		for(var c=1;c<=nivel;c++){
			ctx.beginPath();
			var x = (positionCircleX);
			ctx.arc(x,y,diametro, 0, 2 * Math.PI);
			listCircles.push({x:x,y:y});
			x=positionCircleX+=distance;
			ctx.fill();
		}
		y=(positionCircleY+=distance);
		positionCircleX=20;
	}
	//for(var circleL of listCircles){
		//alert(JSON.stringify(listCircles));
	//}
		/*ctx.beginPath();
		ctx.arc(20,20, 10, 0, 2 * Math.PI);
		ctx.fill();
		ctx.beginPath();
		ctx.arc(60,20, 10, 0, 2 * Math.PI);
			ctx.fill();
		ctx.beginPath();
			ctx.arc(100,20, 10, 0, 2 * Math.PI);
			ctx.fill();
		ctx.beginPath();
			ctx.arc(140,20, 10, 0, 2 * Math.PI);
			ctx.fill();*/
		
}

function drawStart(event){
	//alert(JSON.stringify(event.touches));
	//var msn = document.getElementById("start");
	for(var touch of event.touches){
		temData.start=touch;
		//msn.innerHTML= touch.pageX + " "+ touch.pageY;
	}
}

function drawMove(event){
	//var msn = document.getElementById("move");
	for(var touch of event.touches){
		//msn.innerHTML= touch.pageX + " "+ touch.pageY;
	}
}

function drawEnd(event){
	//alert(JSON.stringify(event.touches));
	//var msn = document.getElementById("endTouch");
	var touches = event.changedTouches;
	for(var touch of touches){
		temData.end=touch;
		//msn.innerHTML= touch.pageX + " "+ touch.pageY;
	}
	countSelectCircle++;
	
	for(var circle of listCircles){
		var radioXRi = circle.x + diametro;
		var radioXLe = circle.x - diametro;
		var radioYRi = circle.y + diametro;
		var radioYLe = circle.y - diametro;
		if(
			validarEventStart(circle,radioXRi,radioXLe,radioYRi,radioYLe)
			&&
			validarEventEnd(circle,radioXRi,radioXLe,radioYRi,radioYLe)
		){
			circle.isSelect=true;
			countSelectCircle==2? circle.isFirst=false:circle.isFirst=true;
			circlesSelects.push(circle);	
			//alert("end touch"+JSON.stringify(circle));
		}
	}
	
	if(countSelectCircle==2){
		//alert("to draw");
		countSelectCircle=0;
		drawLine();
	}
}

function validarEventStart(circle,radioXRi,radioXLe,radioYRi,radioYLe){
	if(
		(temData.start.pageX >= radioXLe && temData.start.pageX <= radioXRi) 
		&& 
		(temData.start.pageY >= radioYLe && temData.start.pageY <= radioYRi)
	){
		//alert("start true");
		return true;
	}	
	//alert("start false");
		return false;
}

function validarEventEnd(circle,radioXRi,radioXLe,radioYRi,radioYLe){
	if(
		(temData.end.pageX >= radioXLe && temData.end.pageX <= radioXRi) 
		&& 
		(temData.end.pageY >= radioYLe && temData.end.pageY <= radioYRi)
	){
		//alert("end true");
		return true;
	}
	//alert("end false");
	return false;
}


function drawLine(){
	//if(circlesSelects.length>1 && circlesSelects.length<=2){
		
		for(var circle of circlesSelects){
			if(circle.isSelect){
				if(circle.isFirst){
					ctx.moveTo(circle.x,circle.y);
				}else{
					ctx.lineTo(circle.x,circle.y);
				}
			//	alert("this is selected"+JSON.stringify(circle));
				circle.isNew=false;
			}
		}
		ctx.lineWidth = 4;
	ctx.strokeStyle = "#FF0000";
		ctx.stroke();
		/*if(circlesSelects[0].x == circlesSelects[1].x || circlesSelects[0].y == circlesSelects[1].y){
			ctx.moveTo(circlesSelects[0].x,circlesSelects[0].y);
			for(var circle of circlesSelects){
				ctx.lineTo(circle.x,circle.y);
			}
			ctx.lineWidth = 4;
			ctx.stroke();
			linesBetweenCircles.push(circlesSelects);
			clearArray();
		}else{
			alert("no se puede");
			clearArray();
		}*/
	//}
}
function clearArray(){
	while(circlesSelects.length>0){
		circlesSelects.pop();
	}
}
function validateBox(){
	
}

/*
if(circlesSelects.length>=1){
				for(var circlesSelected of circlesSelects){
						alert(JSON.stringify(circlesSelected));
					if(circlesSelected.x == circle.x && circlesSelected.y == circle.y){
						alert("ya seleccionado");
					}else{
						alert("no se habia seleccionado antes");
						circle.isNew=true;
						circlesSelects.push(circle);
					}
				}
			}else{
				alert("primera vez");
				circlesSelects.push(circle);
			}

*/
