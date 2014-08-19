var worddata = {
	nodes : [ 
		{value : 'the'},
		{value : 'meaning'},
		{value : 'of'},
		{value : 'life'},
		{value : 'numbers'},
		{value : 'time'},
		{value : 'your'},
		{value : 'prime'},
		{value : 'years'},
		{value : 'a'},
		{value : 'travel'},
		{value : 'destination'},
		{value : 'big'},
		{value : 'monster'},
		{value : 'building'},
		{value : 'butterfly'},
		{value : 'happyness'},
		{value : 'is'},
		{value : 'like'},
		{value : 'you'},
		{value : 'invested'},
		{value : 'passing'},
		{value : 'by'}

	],
	links : [
		{source:0, target:1, value: 3, col: '#c0392b'},
		{source:1, target:2, value: 3, col: '#c0392b'},
		{source:2, target:3, value: 3, col: '#c0392b'},
		{source:3, target:2, value: 3, col: '#c0392b'},
		{source:7, target:5, value: 3, col: '#7f8c8d'},
		{source:2, target:5, value: 3, col: '#7f8c8d'},
		{source:2, target:5, value: 3, col: '#7f8c8d'},
		{source:3, target:5, value: 3, col: '#7f8c8d'},
		{source:7, target:4, value: 3, col: '#7f8c8d'},
		{source:7, target:8, value: 3, col: '#7f8c8d'},
		{source:0, target:8, value: 3, col: '#7f8c8d'},
		{source:10, target:5, value: 3, col: '#7f8c8d'},
		{source:10, target:9, value: 3, col: '#7f8c8d'},
		{source:10, target:6, value: 3, col: '#7f8c8d'},
		{source:11, target:10, value: 3, col: '#7f8c8d'},
		{source:12, target:9, value: 3, col: '#7f8c8d'},
		{source:12, target:13, value: 3, col: '#7f8c8d'},
		{source:12, target:14, value: 3, col: '#7f8c8d'},
		{source:15, target:9, value: 3, col: '#7f8c8d'},
		{source:16, target:14, value: 3, col: '#7f8c8d'},
		{source:17, target:16, value: 3, col: '#7f8c8d'},
		{source:19, target:18, value: 3, col: '#7f8c8d'},
		{source:9, target:18, value: 3, col: '#7f8c8d'},
		{source:8, target:21, value: 3, col: '#7f8c8d'},
		{source:22, target:21, value: 3, col: '#7f8c8d'},
		{source:20, target:17, value: 3, col: '#7f8c8d'},
		{source:20, target:22, value: 3, col: '#7f8c8d'},
		{source:20, target:6, value: 3, col: '#7f8c8d'}

	]
}

function forceDirected(graphdata, cssSelector){
  var width = d3.select(cssSelector).node().clientWidth/1.5,
      height = 400;

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .charge(-500)
      .linkDistance(50)
      .size([width, height]);

  var svg = d3.select(cssSelector).append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display","block")
      .style("margin","auto");

  force
      .nodes(graphdata.nodes)
      .links(graphdata.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graphdata.links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.random()*3+2; })
      .style("stroke-opacity", 0.7)
      .style("stroke", function(d){ return d.col });

  var gnodes = svg.selectAll('g.gnode')
    .data(graphdata.nodes)
    .enter()
    .append('g')
    .classed('gnode', true)
    .call(force.drag);

  var node = gnodes.append("circle")
      .attr("class", "node")
      .attr("r", 15)
      .style("fill", "white" )
      .style("fill-opacity", 0.9);
      

  var labels = gnodes.append("text")
    .text(function(d) { return d.value; });

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

     gnodes.attr("transform", function(d) { 
       return 'translate(' + [d.x, d.y] + ')'; 
     });
  });
}

forceDirected( worddata, '#graphviz')