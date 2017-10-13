// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import {Tree} from './tree'
import {Earth} from './earth'
import {Colors} from './colors';
import {Cylindrical} from 'three/src/math/Cylindrical'

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
		var numTrees=360;
		var gap=6.28/360;
		for(var i=0;i<numTrees;i++){
			this.addTree(false,i*gap, i);
		}	
	}

	protected addTree(inPath, row,  count){
		var newTree;
		var cylindricalHelper = new Cylindrical();
		var worldRadius = 26
		var pathAngleValues=[1.52,1.57,1.62];
		if(inPath){
			if(this.treesPool.length == 0) return;
			newTree=this.treesPool.pop();
			newTree.visible=true;
			this.treesInPath.push(newTree);
			cylindricalHelper.set( worldRadius-0.3, pathAngleValues[row], -this.earth.getRotation().x+4 );
		}else{
			newTree = new Tree().createTree();
			var forestAreaAngle = 0;
			var distant = Math.random()*40
			cylindricalHelper.set( worldRadius-0.3, row, -20 +distant);
		}
		newTree.position.setFromCylindrical( cylindricalHelper );
		var rollingGroundVector = this.earth.getPosition().clone().normalize();
		var treeVector=newTree.position.clone().normalize();
		newTree.quaternion.setFromUnitVectors(treeVector,rollingGroundVector);
		
		newTree.rotation.z+=+-0.1*Math.PI/10;
		
		this.earth.add(newTree);
	}
}