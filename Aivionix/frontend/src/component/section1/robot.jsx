import { Suspense, useLayoutEffect, useRef } from "react";
import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RobotModel() {
  const ref = useRef();
  const { scene } = useGLTF("/models/360_sphere_robot.glb");

  useLayoutEffect(() => {
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    scene.position.sub(center);
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    if (ref.current) {
      ref.current.position.y = Math.sin(t * 1.2) * 0.12 - 0.25;
      ref.current.rotation.y = mouseX * 0.6;
      ref.current.rotation.x = -mouseY * 0.3;
    }
  });

  return (
    <group ref={ref}>
      <Center>
        <primitive object={scene} scale={6.2} />
      </Center>
    </group>
  );
}

function FallbackSphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial color="#6366f1" />
    </mesh>
  );
}

export default function Robot() {
  return (
    <Suspense fallback={<FallbackSphere />}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 5, 5]} intensity={2} />
      <pointLight position={[2, 2, 3]} intensity={2} color="#8b5cf6" />
      <RobotModel />
    </Suspense>
  );
}

useGLTF.preload("/models/360_sphere_robot.glb");