declare module 'three/examples/jsm/loaders/OBJLoader' {
    import { Loader, Object3D } from 'three';
  
    export class OBJLoader extends Loader {
      constructor();
      load(
        url: string,
        onLoad: (object: Object3D) => void,
        onProgress?: (progress: ProgressEvent) => void,
        onError?: (error: ErrorEvent) => void
      ): void;
      parse(data: string): Object3D;
    }
  }

  