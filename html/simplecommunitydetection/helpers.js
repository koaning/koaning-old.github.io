var toMatrix = function(nodes, links){
	var sim = d3.range(nodes.length).map( function(d,i,l){
		return d3.range(nodes.length).map( function(d,i,l){
			return 0;
		});
	});
	links.forEach( function(d){
		sim[d.source.index][d.target.index] = 1;
		sim[d.target.index][d.source.index] = 1;
	})
	return sim
}

var toCorrelationMatrix = function( simMatrix ){
	return d3.range(simMatrix.length).map( function(d1,i1,l1){
		return d3.range(simMatrix.length).map( function(d2,i2,l2){
			return correlation( simMatrix[i1], simMatrix[i2] )
		});
	});
}

var getCorrCoefMatrix = function(){
    return nodes.map(function(d1,i1){ 
        return nodes.map(function(d2,i2){
            return corrCoef(i1,i2);
        }) 
    })
}

var translate = function(matrix, clusters){
	function translateRow(matrix, cluster){
		return _.findIndex(A, function(d){ return d == cluster })
	}
	return clusters.map( function(cluster){
		return cluster.map( function(row){
			return translateRow(matrix, row) 
		})
	})
}

var nodeUpdate = function(clustering){
	function changeNode(id, clusterid){
		var colors = d3.scale.category10().range(); 
		nodes[id].color = colors[clusterid]
	}
	clustering.forEach( function(cluster, clusterid){
		cluster.forEach( function(row){
			changeNode(row, clusterid)
		})
	})
}

var corrCoef = function(n1,n2){
    var connected = function(n1,n2){
        return _.filter(links, function(d){ 
            var bool1 = d.source.index == n1 & d.target.index == n2
            var bool2 = d.source.index == n2 & d.target.index == n1
            return bool1 | bool2 
        }).length > 0
    }
    var n2ConnectedNodes = _.filter(links, function(d){ 
        return d.source.index == n2 | d.target.index == n2
    }).map(function(d){ return d.target });

    return d3.mean(n2ConnectedNodes.map( function(d){ 
        return connected(d.index,n1) | d.index == n1 
    }));
}

// var removeNode = function(idx){
//     nodes = nodes.filter(function(d){ 
//         return d.index != idx;
//     });

//     _.findIndex(links, function(d){ 
//         var bool1 = d.source.index == idx,
//             bool2 = d.target.index == idx; 
//         return bool1 || bool2;
//     });

//     var removebleLinks = links.reduce(function(a, e, i) {
//         var bool1 = e.source.index == idx,
//             bool2 = e.target.index == idx; 
//         if(bool1 || bool2){a.push(i)};
//         return a;
//     }, []);

//     _.sortBy(removebleLinks, function(d){
//         return -d
//     }).forEach( function(d){
//         links.splice(d,1)
//     })
    
//    restart();
// }

var randomGrowNode = function(){
    if( nodes.length > 50 ){
        return 0; 
    }
    var fromNode = nodes[Math.floor(Math.random()*nodes.length)],
    node = {x: 20*Math.random()+fromNode.x, y: 20*Math.random()+fromNode.y};
    nodes.push(node);

    // add links to any nearby nodes
    nodes.forEach(function(target){
        var x = target.x - node.x,
            y = target.y - node.y;
        if (Math.sqrt(x * x + y * y) < 30) {
          links.push({source: node, target: target});
        }
    });
    restart();
    ml();
}

var randomGrowCluster = function(){
    if( nodes.length > 50 ){
        return 0; 
    }
    var fromNode = nodes[Math.floor(Math.random()*nodes.length)],
    node = {x: 20*Math.random()+fromNode.x, y: 20*Math.random()+fromNode.y};
    nodes.push(node);

    // add links to any nearby nodes
    nodes.forEach(function(target){
        var x = target.x - node.x,
            y = target.y - node.y;
        if (Math.sqrt(x * x + y * y) < 30) {
          links.push({source: node, target: target});
        }
    });
    restart();
    ml();
}

var repeat = function(f, max, num){
    f()
    if(num < max) repeat(f,max,num+1)
}

var ml = function(){
    // A = toMatrix(nodes, links)
    A = getCorrCoefMatrix()
    clustering = translate(A, kmeans(A,3))
    nodeUpdate(clustering) 
    node.style("fill",function(d){ return d.color })
}

function correlation(x, y) {
    var shortestArrayLength = 0;
     
    if(x.length == y.length) {
        shortestArrayLength = x.length;
    } else if(x.length > y.length) {
        shortestArrayLength = y.length;
    } else {
        shortestArrayLength = x.length;
    }
  
    var xy = [];
    var x2 = [];
    var y2 = [];
  
    for(var i=0; i<shortestArrayLength; i++) {
        xy.push(x[i] * y[i]);
        x2.push(x[i] * x[i]);
        y2.push(y[i] * y[i]);
    }
  
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_x2 = 0;
    var sum_y2 = 0;
  
    for(var i=0; i< shortestArrayLength; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += xy[i];
        sum_x2 += x2[i];
        sum_y2 += y2[i];
    }
  
    var step1 = (shortestArrayLength * sum_xy) - (sum_x * sum_y);
    var step2 = (shortestArrayLength * sum_x2) - (sum_x * sum_x);
    var step3 = (shortestArrayLength * sum_y2) - (sum_y * sum_y);
    var step4 = Math.sqrt(step2 * step3);
    var answer = step1 / step4;
  
    return answer;
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}   

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

var findCongestedLink = function(graph){
    var copy = function(d){return d};
    var nodes = graph.nodes.map(copy); 
    var links = graph.links.map(function(d){
        return [d.source.index, d.target.index]
    }); 
    links.forEach(function(link){
        links.push([link[1], link[0]])
    })

    var dist = nodes.map(function(d1,i1){
        return nodes.map(function(d2,i2){
            if( i1 == i2 ){
                return {dist:0, paths: []};
            }
            return {dist:9999, paths: []};
        });
    });

    links.forEach(function(d){
        dist[d[0]][d[1]].dist = 1; 
        dist[d[0]][d[1]].paths = [{source:d[0], target:d[1]}]
    })

    nodes.forEach(function(d1,k){
        nodes.forEach(function(d1,i){
            nodes.forEach(function(d1,j){
                if( dist[i][j].dist > dist[i][k].dist + dist[k][j].dist ){
                    dist[i][j].dist = dist[i][k].dist + dist[k][j].dist
                    var newpaths = dist[i][k].paths.map(copy)
                    dist[k][j].paths.forEach( function(d){
                        newpaths.push(d);
                    })
                    dist[i][j].paths = newpaths;
                }
            })
        })
    })

    dist.forEach(function(d1,i){
        dist.forEach(function(d2,j){
            dist[j][i] = dist[i][j]
        })
    });

    var allpaths = [];
    dist.forEach(function(d1,i2){
        return d1.forEach(function(d2,i1){
            allpaths.push(d2.paths);
        })
    })

    var counts = _.flatten(allpaths).map( function(d){ return d.source + "-" + d.target }).reduce(function(map, word){
        map[word] = (map[word]||0)+1;
        return map;
    }, Object.create(null));

    var link = _.invert(counts)[_.max(counts)];

    return link.split("-").map(function(d){ return Number(d) })
}

var graph = {nodes:nodes, links:links}
findCongestedLink(graph) 
_.find(links, function(d){ return d.target.index == 16  }).color="red";
restart();
