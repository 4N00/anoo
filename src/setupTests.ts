/// <reference types="@types/jest" />
import '@testing-library/jest-dom';
import 'jest-styled-components';

declare const jest: any;

declare global {
  namespace NodeJS {
    interface Global {
      IntersectionObserver: any;
    }
  }
}

// This file is required by Jest configuration
// It imports @testing-library/jest-dom which adds custom matchers to Jest
// The type declarations for these matchers are in src/types/jest.d.ts

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((_callback: unknown, _options: unknown) => ({
  root: null,
  rootMargin: '',
  thresholds: [],
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: () => [],
}));

globalThis.IntersectionObserver = mockIntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
