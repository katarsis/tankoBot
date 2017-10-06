// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import {Colors} from './colors';


export class Tree {
	
	protected scene: THREE.Scene;
	protected mesh: THREE.Mesh
	

	constructor(scene: THREE.Scene) {
		this.scene = scene;

		this.scene.add(this.createTree())

	}

	protected createTree(){
		var sides=8;
		var tiers=6;
		var scalarMultiplier=(Math.random()*(0.25-0.1))+0.05;
		var midPointVector= new THREE.Vector3();
		var vertexVector= new THREE.Vector3();
		var treeGeometry = new THREE.ConeGeometry( 0.5, 1, sides, tiers);
		var treeMaterial = new THREE.MeshStandardMaterial( { color: 0x33ff33,shading:THREE.FlatShading  } );
		var offset;
		midPointVector=treeGeometry.vertices[0].clone();
		var currentTier=0;
		var vertexIndex;
		this.blowUpTree(treeGeometry.vertices,sides,0,scalarMultiplier,false);
		this.tightenTree(treeGeometry.vertices,sides,1);
		this.blowUpTree(treeGeometry.vertices,sides,2,scalarMultiplier*1.1,true);
		this.tightenTree(treeGeometry.vertices,sides,3);
		this.blowUpTree(treeGeometry.vertices,sides,4,scalarMultiplier*1.2,false);
		this.tightenTree(treeGeometry.vertices,sides,5);
		var treeTop = new THREE.Mesh( treeGeometry, treeMaterial );
		treeTop.castShadow=true;
		treeTop.receiveShadow=false;
		treeTop.position.y=0.9;
		treeTop.rotation.y=(Math.random()*(Math.PI));
		var treeTrunkGeometry = new THREE.CylinderGeometry( 0.1, 0.1,0.5);
		var trunkMaterial = new THREE.MeshStandardMaterial( { color: 0x886633,shading:THREE.FlatShading  } );
		var treeTrunk = new THREE.Mesh( treeTrunkGeometry, trunkMaterial );
		treeTrunk.position.y=0.25;
		var tree =new THREE.Object3D();
		tree.add(treeTrunk);
		tree.add(treeTop);
		return tree;
	}

	protected blowUpTree(vertices,sides,currentTier,scalarMultiplier,odd){
		var vertexIndex;
		var vertexVector= new THREE.Vector3();
		var midPointVector=vertices[0].clone();
		var offset;
		for(var i=0;i<sides;i++){
			vertexIndex=(currentTier*sides)+1;
			vertexVector=vertices[i+vertexIndex].clone();
			midPointVector.y=vertexVector.y;
			offset=vertexVector.sub(midPointVector);
			if(odd){
				if(i%2===0){
					offset.normalize().multiplyScalar(scalarMultiplier/6);
					vertices[i+vertexIndex].add(offset);
				}else{
					offset.normalize().multiplyScalar(scalarMultiplier);
					vertices[i+vertexIndex].add(offset);
					vertices[i+vertexIndex].y=vertices[i+vertexIndex+sides].y+0.05;
				}
			}else{
				if(i%2!==0){
					offset.normalize().multiplyScalar(scalarMultiplier/6);
					vertices[i+vertexIndex].add(offset);
				}else{
					offset.normalize().multiplyScalar(scalarMultiplier);
					vertices[i+vertexIndex].add(offset);
					vertices[i+vertexIndex].y=vertices[i+vertexIndex+sides].y+0.05;
				}
			}
		}
	}

	protected tightenTree(vertices,sides,currentTier){
		var vertexIndex;
		var vertexVector= new THREE.Vector3();
		var midPointVector=vertices[0].clone();
		var offset;
		for(var i=0;i<sides;i++){
			vertexIndex=(currentTier*sides)+1;
			vertexVector=vertices[i+vertexIndex].clone();
			midPointVector.y=vertexVector.y;
			offset=vertexVector.sub(midPointVector);
			offset.normalize().multiplyScalar(0.06);
			vertices[i+vertexIndex].sub(offset);
		}
	}
}