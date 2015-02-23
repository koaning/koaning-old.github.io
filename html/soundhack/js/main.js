// var analyser, canvas, canvasContext;

var color = d3.scale.linear()
    .domain([0, 255])
    .range(["white", "black"]);

var matrix = [],
	times = []; 

function buildSpectogram() {
	playAudio();
	measure(0);
}

var audioContext = new webkitAudioContext();
var analyser = audioContext.createAnalyser();

function createAudioElement(urls) {
    var audioElement = document.createElement("audio");

    audioElement.autoplay = true;
    audioElement.loop = false;
    
    for (var i = 0; i < urls.length; ++i) {
        var typeStr = "audio/" + urls[i].split(".").pop();

        if (audioElement.canPlayType === undefined ||
            audioElement.canPlayType(typeStr).replace(/no/, "")) {
            var sourceElement = document.createElement("source");
            sourceElement.type = typeStr;
            sourceElement.src = urls[i];
            audioElement.appendChild(sourceElement);
        }
    }
    return audioElement;
}

function playAudio(){
    var audio = createAudioElement(['Untitled.mp3']);      
    if(audio){
        var source = audioContext.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        audio.play();
    }
}

function demo(){
	playAudio();
	function run(i) {
		if( i < 900 ){ // stop after this many samples have been measured
		  webkitRequestAnimationFrame(function(){run(i + 1)});
		}
		var freqByteData = new Uint8Array(analyser.frequencyBinCount);
		analyser.getByteFrequencyData(freqByteData);
		if( d3.median(_.filter(freqByteData, function(d,i){ return i < 341})) > 105 ){
			d3.select("#demo").style("background-color","#cccccc")
		}else{
			d3.select("#demo").style("background-color","#ffffff")
		}
	}
	run(0)	
}

// Wire up the <audio> element with the Web Audio analyser
function setupWebAudio() {
	var audio = document.getElementById('music');
	var audioContext = new webkitAudioContext();
	analyser = audioContext.createAnalyser();
	var source = audioContext.createMediaElementSource(audio);
	source.connect(analyser);
	analyser.connect(audioContext.destination);
	audio.play();
}

function castToArray( uintarr ){
	result = [] 
	for (var i = uintarr.length - 1; i >= 0; i--) {
		result.push(uintarr[i])
	};
	return result; 
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function sparkline(data, cssloc){
	d3.select(cssloc).select("svg").remove();
	var width = d3.select(cssloc).node().clientWidth;

	var graph = d3.select(cssloc).append("svg:svg").attr("width", width).attr("height", 50);
	var x = d3.scale.linear().domain([0,data.length-1]).range([0, width]);
	var y = d3.scale.linear().domain(d3.extent(data)).range([0, 50]);
	var line = d3.svg.line()
		.x(function(d,i) { return x(i); })
		.y(function(d) { return y(d); })
	
	graph.append("svg:path").attr("d", line(data));
	console.log(data);
	graph.append("svg:path").attr("d", line( 
		d3.range(data.length).map(function(){return 50})
	)).style("stroke","red").style("stroke-opacity", 0.5);
}

function measure(run){
	if( run < 900 ){ // stop after this many samples have been measured
	  webkitRequestAnimationFrame(function(){measure(run + 1)});
	}
	var freqByteData = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(freqByteData);
	matrix.push(freqByteData);
	drawspectogrambit(freqByteData, run)
}

// rather performant canvas code 
function drawspectogram(){
	var canvas = document.getElementById("myCanvas");
	var canvasWidth = canvas.width;
	var canvasHeight = canvas.height;
	var ctx = canvas.getContext("2d");
	var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
	for (var j = matrix.length - 1; j >= 0; j--) {
		var freqByteData = matrix[j];
		for (var i = 0; i < freqByteData.length; i++) {
			ctx.fillStyle = color(freqByteData[i])
			ctx.fillRect(i,j,1,1);
		}
	};	
}

drawspectogrambit = function(freqData, run){
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	for (var i = 0; i < freqData.length; i++) {
		ctx.fillStyle = color(freqData[i])
		ctx.fillRect(i,run,1,1);
	}
}

drawSparklines = function(){
	var mid = matrix.map( function(row){ return _.filter(row, function(d,i){ return i > 341 & i < 683}) });
	sparkline(mid.map( function(d){ return d3.median(d) } ) , "#sparkline") 
}

