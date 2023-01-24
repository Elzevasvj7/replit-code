import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';

function LevaOptions() {
  const { zoom } = useControls({
    zoom: { value: 0.27, min: 0.2, max: 1, step: 0.01 },
    Search: 'Name Mesh',
  });
  //const {check} = useControls({check:true})
  return useFrame((state) => {
    state.camera.zoom = THREE.MathUtils.lerp(state.camera.zoom, zoom * 4.5, 0.1);
    state.camera.updateProjectionMatrix();
  });
}

export default LevaOptions;
