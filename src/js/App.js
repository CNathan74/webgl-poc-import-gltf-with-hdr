import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import { ModelsManager } from "./ModelsManager";

//import FBXLoader from "three-fbx-loader";
export class App {
  constructor(canvas) {
    this.canvas = canvas
    this.models = null
    this.scene = null
    this.camera = null
    this.controls = null
    this.renderer = null

    console.log("New App created")
  }

  // Initialization
  init() {
    console.log("App init")
    this.scene = new Scene()

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    })
    this.renderer.autoClear = false
    this.renderer.shadowMap.enabled = true

    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    
    this.models = new ModelsManager()
    this.models.init()
    this.models.loadHdr('assets/textures/', 'studio_small_08_1k.hdr', this.scene, this.render)
    this.models.load((model) => {
        this.scene.add(model)
    })

    const gl = this.renderer.getContext()
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
    this.camera = new PerspectiveCamera(90, aspect, 0.01, 1000)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.camera.position.set(-300, 200, 100)
    this.camera.lookAt(0, 0, 0)
  }

  resizeRendererToDisplaySize() {
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    const needResize = this.canvas.width !== width || this.canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
    }
    return needResize
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this))

    // Update ...
    if (this.resizeRendererToDisplaySize()) {
      const gl = this.renderer.getContext()
      this.camera.aspect = gl.drawingBufferWidth / gl.drawingBufferHeight
      this.camera.updateProjectionMatrix()
    }

    const delta = this.clock.getDelta();
    if ( this.mixer ) this.mixer.update( delta );

    // Render ...
    this.render()
  }

  // Run app, load things, add listeners, ...
  run() {
    console.log("App run")
    this.animate()
  }

  // Memory management
  destroy() {
    this.scene = null
    this.models = null
    this.camera = null
    this.renderer = null

    this.controls.dispose()
    this.controls = null

    this.canvas = null
  }
}
