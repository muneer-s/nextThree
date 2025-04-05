import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { useEffect, useMemo } from 'react';

export default function ModelViewer({ onMetadata }: { onMetadata?: (data: any) => void }) {
  const obj = useLoader(OBJLoader as any, '/models/model.obj') as THREE.Object3D;
  const texture = useLoader(THREE.TextureLoader as any, '/textures/texture.jpg') as THREE.Texture;

  useEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [obj, texture]);

  const metadata = useMemo(() => ({
    vertexCount: obj.children.reduce((acc, child) => {
      if (child instanceof THREE.Mesh) {
        return acc + (child.geometry.attributes.position?.count || 0);
      }
      return acc;
    }, 0),
    objectCount: obj.children.length,
  }), [obj]);

  useEffect(() => {
    if (onMetadata) {
      onMetadata(metadata);
    }
  }, [metadata, onMetadata]);

  return (
    <>
      <primitive object={obj} scale={[1, 1, 1]} />
      <mesh position={[0, -2, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color="#cccccc" />
      </mesh>
    </>
  );
}
