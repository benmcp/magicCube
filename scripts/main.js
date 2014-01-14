
	
	var cube = function(){

		function init(){

			// set up refernce point
			var matrix = data();

			visualInit();

		}

		function data(){
			var data = [];

			for (var i = 0; i <3; i++){
				data[i] = [];
				for (var j = 0; j <3; j++){
					data[i][j] = [];
					for (var k = 0; k <3; k++){
						data[i][j][k] = [i, j, k];
					}
				}
			}
			return data;
		}


		function visualInit(){


			var tile = "<div class='tile faceOne red'></div>";
		//	$(".cube").append(tile);
		//	console.log('test')
		}

		return {
			init: init

		}
	}();

	cube.init();


// mouse over motion

var clicking = false;
var x, y, z, position, pageWdith, pageHeight, widthPercent;
var diffX, diffY
var mouseClick;

var baseX, baseY = 0;
var currentX, currentY;

var obj = $(".cube");
  
$(document).ready(function(){
	pageWidth = $(this).width();
	pageHeight = $(this).height();

	$(".container").height(pageHeight);

	obj.css({ WebkitTransform: 'rotate3d(0,0,0,0deg'});
	//obj.css({ WebkitTransform: 'rotateX(' + 20 + 'deg)'});
	//obj.css({ WebkitTransform: 'rotateZ(' + 30 + 'deg)'});
})

$(document).resize(function(){
	pageWidth = $(this).width();
	pageHeight = $(this).height();
})

$("body").mousemove(function() {
	position = [event.pageX, event.pageY];
 	if(clicking == false) return;

	diffX = position[0] - mouseclick[0];
	diffY = position[1] - mouseclick[1];

	widthPercent = diffX/(pageWidth/4)
	heightPercent = diffY/(pageHeight/4)

	var rot = rotation();

});


function rotation(){
	var obj = $(".cube");
	var tr = obj.css("-webkit-transform") ||
	    obj.css("-moz-transform")    ||
	    obj.css("-ms-transform")     ||
	    obj.css("-o-transform")      ||
	    obj.css("transform");	

	  //  console.log(tr)
	// rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

	var values = tr.split('(')[1];
	    values = values.split(')')[0];
	    values = values.split(',');

	var a = values[0];
	var b = values[1];
	var c = values[2];
	var d = values[3];

	var scale = Math.sqrt(a*a + b*b);

	if(scale == 0){
		scale = 1;
	}

	var angleX = Math.round(Math.atan2(values[5], values[6])*(180/Math.PI));
	var angleY = Math.round(Math.atan2(a, c)*(180/Math.PI));
	var angleYY = Math.round(Math.atan2(a, c)*(180/Math.PI));
	//console.log(a + " " + b + " " + c + " " + d)
	$(".output").prepend( angleX + " " + angleYY + " " + angleY + "<br>");
	//$(".output").prepend( a + " <br>" + b + " " + c + " " + d + " " + tr + "<br>");


	currentX = baseX + heightPercent*90;
	currentY = baseY + widthPercent*90;

	obj.css({ WebkitTransform: 'rotateX(' + -currentX + 'deg)' + 'rotateY(' + currentY + 'deg)'});

}

function baseAngle(){
	var obj = $(".cube");
	var tr = obj.css("-webkit-transform") ||
	    obj.css("-moz-transform")    ||
	    obj.css("-ms-transform")     ||
	    obj.css("-o-transform")      ||
	    obj.css("transform");	

	// rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

	var values = tr.split('(')[1];
	    values = values.split(')')[0];
	    values = values.split(',');
	
	var a = values[0];
	var b = values[1];
	var c = values[2];
	var d = values[3];

	var scale = Math.sqrt(a*a + b*b);
	
	if(scale == 0){
		scale = 1;
	}

	var angleX = Math.round(Math.atan2(values[5], values[6])*(180/Math.PI));
	var angleY = Math.round(Math.atan2(a, c)*(180/Math.PI));
	
	if(isNaN(angleX)){
		angleX = 90;
	}


	baseX =  angleX - 90;
	baseY = angleY  -90;

}

// listener


$(document).mousedown(function(){
    clicking = true;
	mouseclick = position;
	
	baseAngle();
});

$(document).mouseup(function(){
    clicking = false;

    baseAngle();
 });