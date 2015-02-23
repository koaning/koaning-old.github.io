# Provisioning for Data Science with Docker 

This document is meant for people who have very little experience with docker but would want to use it to start up containers for their data science work. I will explain a step by step guide on how to get started with provisioning docker on a mac as well as explain how to get the latest release of the jupyter project running. 

### Getting Docker to Run 

```
> docker run -i -t ubuntu bash
```

You are now in a Docker container. You can now run anything you could run in a normal ubuntu machine. The `-i -t` flags tells docker to start up a pseudo-terminal and keep stdin open. You can enter `exit` to exit the shell. 

This is a bare minimum ubuntu container, so in this tutorial we will need to install some tools that we might need. Later I will show how we might circumvent this. 

### iPython Notebook to the Docker 

I will first explain how to connect to docker before explaining how to connect to a running instance of a python notebook. I have two `boot2docker` terminals open. I first check what the boot2docker ip is. 

##### boot2docker I: hosting a file in docker

```
> docker run -p 8888:8888 -i -t ubuntu bash
root@4e9a00035e7e: apt-get install -y python 
root@4e9a00035e7e: echo "moar docker, moar profit?" > index.html
root@4e9a00035e7e: python -m SimpleHTTPServer 8888
```

On the container I've just created a small `index.html` which is being hosted via `python -m SimpleHTTPServer` on port 5000 of the docker container. Because I've used the `-p 8888:8888` flag I'll be able to connect a port on my local machine to a port on docker. Before I can do that, I'll need to know where to point my browser to. 

##### boot2docker II: check status

```
> boot2docker ip  
The VM's Host only interface IP address is: 192.168.59.103
> docker ps
CONTAINER ID        IMAGE                    COMMAND             STATUS              PORTS
ubuntu:latest            "bash"              Up 4 minutes        0.0.0.0:8888->8888/tcp   
```

The boot2docker app on mac is actually within a VM. The VM can communicate with the outside world via an IP adress and this needs to be varified via `boot2docker ip`. We can check the port we need to connect to via `docker ps`, which looks at all the running processes (I've summerized my output to only show relevant info, you should see more info listed). 

In this case, I'd connect to `192.168.59.103:8888` to be able to see `moar docker, moar profit` in my browser on my desktop.

#### Installing iPython Notebook

We would connect to an ipython notebook via a similar method, although on this container we would first need to install some extra software. 

```
root@b09c049e58ce: apt-get update
root@b09c049e58ce: apt-get install -y python python-pip python-dev python-setuptools libzmq-dev
root@b09c049e58ce: pip install ipython[all]
root@b09c049e58ce: ipython notebook --no-browser --port 8888 --ip=*
```

The container is provisioned now. The notebook is accessible via `192.168.59.103:8888`. Note that at this moment we could also install any dependency that we might have for python via pip to get it to work in the notebook as well. 

Congratulations, we've just got the notebook working. Now all we need is a method of getting data on the container.

### Saving progress 

When we exit the container and then rerun we will notice that we will no longer have ipython installed. That is because we didn't commit any change to the container. 

The easiest way to create a new container an old one is the use of a dockerfile. This is a file that contains commands that need to be run, comparable to how ansible works. 

##### Dockerfile 

```
FROM ipython/scipystack

RUN mkdir -p /notebooks
ADD . /notebooks

WORKDIR /notebooks
EXPOSE 8888
CMD ipython notebook --ip=0.0.0.0 --no-browser
```

```
docker build -t vincent/notebook .
docker run -p 8888:8888 vincent/notebook
```

### Sharing Data with a Container 

Sharing data has become very easy if you specify a folder on your local path. Suppose that your username is `username`. Then first you need to create a folder and some data that you'd want to share. 

```
> pwd
/Users/username
> mkdir docker-shared
> cd docker-shared/
> echo "this file should be viewable" > file.txt
> pwd
/Users/code/docker-shared
```

Then we need to let docker know about this folder and file. 

```
$ docker run -v /Users/code/docker-shared:/src -i -t ubuntu bash
root@6e075cb90112: cd src
root@6e075cb90112:/src: ls
file.txt
root@6e075cb90112:/src: head file.txt
this file should be viewable
```

### Automating 

### Jupyter 