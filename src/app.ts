// add styles
import './style.css'
// three.js
import * as THREE from 'three'
import { Earth } from './earth'


export class App {

    protected scene: THREE.Scene;
    protected camera: THREE.Camera;
    protected renderer: THREE.WebGLRenderer;
    protected earth: Earth;

    constructor() {
        this.createScene();
        this.createCamera();
        this.createLight();
        this.createSimpleMesh();
        this.createRenderer();
        this.createErath(this.scene)
        this.animate();
    }

    protected createScene() {
        this.scene = new THREE.Scene();

    }

    protected createCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    protected createLight() {
        const ambient = new THREE.AmbientLight(0xffffff);

        this.scene.add(ambient);
    }
    protected createRenderer() {
	    this.renderer = new THREE.WebGLRenderer();
	    this.updateRendererSize();
	    document.body.appendChild(this.renderer.domElement);
	}

	protected updateRendererSize() {
	    this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	protected animate() {
	    window.requestAnimationFrame(() => this.animate());

	    this.renderer.render(this.scene, this.camera);
	}

	protected createSimpleMesh() {

		// add axis to the scene
		let axis = new THREE.AxisHelper(10)

		this.scene.add(axis)

		// add lights
		let light = new THREE.DirectionalLight(0xffffff, 1.0)

		light.position.set(100, 100, 100)

		this.scene.add(light)

		let light2 = new THREE.DirectionalLight(0xffffff, 1.0)

		light2.position.set(-100, 100, -100)

		this.scene.add(light2)

		let material = new THREE.MeshBasicMaterial({
			color: 0xaaaaaa,
			wireframe: true
		})

		// create a box and add it to the scene
		let box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)

		this.scene.add(box)

		box.position.x = 0.5
		box.rotation.y = 0.5

		this.camera.position.x = 5
		this.camera.position.y = 5
		this.camera.position.z = 5

		this.camera.lookAt(this.scene.position)
	}

	protected createErath(scene){
		this.earth = new Earth(scene);
	}
}

let app = new App();