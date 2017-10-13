// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import {Colors} from './colors';


export class Earth {
	
	protected scene: THREE.Scene;
	protected rollingGroundSphere: THREE.Mesh;
	

	constructor(scene: THREE.Scene) {
		this.scene = scene;

		var tiers = 120
		var sides = 120

		var earthGeometry = new THREE.CylinderGeometry( 26,26, 360,tiers,sides);
		var sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xfffafa ,shading:THREE.FlatShading} )
	
		
		var vertexIndex;
		var vertexVector= new THREE.Vector3();
		var nextVertexVector= new THREE.Vector3();
		var firstVertexVector= new THREE.Vector3();
		var offset= new THREE.Vector3();
		var currentTier=1;
		var lerpValue=0.5;
		var heightValue;
		var maxHeight=0.07;
		for(var j=1;j<tiers-2;j++){
			currentTier=j;
			for(var i=0;i<sides;i++){
				vertexIndex=(currentTier*sides)+1;
				heightValue=Math.random()*0.2;
				earthGeometry.vertices[i+vertexIndex].z+=heightValue;
			}	
		}
		this.rollingGroundSphere = new THREE.Mesh( earthGeometry, sphereMaterial );
		this.rollingGroundSphere.receiveShadow = true;
		this.rollingGroundSphere.castShadow=false;
		this.rollingGroundSphere.rotation.z=-Math.PI/2;
		
		this.rollingGroundSphere.position.y=-24;
		this.rollingGroundSphere.position.z=2;
		

		this.scene.add(this.rollingGroundSphere)
	}

	public rotate(){
		this.rollingGroundSphere.rotation.x+=0.001
	}

	public getPosition(){
		return this.rollingGroundSphere.position;
	}

	public getRotation(){
		return this.rollingGroundSphere.rotation;
	}

	public add(mesh : THREE.Mesh){
		this.rollingGroundSphere.add(mesh);
	}
}