import { Text, Plane } from '@react-three/drei';
import * as THREE from 'three';

const TextBoxes = ({ position, content, fontSize, planeSize, planeColor }) => {
  return (
    <group position={position}>
      {/* Plane as background */}
      <Plane args={planeSize} position={[0, 0, -0.1]}>
        <meshBasicMaterial color={planeColor} side={THREE.DoubleSide} />
      </Plane>
      
      {/* Text on the Plane */}
      <Text 
        position={[0, 0, 0]}
        fontSize={fontSize}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {content}
      </Text>
    </group>
  );
};

export default TextBoxes;
