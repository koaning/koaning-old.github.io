# filename = '/Users/code/Development/koaning.github.io/md/coloredrain.py'
# exec(compile(open(filename).read(), filename, 'exec'))

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

def bomb(x,y,z):
    for i in range(4):
        x = x + random.random()*2
        y = y + random.random()*2
        rot = random.random()*2*math.pi
        block(x,y,z,rot)

for z in range(2,100):
    bomb(0,0,z)

bpy.data.scenes['Scene'].render.engine = 'CYCLES'
bpy.data.scenes['Scene'].cycles.samples = 10
bpy.data.scenes['Scene'].frame_end = 5
bpy.data.scenes['Scene'].render.fps = 100

bpy.ops.render.render(animation=True, use_viewport=True)