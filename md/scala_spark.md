## getting a largest number back 

First define a function that can calculate the maximum value for the reduce function. 
 
```
def max(a: Double, b: Double) = {
	if(a > b) a else b
}

val start = System.currentTimeMillis
val maxnum = sc.parallelize(1 to 1000000000).map{i =>
  scala.util.Random.nextDouble()
}.reduce(max)
val end = System.currentTimeMillis

println("This operation took " +  (end - start) + " ms")
println("The largest number is " + maxnum)
```

## long term markov chain output 

First define a Markov class. We will create many of these objects. 

```
class Markov(s: String){
	var state = s
	def next(): String = {
		val randval = scala.util.Random.nextDouble()
		state = state match {
			case "a" => if(randval < 0.3) "a" else "b"
			case "b" => if(randval < 0.6) "c" else "d"
			case "c" => if(randval < 0.7) "c" else "d"
			case "d" => if(randval < 0.6) "a" else "b"
		}
		state
	}
}

val num_iter = 10

val numchains = sc.parallelize(1 to 10)
val chains = numchains.flatMap( i => {
	val state = scala.util.Random.shuffle(List("a","b","c","d")).head
	val chain = new Markov( state )
	(1 to num_iter).map( x => chain.next() )
})
val count = chains.map( word => (word,1) ).reduceByKey( _ + _ )
count.collect()
```

