import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelViewer from '../components/ModelViewer';
import styles from '../styles/Home.module.css';
import { useState } from 'react';

export default function Home() {
  const [metadata, setMetadata] = useState<{ vertexCount: number; objectCount: number } | null>(null);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.canvasContainer}>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <ModelViewer onMetadata={setMetadata} />
            <OrbitControls />
          </Canvas>

          {/* Metadata Display OUTSIDE the Canvas */}
          {metadata && (
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '80px',
                color: 'white',
                background: 'rgba(0,0,0,0.7)',
                padding: '5px',
                zIndex: 10,
              }}
            >
              Vertices: {metadata.vertexCount}
              <br />
              Objects: {metadata.objectCount}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
