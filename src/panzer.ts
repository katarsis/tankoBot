import * as THREE from 'three'


export class Panzer {
	protected scene: THREE.Scene;
	protected panzerMesh : THREE.Mesh;
	protected panzer: THREE.Object3D;

	constructor(scene : THREE.Scene) {
		this.scene = scene;
		var panzerGeometry = new THREE.BoxGeometry( 1,1, 2);

		var panzerMaterial = new THREE.MeshStandardMaterial( { color: 0xfffafa ,shading:THREE.FlatShading} )

		panzerGeometry.vertices[5].z +=-0.4 
		panzerGeometry.vertices[5].y +=-0.5
		panzerGeometry.vertices[0].z +=-0.4 
		panzerGeometry.vertices[0].y +=-0.5
		panzerGeometry.vertices[4].z +=0.4 
		panzerGeometry.vertices[4].y +=-0.5
		panzerGeometry.vertices[1].z +=0.4 
		panzerGeometry.vertices[1].y +=-0.5
		
		this.panzerMesh =  new THREE.Mesh( panzerGeometry, panzerMaterial );
		this.panzerMesh.position.y =1.9
		this.panzerMesh.position.z =8
		this.panzerMesh.rotation.x = Math.PI/360*10

		var panzerTowerGeom = new THREE.BoxGeometry( 0.6,0.2, 0.5);
		var panzerTowerMesh =  new THREE.Mesh( panzerTowerGeom, panzerMaterial );
		panzerTowerMesh.position.y=2
		panzerTowerMesh.position.z=8

		var panzerGunGeom = new THREE.CylinderGeometry( 0.05,0.02, 2);
		var panzerGunMesh =  new THREE.Mesh( panzerGunGeom, panzerMaterial );
		panzerGunMesh.position.y=2
		panzerGunMesh.position.z=7
		panzerGunMesh.rotation.x = Math.PI/360*180

		var panzerLukGeom = new THREE.CylinderGeometry( 0.1,0.1, 0.1);
		var panzerLukMesh =  new THREE.Mesh( panzerLukGeom, panzerMaterial );
		panzerLukMesh.position.y=2.2
		panzerLukMesh.position.z=8.15
		panzerLukMesh.position.x=0.1

		var panzerGus1Geom = new THREE.BoxGeometry( 0.2, 1, 2);
		var panzerGus1Mesh = new THREE.Mesh( panzerGus1Geom, panzerMaterial );
		panzerGus1Mesh.position.y=1.5
		panzerGus1Mesh.position.x=0.5
		panzerGus1Mesh.position.z=8
		panzerGus1Mesh.rotation.x = Math.PI/360*10

		var panzerGus2Geom = new THREE.BoxGeometry( 0.2, 1, 2);
		var panzerGus2Mesh = new THREE.Mesh( panzerGus2Geom, panzerMaterial );
		panzerGus2Mesh.position.y=1.5
		panzerGus2Mesh.position.x=-.5
		panzerGus2Mesh.position.z=8
		panzerGus2Mesh.rotation.x = Math.PI/360*10
		

		this.panzer = new THREE.Object3D();
		this.panzer.add(panzerTowerMesh)
		this.panzer.add(panzerGunMesh)
		this.panzer.add(panzerLukMesh)
		this.panzer.add(panzerGus1Mesh)
		this.panzer.add(panzerGus2Mesh)
		this.panzer.add(this.panzerMesh)
		this.panzer.scale.y =0.8
		this.panzer.rotation.x = -Math.PI/360*5
		this.scene.add(this.panzer)
	}

	public getPosition(){
		return this.panzer.position;
	}

	public move(movement){
		this.panzer.position.x += movement
	}
}
