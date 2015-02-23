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

#### T distribution definition

Take $$$x \sim N(0,1)$$$ and $$$ y \sim \chi^2(r) $$$.  Then $$$ \frac{x}{\sqrt{v^2/r}} \sim t(r)$$$. 

##### Example: Linear Regression 

#### F distribution definition

Take $$$x \sim \chi^2(p)$$$ and $$$y \sim \chi^2(q)$$$ then $$$ \frac{x/p}{y/q} \sim F(p,q)$$$. 

##### Example: F-test 

$$ \int_0^s\int_0^s\int_0^s\int_0^s \left(\frac{x_1}{s} - \frac{x_2}{s}\right)^2 + \left(\frac{y_1}{s} - \frac{y_2}{s}\right)^2 dx_1 dy_1 dx_2 dy_2 $$