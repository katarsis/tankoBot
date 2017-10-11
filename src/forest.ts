// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import {Tree} from './tree'
import {Earth} from './earth'

import {Colors} from './colors';

export class Forest {
	
	protected scene: THREE.Scene;
	protected earth: Earth;
	protected treesPool=[];
	protected treesInPath=[];

	constructor(scene: THREE.Scene, earth : Earth) {
		this.scene = scene
		this.earth = earth;
	}

	public makeTrees(){
		var numTrees=36;
		var gap=6.28/36;
		for(var i=0;i<numTrees;i++){
			this.addTree(false,i*gap, true, i);
			this.addTree(false,i*gap, false, i);
		}	
	}

	protected addTree(inPath, row, isLeft, count){
		var newTree;
		var sphericalHelper = new THREE.Spherical();
		var worldRadius = 26
		var pathAngleValues=[1.52,1.57,1.62];
		if(inPath){
			if(this.treesPool.length == 0) return;
			newTree=this.treesPool.pop();
			newTree.visible=true;
			//console.log("add tree");
			this.treesInPath.push(newTree);
			sphericalHelper.set( worldRadius-0.3, pathAngleValues[row], -this.earth.getRotation().x+4 );
		}else{
			newTree = new Tree().createTree();
			var forestAreaAngle = 0;
			if(isLeft){
				forestAreaAngle = 1.68+Math.random()*0.1;
			}else{
				forestAreaAngle = 1.5-Math.random()*0.1;
			}
			sphericalHelper.set( worldRadius-0.3, forestAreaAngle, row );
		}
		newTree.position.setFromSpherical( sphericalHelper );
		var rollingGroundVector = this.earth.getPosition().clone().normalize();
		var treeVector=newTree.position.clone().normalize();
		newTree.quaternion.setFromUnitVectors(treeVector,rollingGroundVector);
		
		//newTree.rotation.z+=+-3.8*Math.PI/10;
		
		this.earth.add(newTree);
	}
}