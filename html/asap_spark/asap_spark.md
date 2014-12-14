# S3 to Spark ASAP 

In this small document I will explain a quick way to get data on S3 analyzed. It borrows a lot of knowledge from these tutorials: 

- http://spark.apache.org/docs/latest/ec2-scripts.html
- http://blog.cloudera.com/blog/2014/08/how-to-use-ipython-notebook-with-apache-spark/
- http://wiki.apache.org/hadoop/AmazonS3

### Download packages and setup AWS 

```
./spark-ec2 -k hadoop_env -i ~/.ssh/hadoop_env -z us-east-1b -s 6 launch sparkle
```

You can then check the master node name form the command line. 

```
./spark-ec2 get-master sparkle
```

Using this information you can then ssh into the machine.

```
ssh -i ~/.ssh/hadoop_env root@<master node name>  
```

Then go to the spark folder and run a spark shell.

```
/root/spark/bin/pyspark
>>> sc
<pyspark.context.SparkContext object at 0x149f410>
```

We should be able to see this Spark job now running through the web ui. 

```
<master node ip>:8080
```

> You can also get additional information via ```cat spark-ec2/slaves``` and ```cat spark-ec2/cluster-url```.

### Getting the iPython Notebook running with Spark

We first need to create a profile for ipython. 

```
ipython profile create pyspark
```

This should have created the profile directory ```~/.ipython/profile_pyspark/```. Edit the file ```~/.ipython/profile_pyspark/ipython_notebook_config.py```.

```
vi ~/.ipython/profile_pyspark/ipython_notebook_config.py
```

Make sure the following settings are set. 

```
c.NoteBookApp.ip = '*'
c.NotebookApp.port = 8888
c.NotebookApp.enable_mathjax = True
c.NotebookApp.open_browser = False
```

All of these settings are there. You don't need to add lines, you can just uncomment items in the file. 

> **Note:** You will need to add this port to the security group in aws, TCP 8888 anywhere. 

Finally, create one more file.

```
vi ~/.ipython/profile_pyspark/startup/00-pyspark-setup.py
```

With the following contents. 

```
import os
import sys
 
spark_home = os.environ.get('SPARK_HOME', None)
if not spark_home:
	raise ValueError('SPARK_HOME environment variable is not set')
sys.path.insert(0, os.path.join(spark_home, 'python'))
sys.path.insert(0, os.path.join(spark_home, 'python/lib/py4j-0.8.1-src.zip'))
execfile(os.path.join(spark_home, 'python/pyspark/shell.py'))
```

Then we need to add somethign to ```.bash_profile```

```
vi ~/.bash_profile
```

Just make sure the following line is present. 

```
export SPARK_HOME='/root/spark'
```

#### Result 

If you now type

```
ipython notebook --profile=pyspark
```

you should be able to confirm that there is an ipython notebook online at 

```
<master node>:8888
```

And you should be able to type and see the following: 

![Alt text](confirm.png "Optional title")

You can also confirm that there is a ```PySpark``` instance working by looking it up on ```<master node>:8080```. 

#### Doesn't work. Oh no! 

Should this not work, there are a few things you should check:  

- Check the ```~/.ipython/profile_pyspark/startup/00-pyspark-setup.py``` file for indentation. This might go wrong when copy pasting into vi. 
- Make sure you source the new ```.bash_profile```. You can check if the new profile is up via ```echo $SPARK_HOME```.
- This tutorial might be slightly dated. My version had ```py4j-0.8.1-src.zip``` in ```/root/spark/python/lib/```. If this file has a different name, make sure that the ```~/.ipython/profile_pyspark/startup/00-pyspark-setup.py``` file is updated accordingly on line 8.  
- Check the aws security group for your spark master node. If you didn't add it, make sure that TCP is open on port 8888 for anywhere. 

### S3 to hdfs 

So we have Spark running on AWS. We now need to be able to access data on S3 with it. 

```
sudo -u hdfs hdfs dfs -chmod -R 777 /user/admin
sudo -u hdfs hadoop distcp s3n://AKIAIHZPQJDD5V2PB4QA:i+GwuwVJUbCB2LGzqGoohKxnvKbDtDdJJ1RHJmHs@gogokino/ /user/admin/wowdata/
```
> In the future, you might want to make sure your s3 files arent containing ```:``` characters. This is something that the hadoop file system will not like. 

```
sc.textFile('s3n://AKIAIHZPQJDD5V2PB4QA:i+GwuwVJUbCB2LGzqGoohKxnvKbDtDdJJ1RHJmHs/gogokino/0001.csv').first()
```

```
/root/ephemeral-hdfs/bin/hadoop fs -get s3n://AKIAIHZPQJDD5V2PB4QA:i+GwuwVJUbCB2LGzqGoohKxnvKbDtDdJJ1RHJmHs/gogokino/0001.csv /0001.csv
```

```
/root/ephemeral-hdfs/bin/hadoop fs -fs s3n://AKIAIHZPQJDD5V2PB4QA:i+GwuwVJUbCB2LGzqGoohKxnvKbDtDdJJ1RHJmHs@gogokino -ls /
```

```
sc.textFile("s3n://AKIAIHZPQJDD5V2PB4QA:i+GwuwVJUbCB2LGzqGoohKxnvKbDtDdJJ1RHJmHs@gogokino/firstdata").first()
```

### More Python Tooling 

We are not using virtual environments for python. This is due ot the fact that the machines will be used as throw-away data crunchers. The moment we are done with analyzing, we can stop spending money on the servers. That's not to say that we might want to have some more python tooling available to us (numpy, scikit, etc). 

```
yum -y install python-pip
```

#### Done?

```
./spark-ec2 destroy sparkle
```