Advanced R 
========================================================

This document describes some lessons I would like to teach on the advanced subjects of R. 

## R Vocabulary 

R is full of functions. Many of them are very useful albeit infrequently used and unknown. Here I have a list of such functions. 




## Functional Programming 

In R there are many ways to write the same function. 


```r
add = function(a, b) {
    return(a + b)
}

add = function(a, b) {
    a + b
}

add = function(a, b) a + b
```


Notice that these three functions do exactly the same thing. A few things to note: 
- a function does not need a ```return``` statement to return a value, it no return statement is given it will return the final value on the body of the function 
- a function does not need curly brackets if you are only running one line of code. 

We can take this a step further by also adding ```if``` statements in our code. 


In R you can write functions that accept functions as input as well as functions that return other functions. 


```r
runfunc = function(d, f) {
    return
}
```



## ggplot2 & reshape2 


```r
library(ggplot2)
library(reshape2)
```


lazy evaluation of ggplot 
show the reshape2 tools 

## apply, sapply, lapply, dplyr


```r
library(dplyr)
```


## Performance 

We should never optimize before we know what is inperformant. You can check the performance of some of your code via the ```microbenchmark``` library. 


```r
library(microbenchmark)
```


An alternative method for profiling is to use the ```system.time``` method, but this is much less accurate. 


```r
x <- runif(1000)
microbenchmark(sqrt(x), x^(1/2), exp(log(x)/2))
```

```
## Loading required namespace: multcomp
```

```
## Unit: microseconds
##           expr    min     lq   mean median     uq   max neval
##        sqrt(x)  4.819  7.614  8.133  7.804  8.015 44.52   100
##        x^(1/2)  6.130  9.048  8.814  9.264  9.508 10.96   100
##  exp(log(x)/2) 19.490 28.059 29.358 28.778 29.244 89.33   100
```


There are three ways to calculate a square root and we notice that one function is significantly quicker than the others. Another benchmark is to look at the number of evaluations that are needed instead of looking at the time it takes to execute. 


```r
x <- runif(1000)
microbenchmark(sqrt(x), x^(1/2), exp(log(x)/2), unit = "eps")
```

```
## Loading required namespace: multcomp
```

```
## Unit: evaluations per second
##           expr   min     lq   mean median     uq    max neval
##        sqrt(x) 14986 120620 132333 126151 128560 206697   100
##        x^(1/2) 82264 100654 109836 103061 106615 162920   100
##  exp(log(x)/2) 11788  33003  35651  34267  35081  51393   100
```


In this case, higher means better. We can also compare two implementations of the ```fib``` function. 

Possible exercizes:

1. Compare the arithmetic operators ( ```+```, ```-```, ```*```, ```/```, ```^```) on performance and visualise the results. 
2. Think before you check. Which of the following functions for the fibonachi sequence would run quicker? 


```r
fib1 = function(len) {
    fibvals <- numeric(len)
    fibvals[1] <- 1
    fibvals[2] <- 1
    for (i in 3:len) {
        fibvals[i] <- fibvals[i - 1] + fibvals[i - 2]
    }
    fibvals[len]
}

fib2 = function(len) {
    if (len == 1) 
        return(1)
    if (len == 2) 
        return(1)
    return(fib2(len - 1) + fib2(len - 2))
}
```


## Performance 2

Below I will show you multiple ways to select a subset of data in a dataframe. 


```r
microbenchmark(`[32, 11]` = mtcars[32, 11], `$carb[32]` = mtcars$carb[32], `[[c(11, 32)]]` = mtcars[[c(11, 
    32)]], `[[11]][32]` = mtcars[[11]][32], .subset2 = .subset2(mtcars, 11)[32])
```

```
## Loading required namespace: multcomp
```

```
## Unit: nanoseconds
##           expr   min    lq    mean median      uq    max neval
##       [32, 11] 13335 14272 16515.7  14781 15517.5  47051   100
##      $carb[32]  1684  2154  5087.4   2324  2572.5 273707   100
##  [[c(11, 32)]]  5289  5978  6751.2   6488  6960.5  17597   100
##     [[11]][32]  4952  5782  6695.2   6086  6457.0  28318   100
##       .subset2   303   394   572.1    445   517.5  11033   100
```


Notice the performance difference. The reason of the difference? Nobody has fixed the improvements. Selecting maximum/minimum values also can be done a lot quicker if you pick different functions. 

R does some opertions in verctorized mode. If it knows all types in an array to be of a certain type you shouldn't always write an ```apply``` type function for it. 


```r
x = runif(1000)
microbenchmark(sapply(x, function(x) {
    x * 2
}), x * 2)
```

```
## Loading required namespace: multcomp
```

```
## Unit: nanoseconds
##                                  expr    min     lq    mean  median
##  sapply(x, function(x) {     x * 2 }) 914764 982546 1097848 1027659
##                                 x * 2    915   1138    1779    1324
##       uq     max neval
##  1092942 1980237   100
##     1554   12252   100
```



## Profiling 
