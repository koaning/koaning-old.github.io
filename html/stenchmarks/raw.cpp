#include <Rcpp.h>
#include <random>
using namespace Rcpp;

// [[Rcpp::export]]
NumericVector runifC(int n, double min=0, double max=1, int seed = 1) {
  NumericVector out(n);
  srand(seed);
  for(int i = 0; i < n; ++i) {
    out[i] = min + ((double) std::rand() / (RAND_MAX)) * (max - min);
  }
  return out;
}

/*** R
setwd('/Users/code/Desktop/fastsimR/')
library(microbenchmark)
library(ggplot2)
microbenchmark(
  'R unif-100000' = runif(100000),
  'C unif-100000' = runifC(100000)
)
seeds = 30

df = data.frame(seed1=as.numeric(c()), seed2=as.numeric(c()), cor=as.numeric(c()))
for(i in 1:seeds){
  for(j in i:seeds){
    r1 = runifC(100000,0,1,i)
    r2 = runifC(100000,0,1,j)
    df = rbind(df, data.frame(seed1=i, seed2=j, cor=cor(r1,r2)))
  }
  print(i)
}
ggplot() + geom_tile(data=df, aes(seed1, seed2, fill=cor)) + ggtitle("c random seed correlations")

df = data.frame(seed1=as.numeric(c()), seed2=as.numeric(c()), cor=as.numeric(c()))
for(i in 1:seeds){
  for(j in i:seeds){
    set.seed(i)
    r1 = runif(100000)
    set.seed(j)
    r2 = runif(100000)
    df = rbind(df, data.frame(seed1=i, seed2=j, cor=cor(r1,r2)))
  }
  print(i)
}
ggplot() + geom_tile(data=df, aes(seed1, seed2, fill=cor)) + ggtitle("r random seed correlations")

*/


// [[Rcpp::export]]
double calcpi(int n){
  double inside = 0; 
  srand(1);
  for(int i = 0; i < n; ++i){
    double x = ((double) rand() / (RAND_MAX));
    double y = ((double) rand() / (RAND_MAX));
    if( x*x + y*y < 1.0 ){
      inside = inside + 1; 
    }
  }
  return(4 * inside / n);
}

// [[Rcpp::export]]
double piSugar(const int N) {
    NumericVector x = runif(N);
    NumericVector y = runif(N);
    NumericVector d = sqrt(x*x + y*y);
    return 4.0 * sum(d < 1.0) / N;
}

/*** R
calcpiR = function(n){
  inside = 0; 
  for(i in 1:n) {
    randx = runif(1)
    randy = runif(1)
    if( runif(1)^2 + runif(1)^2 < 1 ){
      inside = inside + 1; 
    }
  }
  return(inside/n*4);
}

microbenchmark(
  'R pi func'  = calcpiR(1000),
  'R pi vector'= sum(runif(10000)^2+runif(10000)^2 < 1)*4/10000,
  'C pi vector'= sum(runifC(10000)^2+runifC(10000)^2 < 1)*4/10000,
  'C pi rsugar'= piSugar(10000),
  'C pi pure'  = calcpi(10000)
)

nsim = 10000000
cat('R pi func', calcpiR(10000) )
cat('R pi vector', sum(runif(nsim)^2+runif(nsim)^2 < 1)*4/nsim )
cat('C pi rsugar', piSugar(nsim) )
cat('C pi pure', calcpi(nsim) )
cat('sys pi', pi )
*/