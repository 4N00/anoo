import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 30vw;
  width: 100vw;
  height: 100vh;
  z-index: -999;
  opacity: 0.3;
  transition: opacity 0.3s ease;
  pointer-events: none;
  overflow: hidden;
  background: transparent;

  @media (max-width: 768px) {
    display: none;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`; 