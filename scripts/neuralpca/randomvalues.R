library(RSNNS)
library(clusterGeneration)
library(devtools)
# source_url('https://gist.githubusercontent.com/fawda123/7471137/raw/466c1474d0a505ff044412703516c34f1a4684a5/nnet_plot_update.r')

# seed.val<-2
# set.seed(seed.val)
num.vars = 6 
num.obs = 2000 

df = data.frame(replicate(num.vars,sample(0:1,num.obs,rep=TRUE)))
#neural net with three hidden layers, 9, 11, and 8 nodes in each
mod<-mlp(df, df, size=c(3))
par(mar=numeric(4),family='serif')
plot.nnet(mod)
sum( round(mod$fitted.values) == df ) / sum( df == df )