import { OrbitControls, Bounds, ContactShadows } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Model from './City';
import CBS from '../styles/CBS.module.css';

function Scene({ ...props }: any) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <div className={CBS.CanvasMap}>
      <Canvas
        camera={{ position: [0, 280, 220], fov: 50 }}
        dpr={[1, 2]}
        {...props}
        className={CBS.MapImgCavas}>
        <directionalLight intensity={0.2} />
        <ambientLight intensity={0.5} />
        <Bounds fit clip margin={1.1}>
          <Model />
        </Bounds>
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -35, 0]}
          opacity={0.2}
          width={200}
          height={200}
          blur={1}
          far={50}
        />
        <OrbitControls
          makeDefault
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.25}
        />
        {/* <LevaOptions /> */}
      </Canvas>
    </div>
  );
}
export default Scene;
