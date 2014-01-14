
// Created By Ben McPhail 1/12013

var cube = function(){

	var data = [];

	// Set up the cube

	function init(){

		var browserSupport = checkBrowser();

		if(!browserSupport){
			informUser();
		}

		var matPos = ['tl','tm','tr','ml','mm','mr','bl','bm','br'];
		var matDepth = ['f','m','b'];
		var smallCube;
		var cubeFace = "";
		var j, i = 0;
		
		var number = ['One','Two','Three','Four','Five','Six'];
		
		for(j=0; j < number.length; j++){
			cubeFace += "<div class='face" + number[j] + " face'></div>";
		}

		for (j = 0; j < matDepth.length; j++){
			data[j] = [];
			for ( i = 0; i < matPos.length; i++){
				data[j][i] = [{
					"initial": matDepth[j] + matPos[i], 
					"rotateX":0, 
					"rotateY":0, 
					"rotateZ":0, 
					"rotation":"",
					"z": getDepthPx(j),
					'x': getXY(i)[0],
					"y": getXY(i)[1]
				}, 0 , 0];

				smallCube = "<div class='smallCube " + matDepth[j] + matPos[i] + "' data-face='" + i + "' data-depth='" + j + "' data-z='0' data-initial='" +  matDepth[j] + matPos[i] + "' data-current='" +  matDepth[j] + matPos[i] + "'>" + cubeFace + "</div>";
				$(".cube").append(smallCube);
			}
		}
	}

	function checkBrowser(){
		var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
		var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		    // At least Safari 3+: "[object HTMLElementConstructor]"
		var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
		var isIE = /*@cc_on!@*/false || !!document.documentMode;   // At least IE6

		if(isChrome){
			return true
		}	
		else {
			return false
		}
	}

	function informUser(){
		$(".browserIssue").fadeIn();
	}

	function getDepthPx(x){

		if(x === 0){
			return 100;
		}
		else if(x === 1){
			return 0;
		}
		else {
			return -100;
		}
	}

	function getXY(x){

		// there is a better way to this, but for ease/speed...
		var position;
		switch (x){

			case 0:
				position = [0,0];
				break;
			case 1:
				position = [100,0];
				break;
			case 2:
				position = [200,0];
				break;
			case 3:
				position = [0,100];
				break;
			case 4:
				position = [100,100];
				break;
			case 5:
				position = [200,100];
				break;
			case 6:
				position = [0,200];
				break;
			case 7:
				position = [100,200];
				break;
			case 8:
				position = [200,200];
				break;
		}
		return position;
	}

	// Cube rotation due to mouse click

	var obj, tr, values, a, b, c, d, scale, angleX, angleY;

	function rotateCube(){

		position = [event.pageX, event.pageY];
	 	if(clicking == false) return;

		diffX = position[0] - mouseclick[0];
		diffY = position[1] - mouseclick[1];

		widthPercent = diffX/(pageWidth/4);
		heightPercent = diffY/(pageHeight/4);

		getBaseAngle();
		
		currentX = baseX + heightPercent*90;
		currentY = baseY + widthPercent*90;

		obj.css({ WebkitTransform: 'rotateX(' + -currentX + 'deg)' + 'rotateY(' + currentY + 'deg)'});
	}	

	function baseAngle(){

		getBaseAngle();

		if(isNaN(angleX)){
			angleX = 90;
		}
		baseX =  angleX - 90;
		baseY = angleY  -90;
	}

	function getBaseAngle(){

		obj = $(".cube");
		tr = obj.css("-webkit-transform") ||
		    obj.css("-moz-transform")    ||
		    obj.css("-ms-transform")     ||
		    obj.css("-o-transform")      ||
		    obj.css("transform");	

		values = tr.split('(')[1];
	    values = values.split(')')[0];
	    values = values.split(',');
	
		a = values[0];
		b = values[1];
		c = values[2];
		d = values[3];

		scale = Math.sqrt(a*a + b*b);
		
		if(scale == 0){
			scale = 1;
		}

		angleX = Math.round(Math.atan2(values[5], values[6])*(180/Math.PI));
		angleY = Math.round(Math.atan2(a, c)*(180/Math.PI));
	}

	// Cube configuration changes

	// there are a total of 12 different turns - turning middle row/column is ignored

	/*
		Convention

		LU - Left Up
		LD - Left Down
		RU - Right Up
		RD - Right Down
		
		TR - Rop Right
		TL - Top Left
		BR - Bottom Right
		BL - Bottom Left

		FR - Front Right
		FL - Front Left
		BR - Rear Right
		BL - Rear Left
	*/ 

	var positionMap = {
		'LU': 
			{
				'ftl':'btl',
				'fml':'mtl',
				'fbl':'ftl',
				'mtl':'bml',
				'mml':'mml',
				'mbl':'fml',
				'btl':'bbl',
				'bml':'mbl',
				'bbl':'fbl'
			},
		'LD': 
			{
				'ftl':'fbl',
				'fml':'mbl',
				'fbl':'bbl',
				'mtl':'fml',
				'mml':'mml',
				'mbl':'bml',
				'btl':'ftl',
				'bml':'mtl',
				'bbl':'btl'
			},
		'RU': 
			{
				'ftr':'btr',
				'fmr':'mtr',
				'fbr':'ftr',
				'mtr':'bmr',
				'mmr':'mmr',
				'mbr':'fmr',
				'btr':'bbr',
				'bmr':'mbr',
				'bbr':'fbr'
			},
		'RD': 
			{
				'ftr':'fbr',
				'fmr':'mbr',
				'fbr':'bbr',
				'mtr':'fmr',
				'mmr':'mmr',
				'mbr':'bmr',
				'btr':'ftr',
				'bmr':'mtr',
				'bbr':'btr'
			},			
		'TR': 
			{
				'btl':'btr',
				'btm':'mtr',
				'btr':'ftr',
				'mtl':'btm',
				'mtm':'mtm',
				'mtr':'ftm',
				'ftl':'btl',
				'ftm':'mtl',
				'ftr':'ftl'
			},
		'TL': 
			{
				'btl':'ftl',
				'btm':'mtl',
				'btr':'btl',
				'mtl':'ftm',
				'mtm':'mtm',
				'mtr':'btm',
				'ftl':'ftr',
				'ftm':'mtr',
				'ftr':'btr'
			},
		'DR': 
			{
				'bbl':'bbr',
				'bbm':'mbr',
				'bbr':'fbr',
				'mbl':'bbm',
				'mbm':'mbm',
				'mbr':'fbm',
				'fbl':'bbl',
				'fbm':'mbl',
				'fbr':'fbl'
			},	
		'DL': 
			{
				'bbr':'bbl',
				'mbr':'bbm',
				'fbr':'bbr',
				'bbm':'mbl',
				'mbm':'mbm',
				'fbm':'mbr',
				'bbl':'fbl',
				'mbl':'fbm',
				'fbl':'fbr'
			},	
		'BR': 
			{
				'btl':'btr',
				'btm':'bmr',
				'btr':'bbr',
				'bml':'btm',
				'bmm':'bmm',
				'bmr':'bbm',
				'bbl':'btl',
				'bbm':'bml',
				'bbr':'bbl'
			},								
		'BL': 
			{
				'btr':'btl',
				'bmr':'btm',
				'bbr':'btr',
				'btm':'bml',
				'bmm':'bmm',
				'bbm':'bmr',
				'btl':'bbl',
				'bml':'bbm',
				'bbl':'bbr'
			},	
		'FR': 
			{
				'ftl':'ftr',
				'ftm':'fmr',
				'ftr':'fbr',
				'fml':'ftm',
				'fmm':'fmm',
				'fmr':'fbm',
				'fbl':'ftl',
				'fbm':'fml',
				'fbr':'fbl'
			},								
		'FL': 
			{
				'ftr':'ftl',
				'fmr':'ftm',
				'fbr':'ftr',
				'ftm':'fml',
				'fmm':'fmm',
				'fbm':'fmr',
				'ftl':'fbl',
				'fml':'fbm',
				'fbl':'fbr'
			}
	}

	var rotateMap = {
		'LU': ' rotate3d(1,0,0,90deg)',
		'LD': ' rotate3d(1,0,0,-90deg)',
		'RU': ' rotate3d(1,0,0,90deg)',
		'RD': ' rotate3d(1,0,0,-90deg)',
		'TR': ' rotate3d(0,1,0, -90deg) ',
		'TL': ' rotate3d(0,1,0, 90deg) ',
		'DR': ' rotate3d(0,1,0, -90deg) ',
		'DL': ' rotate3d(0,1,0, 90deg) ',
		'BR': ' rotate3d(0,0,1, 90deg) ',
		'BL': ' rotate3d(0,0,1, -90deg) ',
		'FR': ' rotate3d(0,0,1, 90deg) ',
		'FL': ' rotate3d(0,0,1, -90deg) '
	}

	var getCube, getData, rotateStr;

	function rotate(move){

		$.each(positionMap[move], function(i){

			getCube = $("div").find("[data-current='" + i + "']");

			getData = data[getCube.data("depth")][getCube.data('face')][0];

			// need to find more elegant solution for this step
			rotateStr = rotateMap[move] + getData.rotation;

			getData.rotation = rotateStr;

			getCube.css('-webkit-transform', 'translate3d(' + getData.x + 'px,' + getData.y + 'px,' + getData.z + 'px)' + rotateStr);
			getCube.attr('data-current', positionMap[move][getCube.data('current')] + "_temp");

		});

		for (var key in positionMap[move]){
			getCube = $("div").find("[data-current='" + positionMap[move][key] + "_temp']");
			getCube.attr("data-current", positionMap[move][key])
			getCube.data("current", positionMap[move][key])
		}	
	}

	return {
		init: init,
		rotateCube: rotateCube,
		baseAngle: baseAngle,
		rotate: rotate
	}
}();

