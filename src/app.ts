// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import { Earth } from './earth'
import {Tree} from './tree';
import {Forest} from './forest'
import {Panzer} from './panzer'



export class App {

    protected scene: THREE.Scene;
    protected camera: THREE.Camera;
    protected renderer: THREE.WebGLRenderer;
    protected earth: Earth;
    protected tree: Tree;
    protected forest:  Forest;
    protected panzer: Panzer;

    constructor() {
        this.createScene();
        this.createCamera();
        this.createLight();
        this.createRenderer();
        this.createErath(this.scene)
        this.createPanzer(this.scene)
        this.forest = new Forest(this.scene, this.earth)
        this.forest.makeTrees();
        this.animate();
        document.onkeydown = (e: KeyboardEvent) =>{
            this.handleKeyDown(e)
        }
    }

    protected createScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0xf7d9aa, 5, 20);
    }

    protected createCamera() {
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

		//this.camera.position.x = 15.5	
		this.camera.position.y = 5.5
		this.camera.position.z = 12.5

		this.camera.lookAt(this.scene.position)
    }

    protected createLight() {
        var hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9)
		this.scene.add(hemisphereLight);
		var sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
		sun.position.set( 26,10,-30 );
		sun.castShadow = true;
		this.scene.add(sun);
		//Set up shadow properties for the sun light
		sun.shadow.mapSize.width = 256;
		sun.shadow.mapSize.height = 256;
		sun.shadow.camera.near = 0.5;
		sun.shadow.camera.far = 50 ;				
    }
    protected createRenderer() {
        this.renderer = new THREE.WebGLRenderer({alpha:true});//renderer with transparent backdrop
		this.renderer.setClearColor(0xfffafa, 1); 
    	this.renderer.shadowMap.enabled = true;//enable shadow
    	this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	    this.updateRendererSize();
	    document.body.appendChild(this.renderer.domElement);
	}

	protected updateRendererSize() {
	    this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	protected animate() {
	    window.requestAnimationFrame(() => this.animate());
	    this.earth.rotate();
	    this.renderer.render(this.scene, this.camera);
	}

	

	protected createErath(scene){
		this.earth = new Earth(scene);
	}

	protected createPanzer(scene){
		this.panzer = new Panzer(scene);
	}

	protected handleKeyDown(keyEvent){
		if ( keyEvent.keyCode === 37) {//left
			this.panzer.move(-0.3)
		} else if ( keyEvent.keyCode === 39) {//right
			this.panzer.move(0.3)
		}
	}
}

let app = new App();