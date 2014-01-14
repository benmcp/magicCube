
var stuff = function(){
	return "boo";
}
	
// self executing anonymous function

(function (stuff){

	var first = "FIRST TEST";
	
	var second = "Second TEST"
	
	window.first = first;
}())


// Revealing Module Pattern Function

var thirdFn = function(){
	
	var second = "The real second";
	
	return {
		second: second
	};
}();

// 'classes'....

function Car (type){
	this.type = type;
	this.color = "red";
	this.getInfo = getCarInfo;
}

function getCarInfo(){
	return this.color + " " + this.type + " Car";
}

var car = new Car("Holdren");
car.color = "FUCKING BLUE";

var whiteCar = new Car('Lambo');
whiteCar.color = "white";

Car.prototype.evenMore = function(){
	return this.color + " HHHHEEELLLLL YYYEEEAAAHHH"
}

var secondCar = {
	type: "FORD",
	color: "blue",
	getInfo: function (){
		return this.color + " " + this.type;
	}
}


// Angular Controller
function initControl($scope){

	// Angular Model
	$scope.phones = [
	    {
	    	'name':'ANDROID',
	    	'type':'PHONE'
	    },
	    {
	    	'name':'iPhone',
	    	'type':'SHITTY phone'
	    }
	];
}

	$(".container").append(first)
	$(".container").append("<BR>")

	$(".container").append("real second: "  + thirdFn.second)
	$(".container").append("<BR>")

	$(".container").append(car.getInfo())
	$(".container").append("<BR>")
	$(".container").append(whiteCar.getInfo())
	$(".container").append("<BR>")
	$(".container").append(whiteCar.evenMore())
	$(".container").append("<BR>")
	$(".container").append(secondCar.getInfo())
	