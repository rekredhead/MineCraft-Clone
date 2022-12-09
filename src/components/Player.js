import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import useKeyboard from "../hooks/useKeyboard";

const JUMP_FORCE = 10;

export default function Player() {
    const actions = useKeyboard();
    console.log('actions', Object.entries(actions).filter(([k, v]) => v));

    const {camera} = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0]
    }));

    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v);
    }, [api.velocity]);

    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p);
    }, [api.position]);

    useFrame(() => {
        camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));
        
        if (actions.jump) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2])
        }
    });

    return (
        <mesh ref={ref}></mesh>
    );
}