# recursive docker performance 


### Docker Setup 

I installed a basic ubuntu docker image.

```
docker pull ubuntu
docker run -i -t ubuntu /bin/bash
```

When in docker I started my first experiment, to see if the performance would go down. From the command line I would use the python ```timeit``` module to quickly check some basic performance measures. 

###### Mac Python Results 

```
$ python3.4 -m timeit '"-".join(str(n) for n in range(100))'
10000 loops, best of 3: 37.7 usec per loop
$ python3.4 -m timeit '"-".join([str(n) for n in range(100)])'
10000 loops, best of 3: 34.2 usec per loop
$ python3.4 -m timeit '"-".join(map(str, range(100)))'
10000 loops, best of 3: 26.2 usec per loop
```

###### Docker Python Results 

```
> python3 -m timeit '"-".join(str(n) for n in range(100))'
10000 loops, best of 3: 30 usec per loop
> python3 -m timeit '"-".join([str(n) for n in range(100)])'
10000 loops, best of 3: 26.9 usec per loop
> python3 -m timeit '"-".join(map(str, range(100)))'
10000 loops, best of 3: 20.2 usec per loop
```

Huh? From within docker, my python code seems to be running faster. This is interesting. 

### Recursion 

I wonder what happens if I run a docker container from within another docker container.
`
```
python3 -m timeit '"-".join(str(n) for n in range(10000))'
python3 -m timeit '"-".join([str(n) for n in range(10000)])'
python3 -m timeit '"-".join(map(str, range(10000)))'

apt-get update
apt-get install -y docker.io 

source /etc/bash_completion.d/docker.io

[ -e /usr/lib/apt/methods/https ] || {
  apt-get update
  apt-get install apt-transport-https
}

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9

sh -c "echo deb https://get.docker.com/ubuntu docker main\
> /etc/apt/sources.list.d/docker.list"
apt-get update
apt-get install -y lxc-docker

export DOCKER_HOST=tcp://localhost:4243
export DOCKER_CERT_PATH=/Users/code/root/certs/boot2docker-vm
export DOCKER_TLS_VERIFY=1

docker pull ubuntu
docker run -i -t ubuntu /bin/bash
```