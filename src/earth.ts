// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import {Colors} from './colors';


export class Earth {
	
	protected scene: THREE.Scene;
	protected mesh: THREE.Mesh
	

	constructor(scene: THREE.Scene) {
		this.scene = scene;

		var geom = new THREE.CylinderGeometry(600,600,800,40,10);
	
		// rotate the geometry on the x axis
		geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
		
		// create the material 
		var mat = new THREE.MeshPhongMaterial({
			color:Colors.blue,
			transparent:true,
			opacity:.6,
			shading:THREE.FlatShading,
		});

		// To create an object in Three.js, we have to create a mesh 
		// which is a combination of a geometry and some material
		this.mesh = new THREE.Mesh(geom, mat);

		// Allow the sea to receive shadows
		this.mesh.receiveShadow = true; 
		this.mesh.position.y = -600;
		this.scene.add(this.mesh)

	}
}