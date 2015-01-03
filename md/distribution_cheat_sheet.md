## Distribution Cheat Sheet 

I made a cheatsheet because I kept forgetting where certain distributions came from in statistics. Here's a small refresher/reminder. 

### Distributions 

#### Normal distribution definitions

The normal distribution is defined via a mean $$$\mu$$$ and a variance $$$\sigma$$$. If $$$x \sim N(\mu, \sigma)$$$ then the probability density function becomes the following.

$$p(x) = \frac{1}{\sqrt{2\pi\sigma^2}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$

This means that a variable from the standard normal distribution $$$N(0,1)$$$ has a probability density function given by:

$$p(x) = \frac{1}{\sqrt{2\pi}}e^{-x/2}$$

#### Chi distribution definitions

Take $$$x \sim N(0,1)$$$ then $$$x^2 \sim \chi^2(1)$$$. 

Take $$$x_i \sim N(0,1)$$$ then $$$ \sum_{i=1}^k x_i^2 \sim \chi^2(k)$$$. 

##### Chi-squared test example

> Example 

#### T distribution definition

Take $$$x \sim N(0,1)$$$ and $$$ y \sim \chi^2(r) $$$.  Then $$$ \frac{x}{\sqrt{v^2/r}} \sim t(r)$$$. 

#### F distribution definition

Take $$$x \sim \chi^2(p)$$$ and $$$y \sim \chi^2(q)$$$ then $$$ \frac{x/p}{y/q} \sim F(p,q)$$$. 

### T-test regression example 

### F-test example 