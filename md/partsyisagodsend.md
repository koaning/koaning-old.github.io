# Patsy Formulas from Pandas to Sklearn

I've always liked R because of it's sugar for statisticians. It was the first tool I knew that had both support for dataframes and formulas, which allows you to do things like this:

```
library(randomForest) 

formulas = c(
  as.formula("Species ~ Sepal.Length"),
  as.formula("Species ~ Sepal.Length + Sepal.Width"),
  as.formula("Species ~ Sepal.Length + Sepal.Width + Petal.Length"),
  as.formula("Species ~ Sepal.Length + Sepal.Width + Petal.Length + Petal.Width")
)

for(formula in formulas){
  print(randomForest(formula, data=iris))
}
```

Formula objects in R are nice to play with. I am able to compare different inputs for my randomforest in a very readable manner. I don't have to worry about the fact that ```Species``` is a factor and as a developer I don't have to worry about casting it to dummy vectors that the machine learning algorithm can understand. R, and its formula class, are doing this work for me. 

This was my main problem when I started using pandas and sklearn. When you are classifying with sklearn, you need to represent classes as (0,1) integer arrays and you would need to write code that does the casting. The sklearn api has support for this, but I've always missed the convenient R api for this sort of thing. 

### Enter Patsy 

Thankfully, I've come across a nice packages called ```patsy``` which solves exactly this problem. 

```
import numpy as np 
import pandas as pd 
import patsy
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("https://raw.githubusercontent.com/pydata/pandas/master/pandas/tests/data/iris.csv")
y,X = patsy.dmatrices("Name ~ SepalLength + SepalWidth + PetalLength + PetalWidth", df)
```

Apon inspection of ```y``` you can clearly see that it has done the assigining of vectors appropriately. 

```
> y
DesignMatrix with shape (150, 3)
  Name[Iris-setosa]  Name[Iris-versicolor]  Name[Iris-virginica]
                  1                      0                     0
                  1                      0                     0
                  1                      0                     0
                  1                      0                     0
                  1                      0                     0
                  1                      0                     0
                  1                      0                     0
```

Just like R, it will have also added an intercept for the ```X``` data. 

```
> X
DesignMatrix with shape (150, 5)
  Intercept  SepalLength  SepalWidth  PetalLength  PetalWidth
          1          5.1         3.5          1.4         0.2
          1          4.9         3.0          1.4         0.2
          1          4.7         3.2          1.3         0.2
          1          4.6         3.1          1.5         0.2
          1          5.0         3.6          1.4         0.2
120 rows omitted]
  Terms:
    'Intercept' (column 0)
    'SepalLength' (column 1)
    'SepalWidth' (column 2)
    'PetalLength' (column 3)
    'PetalWidth' (column 4)
```

And just like that, you are able to pass this to a sklearn classification algorithm without needing to do any mental effort yourself. 

```
clf = RandomForestClassifier()
clf.fit(X,y)
```

No errors. Neat. We can then easily use helper functions in sklearn to show us the confusion matrix. 

```
from sklearn.metrics import confusion_matrix
confusion_matrix(np.argmax(y, axis=1), np.argmax(clf.predict(X), axis=1))
```

Python is really gaining on R.