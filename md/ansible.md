# Ansible Data Science Setup 

### Install 

Let's install ansible first. 

```
$ pip install ansible 
```

You can confirm that this installation has worked when the following is recognized in bash:

```
$ ansible 
```
### Local Ansible 

You can use ansible to provision linux machines, including your own machine. To do this, start by making a folder that contains two files; ```hosts``` and ```playbook.yml```. 

###### folder structure

```
folder/ 
	hosts
	playbook.yml
```

###### hosts file 

This file contains all the hosts that ansible will contact. 

```
[local]
127.0.0.1
```
###### playbook.yml file

This file contains all the tasks that ansible will execute. 

```
- hosts: local
  user: root
  tasks:
    - name: write to a file
      shell: echo isworking > /tmp/confirm
```

###### run 

When all these files are in place, run the following command from the folder. 

```
$ ansible-playbook -i hosts playbook.yml --connection=local
```

Ansible will take all the machines that are described under ```[local]``` in the hosts file and run all tasks that are associated with it. In our simple example we are giving the computer a shell task to make a new file at ```tmp/confirm``` that has the text ```isworking``` in it. We can confirm that the file has been made via the following command. 

```
$ head /tmp/confirm
isworking 
```

Ansible is flexible, it can also use predefined variables in the install scripts. 

###### playbook.yml 
```
- hosts: local
  user: root
  vars:
    - foo: Hello There World
  tasks:
    - name: write to a file
      shell: echo ``{{foo}}`` > /tmp/confirm
```

If you are using a mac, you can use ansible to get your machine to talk by changing the ansible script and by running the ansible command again. 

###### playbook.yml 
```
- hosts: local
  user: root
  vars:
    - foo: Hello There Ansible Is Working
  tasks:
    - name: speak
      shell: say ``{{foo}}``
```

### External Ansible 

Ansible can also be used to run the same commands but on an external server. If we change the ```hosts``` file to contain not the local IP adress but the external server we want to access then we can run the same commands. 

###### hosts
```
[droplets]
37.139.10.170
```

###### playbook.yml

```
- hosts: droplets
  user: root
  sudo: true
  vars:
    - foo: Hello There Ansible
  tasks:
    - name: write to a file
      shell: echo ``{{foo}}`` > /tmp/confirm
```

###### shell command 

```
$ ssh root@37.139.10.170
root@37.139.10.170's password:
root@37.139.10.170:~# head /tmp/confirm
Hello There Ansible
```

### Provisioning for Data Science @ Digital Ocean 

A possible use case for anisble would be to provision a server with all the data science tools you would want. You might only need such a heavy server to run simulations over the weekend and thus it can be economic to have install scripts ready. 


### Provisioning for Data Science @ Amazon