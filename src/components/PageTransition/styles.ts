import styled from 'styled-components';

export const TransitionWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000;
  transform: translateZ(0);
`;