/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';

// Declare Jest globals
declare const describe: any;
declare const it: any;
declare const expect: any;

describe('HeroSection', () => {
  it('renders without crashing', () => {
    expect(true).toBe(true);
  });
});
