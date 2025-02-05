require('@testing-library/jest-dom');
const React = require('react');

// Mock framer-motion globally
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => React.createElement('div', props, children),
  },
  Variants: {},
}));

// Mock styled-components theme
const createStyledComponent = (Component) => {
  const StyledComponent = ({ children, ...props }) => React.createElement(Component, props, children);
  StyledComponent.withConfig = () => StyledComponent;
  return StyledComponent;
};

const styled = new Proxy(() => {}, {
  get: (target, property) => {
    if (property === 'default') return styled;
    return () => createStyledComponent(property);
  },
  apply: (target, thisArg, [component]) => {
    return () => createStyledComponent(typeof component === 'string' ? component : 'div');
  },
});

// Add withConfig to the styled function itself
styled.withConfig = () => styled;

jest.mock('styled-components', () => ({
  __esModule: true,
  default: styled,
  ThemeProvider: ({ children }) => React.createElement('div', null, children),
  createGlobalStyle: () => React.createElement('div'),
  css: () => '',
  keyframes: () => '',
}));