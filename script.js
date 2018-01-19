
function adjustHour(h) {
	if (h == 0) {
		h = 12;
	} else if (h > 12) {
		h -= 12;
	}
	return h;
}

function addZero(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}

var rgb = true;
var hex = false;


document.getElementById("button").onclick = function() {
	if (rgb) {
		rgb = false;
		hex = true;
		console.log("button click");
	} else {
		rgb = true;
		hex = false;
		console.log("button!!");
	}
}

window.setInterval(function() {
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	context.translate(canvasWidth*0.5, canvasHeight*0.45);


function updateTime() {

	var today = new Date();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();

	hour = adjustHour(hour);

	if (rgb) {
		document.getElementById("body").style = "background-color: rgb(" + hour * 21 + "," + minute * 4 + "," + second * 4 + ");";
		document.getElementById("rgb").innerHTML = "rgb(" + hour + "<span> * 21 </span>, " + minute + "<span> * 4 </span>, " + second + "<span> * 4</span>)";
		document.getElementById("button").innerHTML = "rgb to hex";
	} else if (hex) {
	/*	if (hour < 10) {
			document.getElementById("body").style = "background-color: #0" + hour + minute + second + ";";
			document.getElementById("rgb").innerHTML = "#0" + hour + minute + second + ";";
		} else { */

		var hexHour = adjustHour(hour);
		hexHour = addZero(hour);
		var hexMinute = addZero(minute);
		var hexSecond = addZero(second);
		document.getElementById("body").style = "background-color: #" + hexHour + hexMinute + hexSecond + ";";
		document.getElementById("rgb").innerHTML = "#" + hexHour + hexMinute + hexSecond;
		document.getElementById("button").innerHTML = "hex to rgb";
		
	}	

	hour = addZero(hour);
	minute = addZero(minute);
	second = addZero(second);
	document.getElementById("time").innerHTML = hour + " : " + minute + " : " + second;

	function drawClock() {


		context.clearRect(0 - 0.5*canvasWidth, 0 - 0.45*canvasHeight, canvasWidth, canvasHeight);

		if (hour == 12) {
			hour = 0;
		}

		var hourPosition = hour * (Math.PI/6) + minute * (Math.PI/(6*60)) + second * (Math.PI/(360*60));
		var minutePosition = minute * (Math.PI/30) + second * (Math.PI/(30*60));
		var secondPosition = second * (Math.PI/30);

		drawHand(hourPosition, 0.25 * Math.min(canvasWidth, canvasHeight), 15);
		drawHand(minutePosition, 0.35 * Math.min(canvasWidth, canvasHeight), 10);
		drawHand(secondPosition, 0.4 * Math.min(canvasWidth, canvasHeight), 5);

		console.log("clock");

	}

	function drawHand(position, length, width) {
		context.beginPath();
		context.lineWidth = width;
		context.strokeStyle = "#eeeeee";
		context.moveTo(0, 0);
		context.rotate(position);
		context.lineTo(0, -length);
		context.lineTo(0, 0.03 * Math.min(canvasWidth, canvasHeight)); 
		context.stroke();
		context.rotate(-position);
}

	drawClock();
}

	updateTime();

}, 1000);

