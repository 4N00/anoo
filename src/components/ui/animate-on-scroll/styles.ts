import styled from 'styled-components';

interface AnimatedElementProps {
  $isVisible: boolean;
}

export const AnimatedElement = styled.div<AnimatedElementProps>`
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: translateY(${({ $isVisible }) => ($isVisible ? 0 : '20px')});
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  will-change: opacity, transform;
`; 