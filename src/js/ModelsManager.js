import {EquirectangularReflectionMapping} from "three";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

export class ModelsManager {
    constructor () {
        this.loaderFbx = null
        this.loaderGltf = null
    }

    init() {
        this.loaderFbx = new FBXLoader()
        this.loaderGltf = new GLTFLoader()
        this.models = new Array()
    }
    

    
    load(callback) {
      //this.loadFbx('assets/models/fbx/Voiture_Exterieur_AnimationRoue_V00.fbx', callback)
      this.loadGltf('assets/models/gltf/Configurateur_VoitureExterieur_04.gltf', callback)
    }

    loadFbx(fbxPath, callback) {
        this.loaderFbx.load( 
          fbxPath, 
          ( fbx ) => {    
            callback(fbx)     
          });
    }

    loadGltf(gltfPath, callback) {
      this.loaderGltf.load( 
        gltfPath, 
        ( gltf ) => {    
          callback(gltf.scene)     
        });
  }

    loadHdr(path, textureName, scene, render) {
      new RGBELoader()
					.setPath( path )
					.load( textureName, function ( texture ) {

						texture.mapping = EquirectangularReflectionMapping;

						scene.background = texture;
						scene.environment = texture;

						render();
					} );
    }


    dispose() {
      this.loaderFbx = null
      this.models = {}
    }
}