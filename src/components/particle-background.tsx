import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Engine } from "tsparticles-engine";

type ParticleBackgroundInput = {
  className?: string | undefined;
  isDarkMode: boolean;
  onClick?: boolean | undefined;
  onHover?: boolean | undefined;
  numOfParticles?: number | undefined;
  opacity?: number | undefined;
  linkDistance?: number | undefined;
};

function ParticleBackground({
  className,
  isDarkMode,
  onClick = false,
  onHover = false,
  numOfParticles = 35,
  opacity = 0.6,
  linkDistance = 200,
}: ParticleBackgroundInput) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);
  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <Particles
      className={className}
      id="tsparticles"
      // url="http://foo.bar/particles.json"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 50,
        interactivity: {
          events: {
            onClick: {
              enable: onClick,
              mode: "push",
            },
            onHover: {
              enable: onHover,
              mode: "repulse",
            },
            resize: true,
          },
        },
        particles: {
          color: {
            value: isDarkMode ? "#ffffff" : "#404258",
          },
          links: {
            color: isDarkMode ? "#ffffff" : "#404258",
            distance: linkDistance,
            enable: true,
            opacity: 0.4,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: numOfParticles,
          },
          opacity: {
            value: opacity,
          },
          shape: {
            type: "triangle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: false,
        zLayers: 1,
      }}
    />
  );
}

export default ParticleBackground;
