# Automated Python Rendering in Blender

In a previous post I've described how to generate objects in blender through python. In this document I will describe how to use such python scripts from the command line to render animations. I will also show how to outsource this rendering to a server so that your laptop doesn't need to suffer. 

### Blender Python Script 

This script below generates a rain of randomly sized and colored cubes. You can paste this code into the blender command line to see the result.

```
# filename: colored_rain.py

import bpy
import math 
import random
import uuid

def select_type(meshtype="Cube"):
    for ob in bpy.context.scene.objects:
        ob.select = ob.type == 'MESH' and ob.name.startswith(meshtype)

def deltype(meshtype="Cube"):
    select_type(meshtype)
    bpy.ops.object.delete()

def makeMaterial(name, diffuse, specular, alpha):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = diffuse
    mat.specular_color = specular
    mat.alpha = alpha
    return mat

def randomMaterial():
    randvec = (random.random(), random.random(), random.random())
    return makeMaterial('mat' + uuid.uuid4().hex[0:6], randvec, (1,1,1), 1)

def setMaterial(ob, mat):
    me = ob.data
    me.materials.append(mat)

deltype()

def block(x,y,z,rot):
	bpy.ops.mesh.primitive_cube_add( radius=random.random(), location = (x,y,z/2.0) )
	bpy.ops.rigidbody.object_add()
	bpy.context.active_object.rigid_body.type = 'ACTIVE'
	rand_axis = (random.random(),random.random(),random.random())
	bpy.ops.transform.rotate(value=rot, axis=rand_axis)
	setMaterial(bpy.context.object, randomMaterial())

def blocks(x,y,z):
	for i in range(4):
		x = x + random.random()*2
		y = y + random.random()*2
		rot = random.random()*2*math.pi
		block(x,y,z,rot)

for z in range(2,100):
	blocks(0,0,z)

# these are the render settings
bpy.data.scenes['Scene'].render.engine = 'CYCLES'
bpy.data.scenes['Scene'].cycles.samples = 10
bpy.data.scenes['Scene'].frame_end = 250
bpy.data.scenes['Scene'].render.fps = 100

# this command signals the actual render 
bpy.ops.render.render(animation=True, use_viewport=True)
```

The python script renders a scene, fills it with boxes, sets up a camera and applies render settings. We can click render in the blender ui but we could also use the python-api via command line to do this for us. The two main benefits are that we are not slowed down by the also rendering a GUI and that we can also use a server to do the calculation for us, leaving our working computer free to do other things. 

### Blender from the command line

#### Getting the CL to work. 

We will first need to make sure that we can run blender from the command line. If you are running this on a mac you will need to make sure your ```.bash_profile``` knows where to find the blender command. On open source operating systems you will need to do something similar unless you installed it via ```apt-get install blender```. 

```
alias blender=/Applications/blender.app/Contents/MacOS/blender
```

For more info see [this link](http://blender.stackexchange.com/questions/2078/how-to-use-blender-command-lines-in-osx). 

#### Running the CL 

The blender command line offers many opportunities to automate things. Consider the following command: 

```
$ blender -y -b -x 1 -o /some/output/dir/ --engine CYCLES --python /path/to/script/python_script.py
```

blender -y -b -x 1 -o //Users/code/Desktop/output/ --engine CYCLES --python /Users/code/Desktop/script.py


The python script contains rendering details, so blender will just run these and output them in the specified folder. This command will not prompt the user to confirm anything (via ```-y```) and it will run in the background (so no gui, via ```-b```). For morge info check the ```man blender``` command. 

### blender install on a server 

We want blender to run on a server instead of our local machine. This is better for your rendering as well as other work you might want to do on your local machine. 

You can get a cheap server at amazon or digital ocean. If you get an ubuntu image, installing blender is straightforward. 

```
apt-get -y update 
apt-get -y install blender 
```

You only need to copy the python script to the server if you want to run it. This is easy with a secure copy. 

```
scp /local/path/script.py root@<ip adres>:/server/path/script.py
```

With the script in place you then you are ready to run some commands from the command line on the server. 

###### Run python script and render to /tmp/ 

```
$ blender -y -b -x 1 -o /Users/code/Desktop/blender-output --engine CYCLES --python /Users/code/Development/koaning.github.io/md/coloredrain.py
```

###### Run python script and render to movie file


```
$ blender -y -b -x 1 -F MPEG -o /blender-out/ --engine CYCLES --python /coloredrain.py
```

For more info about the command line options for blender please check [this link](http://wiki.blender.org/index.php/Doc:2.6/Manual/Render/Command_Line).

###### background command 

You will want to run this command as a background task such that you don't need to open another terminal to see what is happening. This can be done via the ```nohup <command> &``` trick. 

```
$ nohup blender -y -b -x 1 -F MPEG -o /blender-out/ --engine CYCLES --python /coloredrain.py & 
```

You can check the render status via

```
tail nohup.out
```

### Conclusion

To conclude I would like to point out that any button in blender can be set via python as well. If you keep your mouse over a button, the python code that's needed appears. That also means that you can code the render settings. Cheaper severs will not be able to render as quickly as inexpensive servers so you might need to be mindful of what you do.  

You are giving the server an expensive calculation to do, especially when you are running things on high settings. 
