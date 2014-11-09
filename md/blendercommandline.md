# rendering disasters in blender

### blender install on a server 

```

```

### blender python script 

```
# filename = '/Users/code/Development/koaning.github.io/md/coloredrain.py'
# exec(compile(open(filename).read(), filename, 'exec'))

import math 
import random
import uuid

def create_flat():
    bpy.ops.mesh.primitive_cube_add( radius=0.5, location = (0,0,-0.25))
    bpy.ops.rigidbody.object_add()
    bpy.context.active_object.rigid_body.type = 'PASSIVE'
    bpy.ops.transform.resize(value=(40,40,1))
    bpy.context.selected_objects[0].name = 'Land'

def select_type(meshtype="Cube"):
    for ob in bpy.context.scene.objects:
        ob.select = ob.type == 'MESH' and ob.name.startswith(meshtype)

def deltype(meshtype="Cube"):
    select_type(meshtype)
    bpy.ops.object.delete()

def makeMaterial(name, diffuse, specular, alpha):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = diffuse
    mat.diffuse_shader = 'LAMBERT' 
    mat.diffuse_intensity = 1.0 
    mat.specular_color = specular
    mat.specular_shader = 'COOKTORR'
    mat.specular_intensity = 0.5
    mat.alpha = alpha
    mat.ambient = 1
    return mat

def randomMaterial():
	return makeMaterial('mat' + uuid.uuid4().hex[0:6], (random.random(),random.random(),random.random()), (1,1,1),1 )

def setMaterial(ob, mat):
    me = ob.data
    me.materials.append(mat)

deltype()
deltype("Camera")
deltype("Land")
bpy.data.lamps['Point'].energy = 10

# bpy.data.lamps['Point'].energy = 10

def block(x,y,z,rot):
	bpy.ops.mesh.primitive_cube_add( radius=random.random(), location = (x,y,z/2.0) )
	bpy.ops.rigidbody.object_add()
	bpy.context.active_object.rigid_body.type = 'ACTIVE'
	rand_axis = (random.random(),random.random(),random.random())
	bpy.ops.transform.rotate(value=rot, axis=rand_axis)
	mat = randomMaterial()
	setMaterial(bpy.context.object, mat)

def bomb(x,y,z):
	for i in range(4):
		x = x + random.random()*2
		y = y + random.random()*2
		rot = random.random()*2*math.pi
		block(x,y,z,rot)

for z in range(2,100):
	bomb(0,0,z)

bpy.data.scenes['Scene'].frame_end=80
bpy.ops.render.render(animation=True, use_viewport=True)
```

### run this shit on blender 

```
$ blender --python /Users/code/Development/koaning.github.io/md/coloredrain.py
Color management: using fallback mode for management
ndof: 3Dx driver not found
BLF_lang_init: 'locale' data path for translations not found, continuing
Read new prefs: /Users/code/Library/Application Support/Blender/2.71/config/userpref.blend
Warning! bundled python not found and is expected on this platform. (if you built with CMake: 'install' target may have not been built)
Fatal Python error: Py_Initialize: unable to load the file system codec
ImportError: No module named 'encodings'
Abort trap: 6
```

### stuff to extract video 

There is a nice command line tool that does a lot of work for you called ```ffmpeg```, which you can download on via 

```
brew install ffmpeg
apt-get install ffmpeg
yum install ffmpeg 
```

The following command renders at 24 frames per second, takes all the images in the current folder that start with 4 digits and outpust a 1024K ```video.mpg``` file.

```
ffmpeg -r 24 -i %04d.png -vb 1024K video.mpg
```

