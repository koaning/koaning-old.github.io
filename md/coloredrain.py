# filename = '/Users/code/Development/koaning.github.io/md/coloredrain.py'
# exec(compile(open(filename).read(), filename, 'exec'))

import bpy
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

bpy.data.scenes['Scene'].render.engine = 'CYCLES'
# bpy.data.scenes['Scene'].render.resolution_x = 2048
# bpy.data.scenes['Scene'].render.resolution_y = 1080
# bpy.data.scenes['Scene'].render.resolution_percentage = 50
# bpy.data.scenes['Scene'].render.use_antialiasing = True
# bpy.data.scenes['Scene'].render.use_full_sample = True
bpy.data.scenes['Scene'].cycles.samples = 50
bpy.data.scenes['Scene'].frame_end=25

bpy.ops.render.render(animation=True, use_viewport=True)