# filename = '/Users/code/Development/koaning.github.io/md/jenga.py'
# exec(compile(open(filename).read(), filename, 'exec'))

import math 
import numpy as np 

def create_flat():
    bpy.ops.mesh.primitive_cube_add( radius=0.5, location = (0,0,-0.25))
    bpy.ops.rigidbody.object_add()
    bpy.context.active_object.rigid_body.type = 'PASSIVE'
    bpy.ops.transform.resize(value=(20,20,1))
    bpy.context.selected_objects[0].name = 'Land'

def select_type(meshtype="Cube"):
    for ob in bpy.context.scene.objects:
        ob.select = ob.type == 'MESH' and ob.name.startswith(meshtype)

def deltype(meshtype="Cube"):
    select_type(meshtype)
    bpy.ops.object.delete()

deltype()
create_flat()

def block(x,y,z,rot):
	bpy.ops.mesh.primitive_cube_add( radius=0.45, location = (x,y,z/2.0) )
	bpy.ops.rigidbody.object_add()
	bpy.context.active_object.rigid_body.type = 'ACTIVE'
	bpy.ops.transform.resize(value=(3,0.9,0.5))
	bpy.ops.transform.rotate(value=rot, axis=(0,0,1))

def tower(x,y,height):
	for z in range(1,height):
		if z % 2 == 0: 
			rotation = 0
			block(x, y-1, z, rotation)
			block(x, y  , z, rotation)
			block(x, y+1, z, rotation)
		else:
			rotation = math.pi / 2 
			block(x-1, y, z, rotation)
			block(x  , y, z, rotation)
			block(x+1, y, z, rotation)

def bomb(x,y):
	for i in range(40):
		block(x, y, 2, 0)

for x in range(0,6):
	for y in range(0,6):
		tower(x*3.5, y*3.5, np.random.randint(30))

bomb(2,2)

# bpy.data.scenes['Scene'].frame_end=100
# bpy.ops.render.render(animation=True, use_viewport=True)