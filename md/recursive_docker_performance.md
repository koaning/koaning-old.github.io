# recursive docker performance 

> if you want to understand recursion, you need to understand recursion 

I have a mac with boot2docker. I build a simple ubuntu container that contains python and docker. I will run benchmark tests in python and then run another docker inside the previous one to see where the performance drops. 

I was slightly flabbergasted to find out that running python in ubuntu is actually faster than running python on my mac. 

#### Setup 

I first open a simple ubuntu container. 

```
$ docker run -t -i ubuntu /bin/bash
```

I then install docker and python. 

```
root@618e2863f651: apt-get update
root@618e2863f651: apt-get install -y docker.io python2.7 
root@618e2863f651: exit 
```

Next, I commit the changes into a new container and push this to dockerhub such that I can easily pull it in. 

```
$ docker ps -a
CONTAINER ID        IMAGE               COMMAND                STATUS                           NAMES
618e2863f651        ubuntu:latest       "/bin/bash"            Exited (0) 2 minutes ago         boring_sinoussi      
$ docker commit boring_sinoussi koaning/recursion:0.1
$ docker push koaning/recursion:0.1
```

##### Benchmarks 

The following code will be run to assert the python benchmark. 

```
python2.7 -m timeit '"-".join(str(n) for n in range(100000))'
python2.7 -m timeit 'import random; sum([random.random() for i in range(500000)])'
python2.7 -m timeit 'import random; import math; sum([math.sqrt(random.random()) for i in range(500000)])'
```

This means that from within the containers that has docker installed I can run docker recursively via: 

```
docker run -t -i koaning/recursion:0.1 /bin/bash
python2.7 -m timeit '"-".join(str(n) for n in range(100000))'
python2.7 -m timeit 'import random; sum([random.random() for i in range(500000)])'
python2.7 -m timeit 'import random; import math; sum([math.sqrt(random.random()) for i in range(500000)])'
```

#### Results 

#### Conclusion 