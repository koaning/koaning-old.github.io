function levenstein(a, b) {
  if(a.length === 0) return b.length; 
  if(b.length === 0) return a.length; 
 
  var matrix = [];
 
  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }
 
  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }
 
  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }
 
  return matrix[b.length][a.length];
};

function gray (n, k) {
    if (k === undefined) k = 2;
    if (n === 0) return [];
    
    var codes = [];
    var max = Math.pow(k, n);
    
    for (var i = 0; i < max; i++) {
        var res = [];
        var shift = 0;
        
        for (var j = n - 1; j >= 0; j--) {
            var x = (digit(i, k, j) + shift) % k;
            shift += k - x;
            res.push(x);
        }
        codes.push(res);
    }
    return codes;
};

function digit (n, radix, i) {
    return Math.floor(n / Math.pow(radix, i)) % radix;
}

function forceDirected(graphdata, cssSelector){
  var width = 300,
      height = 300;

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(80)
      .size([width, height]);

  var svg = d3.select(cssSelector).append("svg")
      .attr("width", width)
      .attr("height", height);

  force
      .nodes(graphdata.nodes)
      .links(graphdata.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graphdata.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
      .style("stroke", '#ccc');

  var gnodes = svg.selectAll('g.gnode')
    .data(graphdata.nodes)
    .enter()
    .append('g')
    .classed('gnode', true);

  var node = gnodes.append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .style("fill-opacity", 0.4)
      .call(force.drag);

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
        d.x = Math.cos(d.value/32*Math.PI*2)*width/2.2+width/2
        d.y = Math.sin(d.value/32*Math.PI*2)*width/2.2+width/2
       return 'translate(' + [d.x, d.y] + ')'; 
     });
  });
}

var nums = d3.range(0,Math.pow(2,5)),
  	bits = d3.range(0,Math.pow(2,5)).map( d3.format('05b') ),
	  gray = gray(5).map( function(a){ return a.join('') } );

var table = d3.select("table.table");

nums.forEach( function(d,i){ 
	var tr = table.append("tr");
	tr.append("td").text( nums[i] );
	tr.append("td").text( bits[i] );
	tr.append("td").text( gray[i] );
})

binaryGraph = { nodes : [], links : [] } 
grayGraph = { nodes : [], links : [] } 

nums.forEach( function(d){
  binaryGraph.nodes.push( { value : d } )
  grayGraph.nodes.push( { value : d } )
});

binaryGraph.nodes.forEach( function(d1,i1){
  binaryGraph.nodes.forEach( function(d2,i2){
    if( levenstein(bits[i1],bits[i2]) == 1 ){
      binaryGraph.links.push( {source:i1, target:i2})
    }
    if( levenstein(gray[i1],gray[i2])== 1 ){
      grayGraph.links.push( {source:i1, target:i2})
    }
  })  
})

forceDirected( binaryGraph, "#binlev")
forceDirected( grayGraph, "#graylev")