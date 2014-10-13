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

// A = toMatrix(nodes, links)
// A = getCorrCoefMatrix()
// clustering = translate(A, kmeans(A,2))
// nodeUpdate(clustering) 
// node.style("fill",function(d){ return d.color })

function correlation(x, y) {
    var shortestArrayLength = 0;
     
    if(x.length == y.length) {
        shortestArrayLength = x.length;
    } else if(x.length > y.length) {
        shortestArrayLength = y.length;
        console.error('x has more items in it, the last ' + (x.length - shortestArrayLength) + ' item(s) will be ignored');
    } else {
        shortestArrayLength = x.length;
        console.error('y has more items in it, the last ' + (y.length - shortestArrayLength) + ' item(s) will be ignored');
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