// mouse over motion

var position, pageWdith, pageHeight, widthPercent;
var diffX, diffY
var mouseClick;
var clicking = false;

var baseX, baseY = 0;
var currentX, currentY;

var obj = $(".cube");
  
;(function(){

	pageWidth = $(this).width();

	pageHeight = $(this).height();

	$(".container").height(pageHeight);

	// set up cube

	cube.init();

	obj.css({ WebkitTransform: 'rotate3d(0,0,0,0deg'});

})();


// listeners

$(document).resize(function(){
	pageWidth = $(this).width();
	pageHeight = $(this).height();
})

$("body").mousemove(function() {

	cube.rotateCube();
});

$(document).mousedown(function(){
    
    clicking = true;
	mouseclick = position;
	cube.baseAngle();
});

$(document).mouseup(function(){

    clicking = false;
    cube.baseAngle();
 });

// cube configuration chagnes

window.onkeydown = function(e) {

   var key = e.keyCode ? e.keyCode : e.which;

   // 2 Key - Back Clockwise
	if (key == 50) {
		cube.rotate('BR');
	}
   // 3 Key - Back Anti-Clockwise
	if (key == 51) {
		cube.rotate('BL');
	}

   // W Key - Top Right
	if (key == 87) {
		cube.rotate('TR');
	}
   // E Key - Top Left
	if (key == 69) {
		cube.rotate('TL');
	}

   // S Key - Front Clockwise
	if (key == 83) {
		cube.rotate('FR');
	}
   // D Key - Front Anti-Clockwise
	if (key == 68) {
		cube.rotate('FL');
	}

   // X Key - Down Right
	if (key == 88) {
		cube.rotate('DR');
	}
   // C Key - Down Left
	if (key == 67) {
		cube.rotate('DL');
	}

   // Q Key - Left Up
	if (key == 81) {
		cube.rotate('LU');
	}
   // A Key - Left Down
	if (key == 65) {
		cube.rotate('LD');
	}

   // R Key - Right Up
	if (key == 82) {
		cube.rotate('RU');
	}
   // F Key - Right Down
	if (key == 70) {
		cube.rotate('RD');
	}
}

$(".icon").toggle(
	function(){
		$(".content").addClass('show');
		$(".content").removeClass('hide');
		$(".black").addClass('opacity');
	},
	function(){

		$(".content").addClass('hide');
		$(".content").removeClass('show');
		$(".black").removeClass('opacity');
	}
);

$(".box").click(function(){

	var that = $(this);

	$(".box").each(function(){
		$(this).removeClass('white');
	})
	that.addClass('white');

	$(".smallCube").each(function(){
		$(this).css({
			'transition': 'transform ' + that.data('speed') + 's linear',
			'-webkit-transition': '-webkit-transform ' + that.data('speed') +  's linear'		
		})
	})
});