# filename = '/Users/code/Development/koaning.github.io/md/blendersampling.py'
# exec(compile(open(filename).read(), filename, 'exec'))
# most uniform sampling

import math
import numpy as np 

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

def setMaterial(ob, mat):
    me = ob.data
    me.materials.append(mat)

def create_flat():
    bpy.ops.mesh.primitive_cube_add( radius=0.5, location = (0,0,0))
    bpy.ops.rigidbody.object_add()
    bpy.context.active_object.rigid_body.type = 'PASSIVE'
    bpy.ops.transform.resize(value=(50,50,1))
    bpy.context.selected_objects[0].name = 'Land'

def select_type(meshtype="Cube"):
    for ob in bpy.context.scene.objects:
        ob.select = ob.type == 'MESH' and ob.name.startswith(meshtype)

def select_name(meshname="Land"):
    for ob in bpy.context.scene.objects:
        ob.select = ob.name == meshname

def deltype(meshtype="Cube"):
    select_type(meshtype)
    bpy.ops.object.delete()

# deltype() 

# create_flat()
# numcubes = 8
# rcubes = 0.5
# for x in range(numcubes):
#     for y in range(numcubes):
#         for z in range(numcubes):
#             bpy.ops.mesh.primitive_cube_add(
#                 radius=rcubes, location = (x,y,z + 50)
#             )
#             bpy.ops.rigidbody.object_add()

# random cuts in the square 

deltype('Plane') 
deltype('Cube') 
deltype('Land') 
create_flat()

bpy.ops.mesh.primitive_cube_add(
    radius=4, location = (4,4,4 + 50)
)
bpy.ops.rigidbody.object_add()

rotation_axis = np.random.rand(3)
rotation = math.pi*2 * np.random.rand(1)
bpy.ops.mesh.primitive_plane_add( radius=16, location = (4,4,4 + 50) )
bpy.ops.transform.rotate(value=rotation, axis=rotation_axis)

def center(mesh):
    l = len(mesh.data.vertices)
    mat = np.zeros((l,3))
    for v in range(l):
        print(v.co)

# for ob in bpy.context.scene.objects:
#     ob.select = ob.type == 'MESH' and ob.name.startswith("Cube")
# bpy.ops.object.modifier_add(type="BOOLEAN")
# bpy.data.objects['Cube.001'].modifiers['Boolean'].operation = 'DIFFERENCE'
# bpy.data.objects['Cube.001'].modifiers['Boolean'].operation = 'INTERSECT'

def cut_plane(mesh, plane):
    bpy.context.scene.objects.active = mesh
    bpy.ops.object.modifier_add(type="BOOLEAN")
    obj.modifiers['Boolean'].operation = 'DIFFERENCE'
    obj.modifiers['Boolean'].object = bpy.context.scene.objects['Plane']
    duplicate = bpy.ops.object.duplicate_move()
    obj.modifiers['Boolean'].operation = 'INTERSECT'

def rand_cut(obj):
    rotation_axis = np.random.rand(3)
    rotation = math.pi*2 * np.random.rand(1)
    bpy.ops.mesh.primitive_plane_add( radius=16, location = (4,4,4 + 50) )
    bpy.ops.transform.rotate(value=rotation, axis=rotation_axis)

    obj.select = True
    bpy.ops.object.modifier_add(type="BOOLEAN")
    obj.modifiers['Boolean'].operation = 'DIFFERENCE'
    obj.modifiers['Boolean'].object = bpy.context.scene.objects['Plane']
    bpy.ops.object.duplicate_move()
    obj.modifiers['Boolean'].operation = 'INTERSECT'

# rand_cut(bpy.data.objects['Cube'])