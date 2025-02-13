import styled from 'styled-components';

export const EffectContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  filter: contrast(170%) brightness(1000%);
  overflow: hidden;

  &:before {
    content: "";
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 150px;
    opacity: 0.12;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 1;
    filter: contrast(150%) brightness(800%);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  transform: scale(2);
  transform-origin: 75% center;
  pointer-events: none;
`; 