import * as THREE from 'three'


export class Panzer {
	protected scene: THREE.Scene;
	protected panzerMesh : THREE.Mesh;

	constructor(scene : THREE.Scene) {
		this.scene = scene;
		var panzerGeometry = new THREE.BoxGeometry( 1,1, 2);

		var panzerMaterial = new THREE.MeshStandardMaterial( { color: 0xfffafa ,shading:THREE.FlatShading} )
		this.panzerMesh =  new THREE.Mesh( panzerGeometry, panzerMaterial );
		this.panzerMesh.position.y =2
		this.panzerMesh.position.z =5
		this.scene.add(this.panzerMesh)
	}
}
