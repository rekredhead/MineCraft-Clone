import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import Ground from "./components/Ground";
import Player from "./components/Player";

export default function App() {
    return (
        <>
            <Canvas>
                <Sky sunPosition={[100, 100, 20]}></Sky>
                <ambientLight intensity={0.5}/>
                <Physics>
                    <Player />
                    <Ground/>
                </Physics>
            </Canvas>
        </>
    );
}