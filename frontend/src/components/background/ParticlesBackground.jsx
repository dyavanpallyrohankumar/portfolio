// import { useCallback } from "react";
// import Particles from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";
// import particlesConfig from "./particles(1).json";

// export default function ParticlesBackground() {
//   const particlesInit = useCallback(async (engine) => {
//     await loadSlim(engine);
//   }, []);

//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={particlesConfig}
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         zIndex: -1,
//       }}
//     />
//   );
// }
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadAll } from "@tsparticles/all";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadAll(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },
        background: {
          color: "#000000"
        },
        particles: {
          number: {
            value: 80
          },
          color: {
            value: "#ffffff"
          },
          size: {
            value: 2
          },
          move: {
            enable: true,
            speed: 1
          }
        }
      }}
    />
  );
}
