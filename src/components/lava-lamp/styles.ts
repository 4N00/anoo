import styled from 'styled-components';

export const EffectContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  filter: contrast(170%) brightness(1000%);
  overflow: hidden;
  z-index: 0;
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 150px;
    opacity: 0.12;
    mix-blend-mode: overlay;
    pointer-events: none;
    z-index: 2;
    filter: contrast(150%) brightness(1000%);
  }
`;

export const Container = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.5);
  transform-origin: center center;
  pointer-events: none;
`; 